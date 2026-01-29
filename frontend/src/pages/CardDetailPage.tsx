import { useParams, useOutletContext, Link } from 'react-router-dom';
import type { AppContextType } from "../App";
import { getCardMeta } from "../cardData";

export function CardDetailPage() {
    const { id } = useParams();
    const { collection } = useOutletContext<AppContextType>();

    const userCard = collection.find((card) => String(card.id) === id);
    const meta = getCardMeta(Number(id));

    if (!userCard) {
        return <div>Du besitzt diese Karte nicht oder sie existiert nicht.</div>
    }

    return (
        <div className="page-content">
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
                <Link
                    to="/collection"
                    style={{
                        color: "#aaa",
                        textDecoration: "none",
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <span>‹</span> Zurück zur Sammlung
                </Link>
            </div>

            <div className="detail-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}></div>

            <img
                src={meta.image}
                alt={meta.name}
                style={{ 
                    width: "100%", 
                    maxWidth: "300px", 
                    borderRadius: "15px", 
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)" 
                }}
            />

            <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: "10px 0" }}>{meta.name}</h1>
                <div style={{
                    marginTop: "10px",
                    padding: "20px",
                    border: "1px solid #444",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05",
                    minWidth: "250px"
                }}>
                    <p style={{ margin: "5px 0", color: "#aaa" }}>Karten ID: #{userCard.id}</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0" }}>
                        Im Besitz: {userCard.balance}x
                    </p>
                </div>
            </div>
        </div>
    )
}