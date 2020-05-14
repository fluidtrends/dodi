import { IEnvironment } from '.';
export declare class Environment implements IEnvironment {
    protected _props: any;
    protected _userDir?: string;
    protected _platform: any;
    constructor(props: any);
    get props(): any;
    get userDir(): string | undefined;
    get platform(): any;
}
