import fs from 'fs-extra'
import path from 'path'

import savor, {
    Context,
    Completion
} from 'savor'

import { 
    Index
} from '../../src'

savor.

add('should load from an existing location without sections', (context: Context, done: Completion) => {
    fs.mkdirsSync(path.resolve(context.dir, 'index'))
    const index = new Index({ dir: "index" })

    context.expect(Object.keys(index.sections).length).to.equal(0)

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context: Context, done: Completion) => {
    const index = new Index({ dir: "index" })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch without sections', (context: Context, done: Completion) => {
    const index = new Index({ dir: "index" })

    context.expect(index.env).to.exist 

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

add('should load from scratch with a section', (context: Context, done: Completion) => {
    const sections = [{ id: "events" }]
    const index = new Index({ dir: "index", sections })

    savor.promiseShouldSucceed(index.initialize(), done, () => {
        context.expect(index.exists).to.be.true
    })
}).

run('[Dodi] Index')
