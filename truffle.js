require("babel-register");
require("babel-polyfill");

// SNT
const HDWalletProvider = require("truffle-hdwallet-provider");

require("dotenv").config();

const mnemonic = process.env.MNEMONIC || "onther metaps onther metaps onther metaps onther metaps onther metaps onther metaps ";
const providerUrl = "https://ropsten.infura.io";

const providerRopsten = new HDWalletProvider(mnemonic, providerUrl, 0);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 4500000,
    },
    ropsten: {
      network_id: 3,
      provider: providerRopsten,
      gas: 4500000,
      // gasPrice: 20e9,
    },
    rinkeby: {
      host: "192.168.1.245", // go-ethereum conencted to rinkeby network is running on 192.168.1.245
      port: 8545,
      network_id: "4",
      from: "0x3d782870115f1a03bb5eb2547473d9f3e0462995",
      gas: 4000000,
      gasPrice: 20e9,
    },
    mainnet: {
      host: "onther.io",
      port: 60001,
      network_id: "1",
      from: "0x07bfd26f09a90564fbc72f77758b0259b65b783b",
      gas: 4500000,
      gasPrice: 25e9,
    },
  },
};
