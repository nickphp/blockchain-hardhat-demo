"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrepareUpgrade = void 0;
const utils_1 = require("./utils");
function makePrepareUpgrade(hre) {
    return async function prepareUpgrade(proxy, ImplFactory, opts = {}) {
        const proxyAddress = (0, utils_1.getContractAddress)(proxy);
        const { impl } = await (0, utils_1.deployImpl)(hre, ImplFactory, opts, proxyAddress);
        return impl;
    };
}
exports.makePrepareUpgrade = makePrepareUpgrade;
//# sourceMappingURL=prepare-upgrade.js.map