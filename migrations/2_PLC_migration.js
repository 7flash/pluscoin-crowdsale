const fs = require("fs");
const path = require("path");
const moment = require("moment");

const KYC = artifacts.require("KYC.sol");
const PLCCrowdsale = artifacts.require("PLCCrowdsale.sol");
const PLC = artifacts.require("PLC.sol");
const RefundVault = artifacts.require("crowdsale/RefundVault.sol");
const MultiSig = artifacts.require("wallet/MultiSigWallet.sol");

let kycAddress;

module.exports = async function (deployer, network, accounts) {
  console.log("[accounts]");
  accounts.forEach((account, i) => console.log(`[${ i }]  ${ account }`));

  try {
    const maxEtherCap = 100000 * 10 ** 18;
    const minEtherCap = 30000 * 10 ** 18;

    const startTime = moment.utc("2017-09-26").unix();
    const startDate = moment.utc("2017-09-26");
    const endTime = moment.utc("2017-10-10").unix();

    const firstBonusDeadline = startDate.add(1, "day").unix();
    const secondBonusDeadline = startDate.add(2, "day").unix();
    const thirdBonusDeadline = startDate.add(3, "day").unix();
    const fourthBonusDeadline = startDate.add(3, "day").unix();

    const timelines = [
      startTime,
      firstBonusDeadline,
      secondBonusDeadline,
      thirdBonusDeadline,
      fourthBonusDeadline,
      endTime,
    ];

    // for demo

    // const step = network === "development" ? "seconds" : "minutes";
    // const timelines = [
    //   moment().add(10, step).unix(), // start
    //   moment().add(15, step).unix(),
    //   moment().add(20, step).unix(),
    //   moment().add(25, step).unix(),
    //   moment().add(30, step).unix(),
    //   moment().add(35, step).unix(), // end
    // ];
    // const maxEtherCap = 5 * 10 ** 18;
    // const minEtherCap = 1 * 10 ** 18;

    const reserveWallet = [
      "0x822Bb1cdd2051323ABdb3D705E6d67F70c6F1516",
      "0x3a9DdA0eC79B6C38b650C56F4885C291551542a2",
      "0x528960b54D618A99683EbDcCd83Ed5da02616a45",
    ];

    if (network === "mainnet") {
      kycAddress = "0x8fc95Edf1C8720510809d881b1E3A44aB4B8d031";
    } else {
      const kyc = await KYC.new();
      kycAddress = kyc.address;
    }
    console.log("kyc deployed at", kycAddress);

    const multiSig = await MultiSig.new(reserveWallet, reserveWallet.length - 1); // 4 out of 5
    console.log("multiSig deployed at", multiSig.address);

    const token = await PLC.new();
    console.log("token deployed at", token.address);

    const vault = await RefundVault.new(multiSig.address, reserveWallet);
    console.log("vault deployed at", vault.address);

    /*eslint-disable */
    const crowdsale = await PLCCrowdsale.new(
      kycAddress,
      token.address,
      vault.address,
      multiSig.address,
      reserveWallet,
      timelines,
      maxEtherCap,
      minEtherCap
    );
    /*eslint-enable */
    console.log("crowdsale deployed at", crowdsale.address);

    await token.transferOwnership(crowdsale.address);
    await vault.transferOwnership(crowdsale.address);

    fs.writeFileSync(path.join(__dirname, "../addresses.json"), JSON.stringify({
      multiSig: multiSig.address,
      token: token.address,
      vault: vault.address,
      crowdsale: crowdsale.address,
    }, undefined, 2));
  } catch (e) {
    console.error(e);
  }
};
