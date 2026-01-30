import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { getContract } from "./contract";
import { Navbar } from "./components/Navbar";
import { Store } from "./pages/Store";
import { Collection } from "./pages/Collection";
import { CardDetailPage } from "./pages/CardDetailPage";
import "./App.css";

export type AppContextType = {
  userAddress: string | null;
  collection: { id: number; balance: number }[];
  openBooster: () => Promise<void>;
  isLoading: boolean;
};

// --- Layout Wrapper ---
function Layout({ 
  userAddress, 
  connectWallet, 
  contextData 
}: { 
  userAddress: string | null, 
  connectWallet: () => void, 
  contextData: AppContextType 
}) {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="container-limit">
          <div className="header-bar">
            <h2 className="app-title">BlockDeck</h2>
            
            {userAddress ? (
              <span className="wallet-badge">
                {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </span>
            ) : (
              <button 
                onClick={connectWallet} className="connect-btn">
                Connect Wallet
              </button>
            )}
          </div>
          <Outlet context={contextData} />
        </div>
      </div>

      <Navbar />
    </div>
  );
}

// --- Main App Logic ---
function App() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [collection, setCollection] = useState<{ id: number; balance: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Wallet verbinden
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Bitte MetaMask installieren");
    try {
      const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setUserAddress(accounts[0]);
    } catch (e) {
      console.error("Connection rejected", e);
    }
  };

  // 2. Sammlung laden
  const loadCollection = async () => {
    if (!userAddress) return;
    try {
      const contract = await getContract();
      const ids: bigint[] = await contract.getAllCardIds();
      
      // Parallel alle Balances abfragen
      const balances = await Promise.all(
        ids.map((id) => contract.balanceOf(userAddress, id))
      );

      setCollection(
        ids.map((id, i) => ({
          id: Number(id),
          balance: Number(balances[i]),
        }))
      );
    } catch (error) {
      console.error("Fehler beim Laden der Collection:", error);
    }
  };

  // 3. Booster öffnen
  const openBooster = async () => {
    if (!userAddress) return;
    setIsLoading(true);
    try {
      const contract = await getContract();
      const tx = await contract.openBooster(5);
      console.log("Transaktion gesendet:", tx.hash);
      
      await tx.wait();
      
      alert("Pack erfolgreich geöffnet!");
      await loadCollection();
    } catch (error) {
      console.error("Fehler beim Öffnen:", error);
      alert("Transaktion fehlgeschlagen oder abgebrochen.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userAddress) {
      loadCollection();
    } else {
      setCollection([]);
    }
  }, [userAddress]);

  const contextData: AppContextType = {
    userAddress,
    collection,
    openBooster,
    isLoading
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <Layout 
            userAddress={userAddress} 
            connectWallet={connectWallet} 
            contextData={contextData} 
          />
        }>
          <Route path="/" element={<Store />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:id" element={<CardDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;