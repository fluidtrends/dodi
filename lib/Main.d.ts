import { Environment } from '.';
export declare class Index {
    protected _props: any;
    protected _env: Environment;
    protected _name: string;
    protected _dir: string;
    protected _path: string;
    protected _sections: any;
    static ERRORS: {
        CANNOT_FIND_SECTION: (reason?: string | undefined) => string;
    };
    static DEFAULT_ARCHIVES_SECTION: string;
    constructor(props?: any);
    get props(): any;
    get env(): Environment;
    get dir(): string;
    get name(): string;
    get path(): string;
    get sections(): any;
    get exists(): boolean | "";
    initialize(): Promise<any[]>;
    installArchive(args: any): Promise<any>;
}
