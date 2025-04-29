import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCard = () => {
  const [card, setCard] = useState({ title: "", description: "", image: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const newCard = { ...card, id: Date.now() };
    localStorage.setItem("cards", JSON.stringify([...cards, newCard]));
    toast.success("Card created successfully!");
    navigate("/my-cards");
  };

  return (
    <div className="form-container">
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={card.title}
          onChange={(e) => setCard({ ...card, title: e.target.value })}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Description"
          value={card.description}
          onChange={(e) => setCard({ ...card, description: e.target.value })}
        />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          placeholder="Image URL"
          value={card.image}
          onChange={(e) => setCard({ ...card, image: e.target.value })}
        />

        <button type="submit">
          Create Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
