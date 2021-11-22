# blockchain-hardhat-demo
# 使用hardhat进行智能合约开发

### 首先安装nodejs开发环境(已安装的可直接略过这个环节)

### 下载源码(具体的版本可到nodejs官网查询,这里使用linux二进制包进行安装)
```
$ wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
```
### 解压源码
```
$ xz -d node-v16.13.0-linux-x64.tar.xz
```
```
$ tar xvf node-v16.13.0-linux-x64.tar
```
### 重名名
```
$ mv node-v16.13.0-linux-x64 nodejs
```
### 移动到/usr/local目录下
```
$ mv nodejs /usr/local
```
### 加入到环境变量,在/etc/profile文件末尾处添加三行代码
```
$ vim /etc/profile
export NODE_HOME=/usr/local/nodejs
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```
### 配置立即生效
```
$ source /etc/profile
```
### 检查npm版本
```
$ npm -v
```
### 检查npx版本
```
$ npx -v
```
### 检查node版本
```
$ node -v
```
### 全局安装nrm包(镜像源管理器)
```
$ npm install -g nrm
```
### 查看已有镜像源
```
$ nrm ls
```
### 切换到淘宝镜像源
```
$ nrm use taobao 
```
### 全局安装yarn包管理器
```
$ npm install -g yarn
```
### npm全局安装包所在位置
```
$ ls /usr/local/nodejs/lib/node_modules
```
### 创建demo项目
```
$ mkdir demo
$ cd demo
$ npm init #一路回车确认生成package.json文件
```
### 使用yarn命令安装hardhat项目包(这里使用局部安装)
```
$ yarn add hardhat
```
### 使用yarn命令安装openzeppelin库(商用级别的智能合约开源库)
### 有了这个库之后，通过import命令导入合约库，在合约库之上构建DAPP应用
```
$ yarn add @openzeppelin/contracts 
$ yarn add @openzeppelin/hardhat-upgrades
```
### 使用yarn命令安装hardhat插件
```
$ yarn add -D @nomiclabs/hardhat-ethers 
$ yarn add -D @nomiclabs/hardhat-waffle
```
### 安装用于测试的组件(用于编写智能合约测试用例)
```
$ yarn add -D chai
```
### 安装ethers(与区块链交互的完整组件库、代码少、接口简单、和web3先比推荐使用ethers)
```
$ yarn add -D ethers
```
### 安装ethereum-waffle(由于一些潜在的原因,如果yarn命令安装不成功使用可以使用npm命令安装)
```
$ npm install --save-dev ethereum-waffle 
```
### 以上都安装成功后,就可以编写智能合约了

### 通过执行npx hardhat --help 查看hardhat操作命令
```
$ npx hardhat --help
```
```
全局选项
  --config              一个安全帽配置文件.
  --emoji               在信息中使用表情符号.
  --help                显示此消息，如果提供了任务名称，则显示任务的帮助
  --max-memory          安全帽可以使用的最大内存量
  --network             要连接到的网络.
  --show-stack-traces   显示堆栈跟踪.
  --tsconfig            保留的安全帽参数.
  --verbose             支持安全帽详细日志记录
  --version             版本显示安全帽的版本
可用任务
  check         检查你需要的任何东西
  clean         清除缓存并删除所有工件
  compile       编译编译整个项目，构建所有工件
  console       控制台打开安全帽控制台
  flatten       展平并打印合同及其依赖项
  help          帮助
  node          在Hardhat网络上启动JSON-RPC服务器
  run           在编译项目后运行用户定义的脚本
  test          运行摩卡测试
```
### 执行npx hardhat命令（选择Create an empty hardhat.config.js创建一个空白配置文件)
```
$ npx hardhat 
Welcome to Hardhat v2.6.8

? What do you want to do? …
  Create a basic sample project
  Create an advanced sample project
  Create an advanced sample project that uses TypeScript
▸ Create an empty hardhat.config.js
  Quit
```
### 打开配置文件修改如下配置

```
//hardhat项目依赖组件
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

//hardhat项目配置项
module.exports = {
  solidity: "0.8.4", //使用的solidity库的版本
  networks: {
    local: {
      url: 'http://127.0.0.1:8545', //本地RPC地址
      //本地区块链账户地址(需要启动运行npx hardhat node命令开启本地开发环境的区块链)
      //这些账户地址和秘钥每次重启区块链都是相同的,并且数据会重置
      accounts: [
        // 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (第一个账户地址及秘钥)
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        // 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (第二个账户地址及秘钥)
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        // 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (三个账户地址及秘钥)
        '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
        // 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (第四个个账户地址及秘钥)
        '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
        // 0x15d34aaf54267db7d7c367839aaf71a00a2c6a65 (第五个账户地址及秘钥)
        '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
      ]
    }
  }
};
```

### 在demo目录下创建合contracts约目录用于编写合约
```
$ mkdir contracts
```
### 在demo目录下创建test目录用于编写测试用例
```
$ mkdir test 
```
### 在demo目录下创建scripts目录用于编写部署脚本
```
$ mkdir scripts
```
### 在contracts目录编写创建Demo.sol合约文件
```
$ touch Demo.sol
$ vim Demo.sol
```
### 编辑合约 Demo.sol 先编写一个最简单的合约内容
```
// contracts/Demo.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Demo {
    uint256  public score = 0;
}
```

### 在scripts目录编写合约部署文件demo-deploy.js
```
$ cd scripts
$ touch demo-deploy.js
$ vim demo-deploy.js

//hardhat库使用ethers组件与区块链进行交互
const { ethers } = require("hardhat");

//部署主函数
async function main() {      
    const Demo = await ethers.getContractFactory("Demo");
    const demo = await Demo.deploy()
    console.log(demo.address)
}

//执行部署
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
```

### 部署合约(开发模式1)
### 始终返回合约地址 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
$ npx hardhat run scripts/demo-deploy.js 
```
### 部署合约(开发模式2) 通过参数--network部署到指定的网络 
### 每次返回全新的合约地址 0x...
### 部署本地网络前需要启动本地节点 
```
$ npx hardhat node 
$ npx hardhat run scripts/demo-deploy.js --network local
```
### 至此简单的合约已经通过scripts/demo-deploy.js进行部署
### 如果是部署到主网 只需对hardhat.config.js进行主网的连接配置即可
### 然后通过 npx hardhat run scripts/demo-deploy.js --network [主网配置]

### 与Demo合约交互进行测试
### 首先在test目录创建demo.test.js
```
$ touch demo.test.js
$ vim demo.test.js

const { expect } = require('chai') //断言模块 
const { ethers} = require('hardhat') //安全帽模块

describe('Demo合约测试', () => {

  /**
   * 测试执行前的钩子函数
   */
  before(async function () { 
    //获取合约工厂对象
    this.Demo = await ethers.getContractFactory('Demo')

    //通过合约工厂部署合约
    this.demo = await this.Demo.deploy()
  })

  /**
   * 获取score状态测试
   */
  it('测试score等于0', async function () {
    const score = await this.demo.score()
    expect(score.toString()).to.be.equal('0')
  })

})
```

### 执行测试 
```
$ npx hardhat test test/demo.test.js --network local
```
### 至此一个简单的合约编写、部署、测试的流程就完成了，但这仅仅是个开始
### 现在我们的合约 仅仅只有读取score的功能,现在我们要对合约进行功能的添加
### 在未部署可升级合约之前 我们先用不可升级合约演示功能的添加

### 现在我们的Demo.sol 添加一个setScore方法,这个方法可以改变score的值
```
$ vim contracts/Demo.sol

// contracts/D.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

//Demo合约
contract Demo {
    uint256  public score = 0;

    //修改score的状态
    function setScore(uint256 newScore) public returns(bool) {
        score = newScore;
        return true;
    }
}
```

### 继续编写测试用例 针对新添加的setScore合约方法添加测试用例
```
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
    
```

### 执行新的测试
```
$ npx hardhat test test/demo.test.js --network local
```
### 现在我们可以通过编写Demo.sol文件进行合约的开发
通过demo.test.js文件进行测试用例的编写进行合约功能验证
由于在测试的过程中会自动编译合约，因此也无需执行npx hardhat compile编译操作

### 编写可升级的智能合约
### 在scripts目录创建demo-upgradeable-deploy.js
```
$ cd scripts
$ touch demo-upgradeable-deploy.js
$ vim demo-upgradeable-deploy.js

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
```
### 执行可升级合约部署
```
$ npx hardhat run scripts/demo-upgradeable-deploy.js --network local
Deploying Demo...
Demo to: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1
```
### 部署完成后 我们需要保存我们的合约地址,这个地址以后就是面向用户的合约交互地址
### 每次升级合约都需要这个地址作为代理合约地址与新升级的合约进行绑定

### 开始编写升级合约DemoV2.sol 对升级的合约增加了increment方法 每次调用score分值加1
```
$ cd contracts
$ touch DemoV2.sol
$ vim DemoV2.sol

// contracts/DemoV2.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

//Demo合约
contract DemoV2 {
    uint256  public score;

    //修改score的状态
    function setScore(uint256 newScore) public {
        score = newScore;
    }

    //分值加1
    function increment() public {
        score = score + 1;
    }
}
```
### 开始编写部署升级合约的文件
```
$ cd scripts
$ touch demo-upgrade.js
$ vim demo-upgrade.js

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
})
```

### 执行合约升级 
```
$ npx hardhat run scripts/demo-upgrade.js --network local
```
### 通过hardhat控制台验证升级合约

```
$ npx hardhat console --network local
> const upgradeContractName = 'DemoV2'
> const proxyContractAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1'
> const Demo = await ethers.getContractFactory(upgradeContractName)
> const demo = await Demo.attach(proxyContractAddress)
> await demo.increment()
> (await demo.socre()).toString()
```

### 针对升级合约编写测试用例
```
$ cd test
$ touch demo-v2.test.js
$ vim demo-v2.test.js

//demo-v2.test.js

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
```

### 注意事项
### 可升级合约 不能包含construct构造函数,构造函数的实现方式是通过调用普通函数实现的
### 因此针对普通函数 可以通过权限控制调用机制比如增加普通函数只允许合约部署者调用
### 本篇关于harahat编写智能合约 只能算是抛转引玉 但是基础的骨架已经搭建完成
### 可在升级合约内 通过引入第三方安全库比如openzeppelin进行合约的功能开发