import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { DeployOptions } from './utils';
export interface DeployFunction {
    (ImplFactory: ContractFactory, args?: unknown[], opts?: DeployOptions): Promise<Contract>;
    (ImplFactory: ContractFactory, opts?: DeployOptions): Promise<Contract>;
}
export declare function makeDeployProxy(hre: HardhatRuntimeEnvironment): DeployFunction;
//# sourceMappingURL=deploy-proxy.d.ts.map