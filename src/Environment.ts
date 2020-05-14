import * as platformData from 'platform'

import {
    IEnvironment
} from '.'

export class Environment implements IEnvironment {
    protected _props: any;
    protected _userDir?: string;
    protected _platform: any; 

    constructor(props: any) {
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