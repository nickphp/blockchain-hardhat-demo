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