import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  const getFavoritesKey = () => {
    return user?.email ? `favorites_${user.email}` : "favorites_guest";
  };

  const defaultCards = [
    {
      id: "coffee123",
      title: "Coffee House",
      description: "Best coffee in town with cozy atmosphere.",
      phone: "03-1234567",
      address: "Herzl 5, Tel Aviv",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    },
    {
  id: "chem789",
  title: "Chemical Engineering Lab",
  description: "Chemical process design and reaction engineering.",
  phone: "03-9876543",
  address: "Sami 8, Beersheba",
image: "https://www.statitech.co.il/wp-content/uploads/2024/07/Laboratory-tools-for-the-use-of-reagents.jpg"
}

  ];

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    if (!storedCards || storedCards.length === 0) {
      localStorage.setItem("cards", JSON.stringify(defaultCards));
      setCards(defaultCards);
    } else {
      setCards(storedCards);
    }

    const key = getFavoritesKey();
    const favs = JSON.parse(localStorage.getItem(key)) || [];
    setFavorites(favs.map((c) => c.id));
  }, [user]);

  const handleFavoriteToggle = (card) => {
    const key = getFavoritesKey();
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const isFav = stored.find((c) => c.id === card.id);

    let updatedFavorites;

    if (isFav) {
      updatedFavorites = stored.filter((c) => c.id !== card.id);
    } else {
      updatedFavorites = [...stored, card];
    }

    localStorage.setItem(key, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites.map((c) => c.id));
  };

  const restoreDefaultCards = () => {
    localStorage.setItem("cards", JSON.stringify(defaultCards));
    const key = getFavoritesKey();
    localStorage.setItem(key, JSON.stringify([]));
    setCards(defaultCards);
    setFavorites([]);
  };

  return (
    <div className="cards-page">
      

      <h2>All Cards</h2>
      <div
        className="cards-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "1.5rem"
        }}
      >
        {cards.map((card) => (
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
            <div
              className="card-actions"
              style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}
            >
              <Link to={`/card/${card.id}`}>
                <button>View</button>
              </Link>
              <button
                className="favorite-button"
                onClick={() => handleFavoriteToggle(card)}
              >
                {favorites.includes(card.id)
                  ? "⭐ Remove Favorite"
                  : "Add to Favorites"}
              </button>
              {user?.role === "business" && (
                <Link to={`/edit-card/${card.id}`}>
                  <button>Edit</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
