import { useParams, useOutletContext, Link } from "react-router-dom";
import type { AppContextType } from "../App";
import { getCardMeta } from "../cardData";
import "../App.css";
import Tilt from "react-parallax-tilt";

export function CardDetailPage() {
    const { id } = useParams();
    const { collection } = useOutletContext<AppContextType>();

    const userCard = collection.find((card) => String(card.id) === id);
    const meta = getCardMeta(Number(id));

    if (!userCard) {
        return <div>Du besitzt diese Karte nicht oder sie existiert nicht.</div>
    }

    const isMissing = userCard.balance === 0;
    const imageClass = isMissing ? "detail-image is-missing" : "detail-image";

    return (
        <div className="page-content">

            <div className="back-link-container">
                <Link to="/collection" className="back-link">
                    <span>‹</span> Zurück zur Sammlung
                </Link>
            </div>

            <div className="detail-container">

                <Tilt
                    tiltEnable={!isMissing}
                    scale={1.05}
                    transitionSpeed={1000}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={!isMissing}
                    glareMaxOpacity={0.4}
                    glareColor="#ffffff"
                    glarePosition="all"
                >
                    <img
                        src={meta.image}
                        alt={meta.name}
                        className={imageClass}
                    />
                </Tilt>

                <div className="detail-info-wrapper">
                    <h1 className="detail-title">{meta.name}</h1>

                    <div className="stats-box">
                        <p className="stats-id">Karten ID: #{userCard.id}</p>
                        <p className="stats-balance">
                            Im Besitz: {userCard.balance}x
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}