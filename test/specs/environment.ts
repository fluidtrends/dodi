import * as platform from 'platform'
import fs from 'fs-extra'
import path from 'path'

import savor, {
    Context,
    Completion
} from 'savor'

import { 
    Environment
} from '../../src'

savor.

add('should load a basic environment', (context: Context, done: Completion) => {
    const env = new Environment({ test: "test1234" })

    const userDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
    context.expect(env.userDir).to.equal(userDir)
    context.expect(env.props.test).to.equal("test1234")
    context.expect(env.platform.os).to.equal(platform.os)

    done()
}).

run('[Dodi] Environment')
