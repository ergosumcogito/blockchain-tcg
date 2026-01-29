import { Link, useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";

export function Collection() {
  const { collection, userAddress } = useOutletContext<AppContextType>();

  if (!userAddress) {
    return (
      <div className="page-content" style={{ marginTop: "50px" }}>
        <p>Bitte verbinde deine Wallet,<br/>um deine Karten zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="page-content"> {}
      <h2 style={{ marginBottom: "20px" }}>Deine Sammlung</h2>

      {collection.length === 0 ? (
        <div style={{ 
          padding: "40px", 
          border: "1px dashed #444", 
          borderRadius: "12px",
          background: "rgba(255,255,255,0.02)"
        }}>
          <p style={{ fontSize: "3rem", margin: 0 }}></p>
          <p>Du besitzt noch keine Karten.</p>
        </div>
      ) : (
        <div className="card-grid">
          {collection.map((card) => (
            <Link 
              to={`/collection/${card.id}`} 
              key={card.id} 
              className="tcg-card"
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <div className="card-id">#{card.id}</div>
              <div className="card-balance">{card.balance}x</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}