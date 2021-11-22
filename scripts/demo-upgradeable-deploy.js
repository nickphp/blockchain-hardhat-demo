//安全帽模块
const { ethers, upgrades  } = require("hardhat")

//主函数
async function main() {
    const Demo = await ethers.getContractFactory('Demo')
    console.log('Deploying Demo...')
    const demo = await upgrades.deployProxy(Demo, [300], { initializer: 'setScore' })
    await demo.deployed()
    console.log('Demo to:', demo.address)
  }
  
//执行可升级合约部署
main().then(() => process.exit(0)).catch(error => {
    console.error(error)
    process.exit(1)
});