import { useEffect, useState } from 'react';

import {
    AccountId,
    Client,
    ContractExecuteTransaction
} from '@hashgraph/sdk';


const contractId = process.env.REACT_APP_CONTRACT_ID;
const operatorId = process.env.REACT_APP_CONSUMER_ACCOUNT_ID;
const operatorPK = process.env.REACT_APP_CONSUMER_PRIVATE_KEY;

// If we weren't able to grab it, we should throw a new error
if (operatorId == null || operatorPK == null || contractId == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(operatorId, operatorPK);

const onSubmitOptOut = async () => {
    try {
        const contractExecuteTx = new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(50000)
            .setFunction("revokePermission")
    
            await contractExecuteTx.execute(client)
    
            alert("permission revoked !")
        } catch (err: any) {
            console.log(err)
    }
};

export const OptOutButton = () => {
    
  return(<button
  className="m-6 btn btn-blue"
  onClick={() => onSubmitOptOut()}
>
  Revoke permission to read my credit score
</button>)
};
