var Bank1 = artifacts.require("./Bank1.sol");

module.exports = function(deployer) {
  deployer.deploy(Bank1);
};
