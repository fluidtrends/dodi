import { Vault } from 'cassi';
import { Index, ISection } from '.';
export declare class Section implements ISection {
    static ERRORS: {
        CANNOT_INIT: (reason?: string | undefined) => string;
    };
    static VAULT_NAME: string;
    protected _index: Index;
    protected _props: any;
    protected _path?: string;
    protected _vault?: Vault;
    constructor(index: Index, props: any);
    get isSecure(): any;
    get index(): Index;
    get props(): any;
    get path(): string | undefined;
    get id(): any;
    get exists(): boolean | "" | undefined;
    get vault(): Vault | undefined;
    findArchive(args: any): Promise<any>;
    installArchive(args: any): Promise<any>;
    initialize(): Promise<unknown>;
}
