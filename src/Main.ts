import fs from 'fs-extra'
import path from 'path'

import {
    Environment,
    Section
} from '.'

export class Index {
    protected _props: any;
    protected _env: Environment;
    protected _name: string;
    protected _dir: string;
    protected _path: string;
    protected _sections: any;

    public static ERRORS = {
        CANNOT_FIND_SECTION: (reason?: string) => reason ? `Cannot find the section because ${reason}` : `Cannot find the section`
    }
    
    public static DEFAULT_ARCHIVES_SECTION = 'archives'

    constructor(props?: any) {
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
        this.props.sections && this.props.sections.map((section: any) => { this._sections[section.id] = new Section(this, section) })
        return Promise.all(Object.values(this.sections).map((section: any) => section.initialize()))
    }

    installArchive(args: any) {
        const section = this.sections[args.section || Index.DEFAULT_ARCHIVES_SECTION]

        if (!section) {
            return Promise.reject(new Error(Index.ERRORS.CANNOT_FIND_SECTION('it does not exist')))
        }

        return section.installArchive({ silent: args.silent, id: args.id, version: args.version })
    }
}