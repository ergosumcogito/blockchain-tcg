import { useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";
import "../App.css";

export function Store() {
  const { userAddress, openBooster, isLoading } = useOutletContext<AppContextType>();

  return (
    <div className="page-content">
      <h2>Card Store</h2>

      <p className="store-subtitle">
        Kaufe hier neue Booster Packs!
      </p>

      {!userAddress ? (
        <p>Bitte Wallet verbinden, um Packs zu kaufen.</p>
      ) : (
        <div className="store-card">

          <h3>Standard Booster</h3>

          <p className="store-booster-text">
            Enthält 5 zufällige Karten.
          </p>

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