const platformData = require('platform')

class _ {
    constructor(props) {
        this._props = Object.assign({}, props)
        this._userDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
        this._platform = Object.assign({}, platformData)
    }

    get props () {
        return this._props
    }

    get userDir() {
        return this._userDir
    }

    get platform() {
        return this._platform
    }
}

module.exports = _