const fs = require('fs-extra')
const path = require('path')
const Section = require('./Section')
const Environment = require('./Environment')

class _ {
    constructor(props) {
        this._props = Object.assign({}, props)
        this._env = new Environment(this.props.env)
        this._name = this.props.name || 'dodi'
        this._dir = this.props.dir || this.env.userDir
        this._path = path.resolve(this.dir, `.${this.name}`)
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
        return this._sections || {}
    }

    get exists() {
        return this.path && fs.existsSync(path.resolve(this.path))
    }

    initialize () {        
        // Create the root first, if necessary
        this.exists || fs.mkdirsSync(this.path)

        // Let's allocate sections as needed
        this._sections = {} 
        this.props.sections && this.props.sections.map(section => { this._sections[section.id] = new Section(this, section) })
        return Promise.all(Object.values(this.sections).map(section => section.initialize()))
    }

    installArchive(args) {
        const section = this.sections[args.section || _.DEFAULT_ARCHIVES_SECTION]

        if (!section) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_FIND_SECTION('it does not exist')))
        }

        return section.installArchive({ id: args.id, version: args.section })
    }
}

_.ERRORS = {
    CANNOT_FIND_SECTION: (reason) => reason ? `Cannot find the section because ${reason}` : `Cannot find the section`
}

_.DEFAULT_ARCHIVES_SECTION = 'archives'

module.exports = _