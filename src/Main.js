const fs = require('fs-extra')
const path = require('path')
const Section = require('./Section')

class _ {
    constructor(env, props) {
        this._env = env
        this._props = Object.assign({}, props)
        this._name = this.props.name || 'dodi'
        this._dir = this.props.dir || (env ? env.userDir : null)
        this._path = env ? path.resolve(this.dir, `.${this.name}`) : null
    }

    get props() {
        return this._props
    }

    get env () {
        return this._env
    }

    get dir() {
        return this._dir
    }

    get name () {
        return this._name
    }

    get path() {
        return this._path
    }

    get sections () {
        return this._sections || []
    }

    get exists() {
        return this.path && fs.existsSync(path.resolve(this.path))
    }

    initialize () {
        // Create the root first, if necessary
        this.exists || fs.mkdirsSync(this.path)

        // Let's allocate sections as needed
        this._sections = (this.props.sections || []).map(section => new Section(this, section))

        // Initialize all sections
        return Promise.all(this.sections.map(section => section.initialize()))
    }
}

_.ERRORS = {
}

module.exports = _