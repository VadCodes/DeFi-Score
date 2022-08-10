import { Client, ContractCallQuery } from "@hashgraph/sdk";
import { useState } from "react";
import "./ConsumerDashboard.css";
import { OptInButton } from "./OptInButton";
import { OptOutButton } from "./OptOutButton";

const contractId = process.env.REACT_APP_CONTRACT_ID!;
const operatorId = process.env.REACT_APP_CONSUMER_ACCOUNT_ID!;
const operatorPK = process.env.REACT_APP_CONSUMER_PRIVATE_KEY!;

const client = Client.forTestnet();

client.setOperator(operatorId, operatorPK);

function ConsumerDashboard() {
  const [history, setHistory] = useState<string[]>([]);

  async function refreshHistory() {
    try {
      const response = await new ContractCallQuery()
        .setContractId(contractId)
        .setGas(500000)
        .setFunction("getReadCreditScores")
        .execute(client);

      console.log(response);
      // TODO: Need to figure out how to parse the address array from the function result
      setHistory(["0000000000000000000000000000000002da4f95"]);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="consumer-dashboard">
      <h1 className="text-3xl font-bold underline">
        My Credit Score Dashboard
      </h1>
      <p className="mt-6">
        By clicking opting-in, you allow trusted vendors to have access to your
        credit score. You will be able to track who consults your score.
      </p>

      <OptInButton />

      <OptOutButton />

      <h1 className="mt-6 text-3xl font-bold underline">Consult History</h1>

      <button onClick={() => refreshHistory()} className="btn btn-blue m-6">
        refresh history
      </button>
      <div className="mt-6 consult-history">
        <ul className="list-disc list-inside text-slate-700 bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5 p-4 pl-8 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400">
          {history.map((address) => (
            <li key={address}>{address}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConsumerDashboard;
