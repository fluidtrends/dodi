const fs = require('fs-extra')
const path = require('path')
const Cassi = require('cassi')
const { Archive } = require('rara')

class _ {
    constructor(index, props) {
        this._index = index
        this._props = Object.assign({}, props)
        this._path = (index && index.dir && this.props.id) ? path.resolve(this.index.dir, this.props.id) : null
    }

    get index() {
        return this._index
    }

    get props() {
        return this._props
    }

    get path () {
        return this._path
    }

    get id() {
        return this.props.id
    }

    get exists() {
        return this.path && fs.existsSync(path.resolve(this.path))
    }

    get vault() {
        return this._vault
    }

    installArchive(args) {
        const archive = new Archive({ dir: this.path, id: args.id, version: args.version })
        return archive.download()
    }

    initialize () {
        if (this.exists) {
            // No need to initialize again
            return Promise.resolve()
        }

        if (!this.path) {
            // First make sure the path exists
            return Promise.reject(new Error(_.ERRORS.CANNOT_INIT('no location was specified')))
        }
        
        // Create it first
        fs.mkdirsSync(this.path)
        
        // Setup the vault
        this._vault = new Cassi.Vault({ name: 'vault', root: path.resolve(this.path) })

        return Promise.resolve()
    }
}

_.ERRORS = {
    CANNOT_INIT: (reason) => reason ? `Cannot initialize section because ${reason}` : `Cannot initialize section`
}

_.VAULT_DEFAULT_PASSWORD = 'chunky'

module.exports = _