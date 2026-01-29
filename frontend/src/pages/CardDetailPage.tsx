import { useParams, useOutletContext, Link } from 'react-router-dom';
import type { AppContextType } from '../App';

export function CardDetailPage() {
    const { id } = useParams();
    const { collection } = useOutletContext<AppContextType>();

    const card = collection.find((card) => String(card.id) === id);

    if (!card) {
        return (
            <div className="page-content">
                <p>Karte nicht gefunden.</p>
                <Link to="/collection" style={{ color: "#fff" }}>Zurück zur Sammlung</Link>
            </div>
        );
    }

    return (
        <div className="page-content">
            <Link to="/collection" style={{ display: "block", marginBottom: "20px", color: "#aaa" }} >← Zurück zur Sammlung</Link>
            <h2>Karte #{card.id}</h2>
            <div style={{ fontSize: "2rem", margin: "20px 0" }}>BILD</div>
            <p>Anzahl im Besitz: <strong>{card.balance}</strong></p>
        </div>
    );
}