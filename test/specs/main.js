/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Index, Environment } = require('../..')
const fs = require('fs-extra')
const path = require('path')

savor.

add('should load from an existing location without sections', (context, done) => {
    fs.mkdirsSync(path.resolve(context.dir, 'index'))
    const env = new Environment()
    const index = new Index(env, { dir: "index" })

    context.expect(index.sections.length).to.equal(0)

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context, done) => {
    const env = new Environment()
    const index = new Index(env, { dir: "index" })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context, done) => {
    const env = new Environment()
    const index = new Index(env, { dir: "index" })

    context.expect(index.env).to.exist 

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch with a section', (context, done) => {
    const env = new Environment()
    const sections = [{ id: "events" }]
    const index = new Index(env, { dir: "index", sections })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
        context.expect(fs.existsSync(path.resolve(context.dir, 'index', 'events'))).to.be.true
    })
}).

run('[Dodi] Index')
