/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Section, Environment, Index } = require('../..')
const fs = require('fs-extra')
const path = require('path')

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

add('should not load with a valid id but missing location', (context, done) => {
    const index = new Index()
    const section = new Section(index, { id: "test" })

    context.expect(section.index).to.exist
    context.expect(section.vault).to.not.exist
    context.expect(section.id).to.equal('test')

    savor.promiseShouldFail(section.initialize(), done, (error) => {
        context.expect(error.message).to.equal(Section.ERRORS.CANNOT_INIT("no location was specified"))
    })
}).

add('should load from scratch with a valid id and location', (context, done) => {
    const env = new Environment()
    const index = new Index(env, { dir: context.dir })
    const section = new Section(index, { id: "test" })

    context.expect(section.vault).to.not.exist

    savor.promiseShouldSucceed(section.initialize(), done, () => {
        context.expect(section.vault).to.exist
    })
}).

add('should load a cached index', (context, done) => {
    fs.mkdirsSync(path.resolve(context.dir, 'test'))

    const env = new Environment()
    const index = new Index(env, { dir: context.dir })
    const section = new Section(index, { id: "test" })

    savor.promiseShouldSucceed(section.initialize(), done, () => {
    })
}).

run('[Dodi] Section')
