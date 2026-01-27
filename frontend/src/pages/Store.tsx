import { useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";

export function Store() {
  const { userAddress, openBooster, isLoading } = useOutletContext<AppContextType>();

  return (
    <div className="page-content"> {}
      <h2>Card Store</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
        Kaufe hier neue Booster Packs!
      </p>
      
      {!userAddress ? (
        <p>Bitte Wallet verbinden, um Packs zu kaufen.</p>
      ) : (
        <div style={{ 
          border: "1px solid #333", 
          padding: 30, 
          borderRadius: 16,
          background: "var(--card-bg)",
          maxWidth: "350px",
          width: "100%"
        }}>
          <h3>Standard Booster</h3>
          <p style={{ margin: "10px 0 20px 0" }}>Enthält 5 zufällige Karten</p>
          
          <button 
            onClick={openBooster} 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? "Öffne..." : "Open Booster (5 Cards)"}
          </button>
        </div>
      )}
    </div>
  );
}