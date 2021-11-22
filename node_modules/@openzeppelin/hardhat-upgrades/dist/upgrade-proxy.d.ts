import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { UpgradeOptions, ContractAddressOrInstance } from './utils';
export declare type UpgradeFunction = (proxy: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: UpgradeOptions) => Promise<Contract>;
export declare function makeUpgradeProxy(hre: HardhatRuntimeEnvironment): UpgradeFunction;
//# sourceMappingURL=upgrade-proxy.d.ts.map