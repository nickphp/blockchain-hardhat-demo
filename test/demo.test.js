const { expect } = require('chai') //断言模块 
const { ethers} = require('hardhat') //安全帽模块

describe('Demo合约测试', () => {

  /**
   * 测试执行前的钩子函数
   */
  before(async () => { 
    //获取合约工厂对象
    this.Demo = await ethers.getContractFactory('Demo')

    //通过合约工厂部署合约
    this.demo = await this.Demo.deploy()
  });

  /**
   * 获取score状态测试
   */
  it('测试score等于0', async () => {
    const score = await this.demo.score()
    expect(score.toString()).to.be.equal('0')
  })

  /**
   * 修改score状态测试
   */
  it('修改score等于100', async () => {
    await this.demo.setScore(100)
    const score = await this.demo.score() 
    expect(score.toString()).to.be.equal('100')
  })
})