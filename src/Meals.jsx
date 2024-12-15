import React, { useEffect, useState } from "react";
import './Meals.css'

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [searchTerm]);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Explore Delicious Meals</h1>
        <p className="sub-title">Search here 👇</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search meals (e.g., pasta, chicken)..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="meals-grid">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="meal-card"
              onClick={() => setSelectedMeal(meal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
              <h3 className="meal-name">{meal.strMeal}</h3>
            </div>
          ))
        ) : (
          <p className="no-results">{searchTerm ? "No meals found." : "Start by searching for a meal."}</p>
        )}
      </div>

      {selectedMeal && (
        <div className="meal-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedMeal(null)}>✖️</button>
            <h2 className="meal-detail-title">{selectedMeal.strMeal}</h2>
            {selectedMeal.strYoutube && (
              <div className="video-container">
                <iframe
                  title="Meal Instructions"
                  src={selectedMeal.strYoutube.replace("watch?v=", "embed/")}
                  className="meal-video"
                />
              </div>
            )}
            <p className="meal-instructions">{selectedMeal.strInstructions}</p>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Made with love for foodies | Powered by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">TheMealDB API</a></p>
      </footer>
    </div>
  );
};

export default Meals;
