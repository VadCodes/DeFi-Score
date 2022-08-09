require("dotenv").config();
require("module-alias/register");
require("@nomiclabs/hardhat-waffle");

const shell = require("shelljs");
const { TokenId } = require("@hashgraph/sdk");

const {
  Network,
  Config,
  Hashgraph,
  SDK: { ContractFunctionParameters },
} = require("hashgraph-support");

task("deploy", "Deploy a hedera contract")
  .addParam(
    "contract",
    "Name of contract that you wish to deploy to Hedera, from your /contracts folder"
  )
  .addOptionalParam(
    "destination",
    "The network that you are deploying to. Currently supporting previewnet/testnet",
    ""
  )
  .setAction(async (args) => {
    const destinationNetwork = args.destination || Config.network;
    const client = Network.getNodeNetworkClient(destinationNetwork);

    const contractInitialisation = {
      contractName: args.contract,
      // Optional, injected into the constructor, in this case for the "HelloWorld" Contract
      constructorParams: new ContractFunctionParameters().addAddress(
        TokenId.fromString(process.env.STAKABLE_TOKEN_ID).toSolidityAddress()
      ),
    };

    const contractId = await Hashgraph(client).contract.create(
      contractInitialisation
    );

    // Check that contract test exist
    shell.exec(`bin/check-for-contract-test ${args.contract.toUpperCase()}`);

    // Inject the latest deployed contract ID into the env
    shell.exec(
      `bin/update-contract-id ${args.contract.toUpperCase()} ${contractId.toString()}`
    );

    console.log("Contract id: " + contractId.toString());
  });