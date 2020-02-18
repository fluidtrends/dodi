/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Section, Environment, Index } = require('../..')
const fs = require('fs-extra')
const path = require('path')
const { Archive } = require('rara')
const npm = require('libnpm')

savor.

add('should not load without a valid location', (context, done) => {
    const section = new Section()

    context.expect(section.index).to.not.exist

    savor.promiseShouldFail(section.initialize(), done, (error) => {
        context.expect(error.message).to.equal(Section.ERRORS.CANNOT_INIT("no location was specified"))
    })
}).

add('should not load without a valid id', (context, done) => {
    const index = new Index()
    const section = new Section(index, { test: "test1234" })

    context.expect(section.index).to.exist
    context.expect(section.props.test).to.equal('test1234')
    context.expect(section.id).to.not.exist
    context.expect(section.vault).to.not.exist

    savor.promiseShouldFail(section.initialize(), done, (error) => {
        context.expect(error.message).to.equal(Section.ERRORS.CANNOT_INIT("no location was specified"))
    })
}).

add('should load from scratch with a valid id and location', (context, done) => {
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    context.expect(section.vault).to.not.exist

    savor.promiseShouldSucceed(section.initialize(), done, () => {
        context.expect(section.vault).to.exist
    })
}).

add('should load a cached index', (context, done) => {
    fs.mkdirsSync(path.resolve(context.dir, 'test'))

    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldSucceed(section.initialize(), done, () => {
    })
}).


add('should not install an existing archive', (context, done) => {
    fs.mkdirsSync(path.resolve(context.dir, 'test'))
    const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))
    
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldSucceed(section.initialize()
                               .then(() => section.installArchive({ id: "test-archive", version: "1" })
    ), done, () => {
        stub.restore()
    })
}).

add('should install an archive', (context, done) => {
    savor.addAsset('assets/test-archive', '.dodi/test/archive/1', context)
    const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))
    
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldSucceed(section.initialize()
                               .then(() => section.installArchive({ id: "archive", version: "1" })
    ), done, () => {
        stub.restore()
    })
}).

add('should not find a non-existent archive', (context, done) => {    
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldFail(section.findArchive({ id: "archive", version: "1" }), done, (error) => {
        context.expect(error.message).to.equal(Section.ERRORS.CANNOT_LOAD("the archive does not exist"))
    })
}).

add('should find an archive', (context, done) => {    
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.addAsset('assets/test-archive', '.dodi/test/archive/1', context)
    savor.promiseShouldSucceed(section.findArchive({ id: "archive", version: "1" }), done, (data) => {
        context.expect(data.id).to.equal("archive")
    })
}).

add('should not install an archive in a non-existent section', (context, done) => {    
    const index = new Index({ dir: context.dir })

    savor.promiseShouldFail(index.installArchive({ id: "archive", version: "1", section: "oops" }), done, (error) => {
        context.expect(error.message).to.equal(Index.ERRORS.CANNOT_FIND_SECTION("it does not exist"))
    })
}).

add('should install an archive in the default section', (context, done) => {    
    fs.mkdirsSync(path.resolve(context.dir, 'archives'))
    const index = new Index({ dir: context.dir, sections: [{ id: "archives" }] })
    const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))

    savor.promiseShouldSucceed(index.initialize().then(() => index.installArchive({ id: "archive", version: "1" })), done, (data) => {
        stub.restore()
        context.expect(data.id).to.equal("archive")
    })
}).

add('should install an archive in a specified section', (context, done) => {    
    fs.mkdirsSync(path.resolve(context.dir, 'test'))
    const index = new Index({ dir: context.dir, sections: [{ id: "test" }] })
    const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))

    savor.promiseShouldSucceed(index.initialize().then(() => index.installArchive({ id: "archive", version: "1", section: "test" })), done, (data) => {
        stub.restore()
        context.expect(data.id).to.equal("archive")
    })
}).


run('[Dodi] Section')
