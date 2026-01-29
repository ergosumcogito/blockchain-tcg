import { Link, useOutletContext } from "react-router-dom";
import type { AppContextType } from "../App";
import { getCardMeta } from "../cardData";

export function Collection() {
  const { collection, userAddress } = useOutletContext<AppContextType>();

  if (!userAddress) {
    return (
      <div className="page-content wallet-connect-msg">
        <p>Bitte verbinde deine Wallet, um deine Kartensammlung zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h2 className="collection-title">Deine Sammlung</h2>

      {collection.length === 0 ? (
        <div className="empty-state-box">
          <p className="empty-state-icon"></p>
          <p>Du besitzt noch keine Karten.</p>
        </div>
      ) : (
        <div className="card-grid">
          {collection.map((card) => {
            const meta = getCardMeta(card.id);

            const isMissing = card.balance === 0;

            return (
              <Link
                to={`/collection/${card.id}`}
                key={card.id}
                className={`tcg-card card-link-wrapper ${isMissing ? "is-missing" : ""}`}>
                  <div className="card-image-container">
                    <img
                      src={meta.image}
                      alt={meta.name}
                      className="collection-card-image"
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