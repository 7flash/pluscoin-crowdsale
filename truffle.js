require("babel-register");
require("babel-polyfill");

// http://truffleframework.com/tutorials/using-infura-custom-provider
// const bip39 = require("bip39");
// const hdkey = require("ethereumjs-wallet/hdkey");
// const ProviderEngine = require("web3-provider-engine");
// const WalletSubprovider = require("web3-provider-engine/subproviders/wallet.js");
// const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
// const Web3 = require("web3");
//
// // Get our mnemonic and create an hdwallet
// const mnemonic = process.env.MNEMONIC || "price legal churn escape digital timber menu replace crime interest great oblige";
// const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
//
// const hdPath = "m/44'/60'/0'/0/";
// const wallet = hdwallet.derivePath(`${ hdPath }0`).getWallet();
// const address = `0x${ wallet.getAddress().toString("hex") }`;
//
// const providerUrl = "https://ropsten.infura.io";
// const engine = new ProviderEngine();
// engine.addProvider(new WalletSubprovider(wallet, {}));
// engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
// engine.start(); // Required by the provider engine.

// SNT
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = process.env.MNEMONIC || "price legal churn escape digital timber menu replace crime interest great oblige";
const providerUrl = "https://ropsten.infura.io";

const providerRopsten = new HDWalletProvider(mnemonic, providerUrl, 0);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 4000000,
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
  },
};
