const path = require('path')
const Cassi = require('cassi')
const { Archive } = require('rara')
const fs = require('fs-extra')

class _ {
    constructor(index, props) {
        this._index = index
        this._props = Object.assign({}, props)
        this._path = (index && index.dir && this.props.id) ? path.resolve(this.index.path, this.props.id) : null
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

    findArchive(args) {
        const archiveArgs = Object.assign({}, { dir: this.path }, args)
        const archive = new Archive(archiveArgs)

        return archive.initialize()
                      .then(() => archive.exists ? (args.load ? archive.load() : archive) : null)

    }

    installArchive(args) {
        const archiveArgs = Object.assign({}, { dir: this.path }, args)
        const archive = new Archive(archiveArgs)

        // First check if it's cached
        return this.findArchive(archiveArgs)
                   .then((_archive) => _archive ? _archive : archive.download().then(() => args.load ? archive.load() : archive))           
    }

    initialize () {
        if (!this.path) {
            // First make sure the path exists
            return Promise.reject(new Error(_.ERRORS.CANNOT_INIT('no location was specified')))
        }
        
        // Create it first if necessary
        this.exists || fs.mkdirsSync(this.path)

        // Let's look up the vault
        const service = `${this.index.name}.${this.id}`
        this._vault = new Cassi.Vault({ service, name: _.VAULT_NAME, root: path.resolve(this.path) })
        
        // Create the vault if necessary
        return this._vaults.initialize()
    }
}

_.ERRORS = {
    CANNOT_INIT: (reason) => reason ? `Cannot initialize section because ${reason}` : `Cannot initialize section`
}

_.VAULT_NAME = '.vault'

module.exports = _