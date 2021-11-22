const { expect } = require('chai') //断言模块 
const { ethers, upgrades} = require('hardhat') //安全帽模块

describe('DemoV2升级合约测试', () => {

  /**
   * 测试执行前的钩子函数
   */
  before(async () => { 
    //从工厂获取合约
    const DemoContract = await ethers.getContractFactory('Demo')
    //部署可升级代理合约
    const demoProxy = await upgrades.deployProxy(DemoContract, [300], { initializer: 'setScore' })
    //部署
    this.demo = await demoProxy.deployed()
  });

  /**
   * 获取score状态测试
   */
  it('测试score等于300', async () => {
    const score = await this.demo.score() //读取score 
    expect(score.toString()).to.be.equal('300') //断言结果为300
  })

  /**
   * 修改score状态测试
   */
  it('修改score等于100', async () => {
    await this.demo.setScore(100) //设置score为100
    const score = await this.demo.score() //读取score  
    expect(score.toString()).to.be.equal('100') //断言结果为100
  })

  /**
   * 计数器加1测试
   */
  it('increment计数器测试', async () => {
    const upgradeContractName = 'DemoV2' //升级合约的名称
    const proxyContractAddress = this.demo.address //代理合约的名称
    const DemoUpgrade = await ethers.getContractFactory(upgradeContractName) //工厂合约
    const demoV2 = await upgrades.upgradeProxy(proxyContractAddress, DemoUpgrade) //升级合约
    await this.demo.setScore(800) //设置score为800
    await demoV2.increment() //计数器+1
    const newScore = (await this.demo.score()).toString() //获取存储的新值
    expect(newScore).to.be.equal('801') //断言结果为801
  })
})