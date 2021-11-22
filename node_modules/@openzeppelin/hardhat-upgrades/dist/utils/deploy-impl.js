"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployImpl = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const deploy_1 = require("./deploy");
const options_1 = require("./options");
const validations_1 = require("./validations");
async function deployImpl(hre, ImplFactory, opts, proxyAddress) {
    const { provider } = hre.network;
    const validations = await (0, validations_1.readValidations)(hre);
    const unlinkedBytecode = (0, upgrades_core_1.getUnlinkedBytecode)(validations, ImplFactory.bytecode);
    const encodedArgs = ImplFactory.interface.encodeDeploy(opts.constructorArgs);
    const version = (0, upgrades_core_1.getVersion)(unlinkedBytecode, ImplFactory.bytecode, encodedArgs);
    const layout = (0, upgrades_core_1.getStorageLayout)(validations, version);
    if (opts.kind === undefined) {
        opts.kind = (0, upgrades_core_1.inferProxyKind)(validations, version);
    }
    if (proxyAddress !== undefined) {
        await (0, upgrades_core_1.setProxyKind)(provider, proxyAddress, opts);
    }
    const fullOpts = (0, options_1.withDefaults)(opts);
    (0, upgrades_core_1.assertUpgradeSafe)(validations, version, fullOpts);
    if (proxyAddress !== undefined) {
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        const currentImplAddress = await (0, upgrades_core_1.getImplementationAddress)(provider, proxyAddress);
        const currentLayout = await (0, upgrades_core_1.getStorageLayoutForAddress)(manifest, validations, currentImplAddress);
        (0, upgrades_core_1.assertStorageUpgradeSafe)(currentLayout, layout, fullOpts);
    }
    const impl = await (0, upgrades_core_1.fetchOrDeploy)(version, provider, async () => {
        const deployment = await (0, deploy_1.deploy)(ImplFactory, ...fullOpts.constructorArgs);
        return { ...deployment, layout };
    });
    return { impl, kind: opts.kind };
}
exports.deployImpl = deployImpl;
//# sourceMappingURL=deploy-impl.js.map