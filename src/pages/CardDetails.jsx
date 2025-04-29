import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [card, setCard] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const defaultImage = "https://dummyimage.com/400x240/1a1a1a/ffffff&text=No+Image+Available"
;

  const getFavoritesKey = () => {
    return user?.email ? `favorites_${user.email}` : "favorites_guest";
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cards")) || [];
    const found = stored.find((c) => c.id === id);
    setCard(found);

    const favs = JSON.parse(localStorage.getItem(getFavoritesKey())) || [];
    setIsFavorite(favs.some((c) => c.id === id));
  }, [id, user]);

  const handleToggleFavorite = () => {
    const key = getFavoritesKey();
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    let updated;
    if (isFavorite) {
      updated = stored.filter((c) => c.id !== id);
    } else {
      updated = [...stored, card];
    }

    localStorage.setItem(key, JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!card) {
    return (
      <div className="loading-card">
        Loading card...
      </div>
    );
  }

  const validImage = card.image?.startsWith("http") ? card.image : defaultImage;

  return (
    <div className="card-details-wrapper">
      <div className="card-details-container">
        <img
          src={validImage}
          alt={card.title}
          className="card-details-image"
        />
        <h2 className="card-details-title">{card.title}</h2>
        <p className="card-details-description">{card.description}</p>
        <p className="card-details-info">
          <strong>Phone:</strong> {card.phone}
        </p>
        <p className="card-details-info">
          <strong>Address:</strong> {card.address}
        </p>

        <div className="card-details-buttons">
          <button onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
          <button
            onClick={handleToggleFavorite}
            className={isFavorite ? "favorite-button added" : "favorite-button"}
          >
            {isFavorite ? "⭐ Remove" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
