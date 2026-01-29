import { Link, useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";
import { getCardMeta } from "../cardData";

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
    <div className="page-content">
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
          {collection.map((card) => {
            const meta = getCardMeta(card.id);

            return (
              <Link
                to={`/collection/${card.id}`}
                key={card.id}
                className="tcg-card"
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <div className="card-image-container">
                    <img
                      src={meta.image}
                      alt={meta.name}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </div>

                  <div className="card-info">
                    <div className="card-title">{meta.name}</div>
                    <div className="card-balance">Besitz: {card.balance}</div>
                  </div>
                </Link>
            );
          })}
      </div>
      )}
    </div>
  );
}