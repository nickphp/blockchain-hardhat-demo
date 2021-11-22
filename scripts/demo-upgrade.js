//安全帽模块
const { ethers, upgrades  } = require("hardhat");

//主函数
async function main() {
    const upgradeContractName = 'DemoV2' //升级合约的名称
    const proxyContractAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1' //代理合约的名称
    const DemoUpgrade = await ethers.getContractFactory(upgradeContractName)
    console.log('Upgrading Demo...')
    await upgrades.upgradeProxy(proxyContractAddress, DemoUpgrade)
    console.log('Demo upgraded')
}

//升级合约
main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
});