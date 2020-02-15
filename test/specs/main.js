/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Index } = require('../..')
const fs = require('fs-extra')
const path = require('path')

savor.

add('should load from an existing location without sections', (context, done) => {
    fs.mkdirsSync(path.resolve(context.dir, 'index'))
    const index = new Index({ dir: "index" })

    context.expect(index.sections.length).to.equal(0)

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context, done) => {
    const index = new Index({ dir: "index" })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context, done) => {
    const index = new Index({ dir: "index" })

    context.expect(index.env).to.exist 

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch with a section', (context, done) => {
    const sections = [{ id: "events" }]
    const index = new Index({ dir: "index", sections })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

run('[Dodi] Index')
