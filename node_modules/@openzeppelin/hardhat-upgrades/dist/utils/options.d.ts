import { ValidationOptions } from '@openzeppelin/upgrades-core';
export interface Options extends ValidationOptions {
    constructorArgs?: unknown[];
}
export declare function withDefaults(opts?: Options): Required<Options>;
export interface DeployOptions extends Options {
    initializer?: string | false;
}
export interface UpgradeOptions extends Options {
    call?: {
        fn: string;
        args?: unknown[];
    } | string;
}
//# sourceMappingURL=options.d.ts.map