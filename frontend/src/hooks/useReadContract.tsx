import { useEffect, useState } from 'react';

import {
    AccountId,
    Client,
    ContractFunctionParameters,
    ContractCallQuery,
    ContractFunctionResult
} from '@hashgraph/sdk';

const contractId = process.env.REACT_APP_CONTRACT_ID;
const operatorId = process.env.REACT_APP_OPERATOR_ID;
const operatorPK = process.env.REACT_APP_OPERATOR_PRIVATE_KEY;

// If we weren't able to grab it, we should throw a new error
if (operatorId == null || operatorPK == null || contractId == null) {
  throw new Error(
    "Environment variables myAccountId and myPrivateKey must be present"
  );
}

const solidityAddress = AccountId.fromString(operatorId).toSolidityAddress();

// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();

client.setOperator(operatorId, operatorPK);

export const useReadContract = () => {
    const [result, setResult] = useState<ContractFunctionResult | null>(null);
    
    useEffect(() => {
        const init = async () => {
            try {
                const response = await new ContractCallQuery()
                    .setContractId(contractId)
                    .setGas(25000)
                    .setFunction('getReadCreditScores', new ContractFunctionParameters().addAddress(solidityAddress))
                    .execute(client);
                setResult(response);
            } catch (err: any) {
                console.log(err);
            }
        }
        init();

    }, []);
  return { result };
};
