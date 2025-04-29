import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  const getFavoritesKey = () => {
    return user?.email ? `favorites_${user.email}` : "favorites_guest";
  };

  useEffect(() => {
    const key = getFavoritesKey();
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setFavorites(stored);
  }, [user]);

  const removeFromFavorites = (id) => {
    const key = getFavoritesKey();
    const updated = favorites.filter((c) => c.id !== id);
    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="cards-page">
      <h2>My Favorite Cards</h2>
      <div
        className="cards-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "1.5rem"
        }}
      >
        {favorites.length === 0 ? (
          <p>No favorite cards yet.</p>
        ) : (
          favorites.map((card) => (
            <div
              key={card.id}
              className="card"
              style={{
                width: "300px",
                background: "#1a1a1a",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
              }}
            >
              <img
                src={
                  card.image ||
                  "https://dummyimage.com/400x240/1a1a1a/ffffff&text=No+Image+Available"
                }
                alt={card.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "0.5rem"
                }}
              />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p><strong>Phone:</strong> {card.phone}</p>
              <p><strong>Address:</strong> {card.address}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <Link to={`/card/${card.id}`}>
                  <button>View</button>
                </Link>
                <button onClick={() => removeFromFavorites(card.id)}>
                  ⭐ Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
