import React, { useEffect, useState } from "react";
import './Cocktail.css'
const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchCocktails = async () => {
    setLoading(true);
    setError(null);
    let url = "";

    try {
      switch (filterType) {
        case "name":
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
          break;
        case "firstLetter":
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
          break;
        case "random":
          url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
          break;
        case "category":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`;
          break;
        case "ingredient":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
          break;
        case "alcoholic":
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${search}`;
          break;
        default:
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
    } catch (err) {
      setError("Failed to fetch cocktails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search || filterType === "random") {
      fetchCocktails();
    }
  }, [search, filterType]);

  const openPopup = (cocktail) => {
    setSelectedCocktail(cocktail);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCocktail(null);
  };

  const getIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  return (
    <div className="container">
      <h2 className="title">Cocktails Explorer</h2>

      <div className="search-filter">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a cocktail..."
          className="search-input"
          disabled={filterType === "random"}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="name">Search by Name</option>
          <option value="firstLetter">Search by First Letter</option>
          <option value="random">Random Cocktail</option>
          <option value="category">Filter by Category</option>
          <option value="ingredient">Filter by Ingredient</option>
          <option value="alcoholic">Filter by Alcoholic/Non-Alcoholic</option>
        </select>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      <div className="cocktail-list">
        {cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="cocktail-card"
              onClick={() => openPopup(cocktail)}
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="cocktail-image"
              />
              <div className="cocktail-info">
                <h3 className="cocktail-name">{cocktail.strDrink}</h3>
                <p className="cocktail-category">
                  {cocktail.strCategory || "Unknown Category"}
                </p>
                <p className="cocktail-type">
                  {cocktail.strAlcoholic || "Unknown Type"}
                </p>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="no-cocktails">No cocktails found.</p>
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h3 className="popup-title">{selectedCocktail.strDrink}</h3>
            <p className="popup-category">
              {selectedCocktail.strCategory || "Unknown Category"}
            </p>
            <p className="popup-type">
              {selectedCocktail.strAlcoholic || "Unknown Type"}
            </p>
            <p className="popup-ingredients">Ingredients:</p>
            <ul className="popup-ingredients-list">
              {getIngredients(selectedCocktail).map((ingredient, index) => (
                <li key={index} className="popup-ingredient">
                  {ingredient}
                </li>
              ))}
            </ul>
            <button className="popup-close" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cocktails;
