import fs from 'fs-extra'
import path from 'path'

import {
    Vault 
} from 'cassi'
import { 
    Archive 
} from 'rara'

import {
    Index,
    ISection
} from '.'

export class Section implements ISection {
    public static ERRORS = {
        CANNOT_INIT: (reason?: string) => reason ? `Cannot initialize section because ${reason}` : `Cannot initialize section`
    }

    public static VAULT_NAME = '.data'

    protected _index?: Index;
    protected _props: any; 
    protected _path?: string;
    protected _vault?: Vault;

    constructor(index?: Index, props?: any) {
        this._index = index
        this._props = Object.assign({}, props)
        this._path = (index && index.dir && this.props.id) ? path.resolve(this.index!.path, `${this.props.secure ? '.' : ''}${this.props.id}`) : undefined
    }

    get isSecure() {
        return this.props.secure
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

    async findArchive(args: any) {
        const archiveArgs = Object.assign({}, { dir: this.path }, args)
        const archive = new Archive(archiveArgs)
        
        await archive.initialize()
        
        return archive.exists ? (args.load ? archive.load() : archive) : undefined
    }

    async installArchive(args: any) {
        const archiveArgs = Object.assign({}, { dir: this.path }, args)
        const archive = new Archive(archiveArgs)

        const _archive = await this.findArchive(archiveArgs)

        if (_archive) {
            return args.load ? _archive.load() : _archive
        }
        
        await archive.install([
            "Installing, please hold on a minute ...", "Done"
        ])

        return args.load ? archive.load() : archive
    }

    initialize () {
        if (!this.path) {
            // First make sure the path exists
            return Promise.reject(new Error(Section.ERRORS.CANNOT_INIT('no location was specified')))
        }
        
        // Create it first if necessary
        this.exists || fs.mkdirsSync(this.path)

        // Let's look up the vault
        const service = `${this.index!.name}.${this.id}`
        this._vault = new Vault({ service, name: Section.VAULT_NAME, root: path.resolve(this.path) })
        
        // Create the vault if necessary
        return this._vault.initialize()
    }
}
