import {
  AccountId,
  Client, ContractExecuteTransaction,
  ContractFunctionParameters, TransactionResponse
} from "@hashgraph/sdk";
import { useState } from "react";

const contractId = process.env.REACT_APP_CONTRACT_ID;
const operatorId = process.env.REACT_APP_CONSUMER_ACCOUNT_ID;
const operatorPK = process.env.REACT_APP_CONSUMER_PRIVATE_KEY;

// If we weren't able to grab it, we should throw a new error
if (operatorId == null || operatorPK == null || contractId == null) {
  throw new Error(
    "Environment variables operatorId and operatorPK and contractID must be present"
  );
}

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(operatorId, operatorPK);

const readCreditScore = async (address: string) => {
  try {
    const contractExecuteTx = new ContractExecuteTransaction({ amount: 1 })
      .setContractId(contractId)
      .setGas(500000)
      .setFunction(
        "getCreditScore",
        new ContractFunctionParameters().addAddress(address)
      );

    const r: TransactionResponse = await contractExecuteTx.execute(client);

    alert(
      `credit score is ${(await r.getRecord(client)).contractFunctionResult
        ?.getUint40()
        .toNumber()}`
    );
  } catch (err: any) {
    alert(
      `you are not allowed to consult`
    );
    console.log(err);
  }
};

function VendorDashboard() {
  const [address, setAddress] = useState(
    AccountId.fromString(
      process.env.REACT_APP_CONSUMER_ACCOUNT_ID!
    ).toSolidityAddress()
  );

  return (
    <div className="consumer-dashboard">
      <h1 className="text-3xl font-bold underline">My Vendor Dashboard</h1>
      <div className="mt-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Consumer Address
        </label>
        <input
          type="text"
          id="first_name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        className="btn btn-blue mt-6"
        onClick={() => readCreditScore(address)}
      >
        Consult score
      </button>
    </div>
  );
}

export default VendorDashboard;
