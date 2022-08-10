import React, { useEffect, useState } from "react";
import "./HashPackConnect.css";
import { HashConnect, HashConnectTypes } from "hashconnect";

let appMetadata: HashConnectTypes.AppMetadata = {
  name: "dApp Example",
  description: "An example hedera dApp",
  icon: "https://absolute.url/to/icon.png",
};

let hashconnect = new HashConnect(true);

function setUpHashConnectEvents() {
  hashconnect.foundExtensionEvent.once((walletMetadata) => {
    console.log("walletMetadata", walletMetadata);
  });
  hashconnect.pairingEvent.once((pairingData) => {
    console.log("pairingData", pairingData);
  });
  hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
    console.log("connectionStatus", connectionStatus);
  });
}

function HashPackConnect() {
  const [hashconnectData, setHashconnectData] = useState<
    undefined | HashConnectTypes.InitilizationData
  >();
  console.log(hashconnectData);

  setUpHashConnectEvents();

  useEffect(() => {
    setUpHashConnectEvents();

    hashconnect
      .init(appMetadata, "testnet", false)
      .then((initData) => {
        setHashconnectData(initData);
        console.log("hcData", hashconnect.hcData);
        if (!hashconnect.hcData.pairingData.length) {
          hashconnect.connectToLocalWallet();
        }
        // const provider = hashconnect.getProvider(
        //   "testnet",
        //   saveData.topic,
        //   accountId
        // );
      })
      .catch((e) => {
        console.error(":(", e);
      });
  }, []);

  return (
    <div className="hashpack-connect">
      {/* <button
        className="btn btn-blue mt-6"
        onClick={() => {
          navigator.clipboard.writeText(hashconnectData?.pairingString || "");
        }}
      >
        Copy my pairing string
      </button> */}
    </div>
  );
}

export default HashPackConnect;
