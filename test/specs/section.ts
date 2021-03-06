import fs from 'fs-extra'
import path from 'path'

import savor, {
    Context,
    Completion
} from 'savor'

import { 
    Archive 
} from 'rara'

import { 
    Section, 
    Environment,
    Index
} from '../../src'

savor.

add('should not load without a valid location', (context: Context, done: Completion) => {
    const section = new Section()

    context.expect(section.index).to.not.exist

    savor.promiseShouldFail(section.initialize(), done, (error) => {
        context.expect(error.message).to.equal(Section.ERRORS.CANNOT_INIT("no location was specified"))
    })
}).

add('should not load without a valid id', (context: Context, done: Completion) => {
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

add('should load from scratch with a valid id and location', (context: Context, done: Completion) => {
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    context.expect(section.vault).to.not.exist

    savor.promiseShouldSucceed(section.initialize(), done, () => {
        context.expect(section.vault).to.exist
    })
}).

add('should load a cached index', (context: Context, done: Completion) => {
    fs.mkdirsSync(path.resolve(context.dir, 'test'))

    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldSucceed(section.initialize(), done, () => {
    })
}).


add('should not install an existing archive', (context: Context, done: Completion) => {
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

add('should install an archive', (context: Context, done: Completion) => {
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

add('should find an archive', (context: Context, done: Completion) => {    
    const index = new Index({ dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.addAsset('assets/test-archive', '.dodi/test/archive/1/archive', context)
    savor.promiseShouldSucceed(section.findArchive({ id: "archive", version: "1" }), done, (data) => {
        context.expect(data.id).to.equal("archive")
    })
}).

add('should not install an archive in a non-existent section', (context: Context, done: Completion) => {    
    const index = new Index({ dir: context.dir })

    savor.promiseShouldFail(index.installArchive({ id: "archive", version: "1", section: "oops" }), done, (error) => {
        context.expect(error.message).to.equal(Index.ERRORS.CANNOT_FIND_SECTION("it does not exist"))
    })
}).

add('should install an archive in a specified section', (context: Context, done: Completion) => {    
    fs.mkdirsSync(path.resolve(context.dir, 'test'))
    const index = new Index({ dir: context.dir, sections: [{ id: "test" }] })
    const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))

    savor.promiseShouldSucceed(index.initialize().then(() => index.installArchive({ id: "archive", version: "1", section: "test" })), done, (data) => {
        stub.restore()
    })
}).

// add('should install an archive in the default section', (context: Context, done: Completion) => {    
//     const stub2 = context.stub(npmcore, 'load').callsFake((options, cb) => cb(null, {
//         commands: {
//             install: (cb) => cb(null, { test: "1234" })
//         }
//     }))  
//     const stub3 = context.stub(npm, 'extract').callsFake(() => Promise.resolve({ version: '1.1.3' }))
//     const stub4 = context.stub(npm, 'manifest').callsFake(() => Promise.resolve({ version: '1.1.3' }))
    
//     fs.mkdirsSync(path.resolve(context.dir, 'archives'))
//     const index = new Index({ dir: context.dir, sections: [{ id: "archives" }] })
//     const stub = context.stub(Archive.prototype, 'download').callsFake(() => Promise.resolve({ version: "1" }))

//     savor.promiseShouldSucceed(index.initialize().then(() => index.installArchive({ id: "archive", version: "1" })), done, (data) => {
//         stub.restore()
//         stub2.restore()
//         stub3.restore()
//         stub4.restore()
//     })
// }).

// add('should not find a non-existent archive', (context: Context, done: Completion) => {    
//     const index = new Index({ dir: context.dir })
//     const section = new Section(index, { id: "test" })

//     savor.promiseShouldSucceed(section.findArchive({ id: "archive", version: "1" }), done, (data) => {
//         context.expect(data).to.be.null
//     })
// }).

run('[Dodi] Section')
