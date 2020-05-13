export = _;
declare class _ {
    constructor(props: any);
    _props: any;
    _userDir: string | undefined;
    _platform: Platform;
    get props(): any;
    get userDir(): string | undefined;
    get platform(): Platform;
}
