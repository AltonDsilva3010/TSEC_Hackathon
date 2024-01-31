const User = artifacts.require("UserRegistration");

module.exports = function (deployer) {
  deployer.deploy(User);
};
