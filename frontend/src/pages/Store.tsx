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

          <img
            src="https://kartomaniak.pl/userdata/public/gfx/675/P10346-ME01-3D-Booster-Wraps-Standard-3-MVenasaur-25.png"
            alt="Standard Booster Pack"
            className="store-booster-image"
          />

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