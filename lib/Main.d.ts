export = _;
declare class _ {
    constructor(props: any);
    _props: any;
    _env: import("./Environment");
    _name: any;
    _dir: any;
    _path: string;
    get props(): any;
    get env(): import("./Environment");
    get dir(): any;
    get name(): any;
    get path(): string;
    get sections(): {};
    get exists(): boolean | "";
    initialize(): Promise<any[]>;
    _sections: {} | undefined;
    installArchive(args: any): any;
}
declare namespace _ {
    export namespace ERRORS {
        export function CANNOT_FIND_SECTION(reason: any): string;
    }
    export const DEFAULT_ARCHIVES_SECTION: string;
}
