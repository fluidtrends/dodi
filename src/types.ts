import { Vault } from 'cassi'

export interface IEnvironment {
    readonly props: any;
    readonly userDir?: string;
    readonly platform: any; 
}

export interface IIndex {

}

export interface ISection {
    readonly index?: IIndex;
    readonly props: any; 
    readonly path?: string;
    readonly vault?: Vault;
}
