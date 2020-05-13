export = _;
declare class _ {
    constructor(index: any, props: any);
    _index: any;
    _props: any;
    _path: string | null;
    get isSecure(): any;
    get index(): any;
    get props(): any;
    get path(): string | null;
    get id(): any;
    get exists(): boolean | "" | null;
    get vault(): import("cassi").Vault | undefined;
    findArchive(args: any): any;
    installArchive(args: any): any;
    initialize(): Promise<unknown>;
    _vault: import("cassi").Vault | undefined;
}
declare namespace _ {
    export namespace ERRORS {
        export function CANNOT_INIT(reason: any): string;
    }
    export const VAULT_NAME: string;
}
