
import { Client, ContractExecuteTransaction } from "@hashgraph/sdk";

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

const onSubmitOptIn = async () => {
  try {
    const contractExecuteTx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(500000)
      .setFunction("givePermission");

    const r = await contractExecuteTx.execute(client);
    console.log(r);

    alert("permission given !");
  } catch (err: any) {
    console.log(err);
  }
};

export const OptInButton = () => {
  return (
    <button className="btn btn-blue m-6" onClick={() => onSubmitOptIn()}>
      Give permission to read my credit score
    </button>
  );
};
