import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory } from 'ethers';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
import { Options } from './options';
interface DeployedImpl {
    impl: string;
    kind: NonNullable<ValidationOptions['kind']>;
}
export declare function deployImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: Options, proxyAddress?: string): Promise<DeployedImpl>;
export {};
//# sourceMappingURL=deploy-impl.d.ts.map