/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Environment } = require('../..')
const fs = require('fs-extra')
const path = require('path')
const platform = require('platform')

savor.

add('should load a basic environment', (context, done) => {
    const env = new Environment({ test: "test1234" })

    const userDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
    context.expect(env.userDir).to.equal(userDir)
    context.expect(env.props.test).to.equal("test1234")
    context.expect(env.platform.os).to.equal(platform.os)

    done()
}).

run('[Dodi] Environment')
