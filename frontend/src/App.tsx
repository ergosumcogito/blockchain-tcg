import { useEffect, useState } from "react";
import { getContract } from "./contract";

function App() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [collection, setCollection] = useState<{ id: number; balance: number }[]>([]);

  // Step 1: connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask first");
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setUserAddress(accounts[0]);
  };

  // Step 2: load collection
  const loadCollection = async () => {
    if (!userAddress) return;

    const contract = await getContract();
    const ids: bigint[] = await contract.getAllCardIds();

    const balances = await Promise.all(
      ids.map((id) => contract.balanceOf(userAddress, id))
    );

    setCollection(
      ids.map((id, i) => ({
        id: Number(id),
        balance: Number(balances[i]),
      }))
    );
  };

  // Step 3: open booster
  const openBooster = async () => {
    if (!userAddress) return;

    const contract = await getContract();
    const tx = await contract.openBooster(3); // pack size = 3
    await tx.wait();

    await loadCollection();
  };

  // Auto load collection when wallet is connected
  useEffect(() => {
    if (userAddress) loadCollection();
  }, [userAddress]);

  return (
    <div style={{ padding: 20 }}>
      <h1>TCG1155 MVP Test</h1>

      {!userAddress && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      {userAddress && (
        <>
          <p>Connected: {userAddress}</p>
          <button onClick={openBooster}>Open Booster (3 cards)</button>

          <h2>Collection:</h2>
          <ul>
            {collection.map((card) => (
              <li key={card.id}>
                Card #{card.id}: {card.balance} copies
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
