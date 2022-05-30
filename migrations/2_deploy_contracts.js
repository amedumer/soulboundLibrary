var soulboundLibrary = artifacts.require("./soulboundLibrary.sol");

module.exports = function(deployer) {
  deployer.deploy(soulboundLibrary);
};
