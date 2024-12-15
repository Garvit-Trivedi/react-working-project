import React, { useEffect, useState } from "react";
import './Potter.css'; // Importing custom CSS file

const Potter = () => {
  const [data, setData] = useState([]); // To store fetched data
  const [endpoint, setEndpoint] = useState("characters"); // Default endpoint
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const BASE_URL = "https://potterapi-fedeperin.vercel.app/en"; // API Base URL

  // Fetch data from the selected endpoint
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Re-fetch data when the endpoint changes

  return (
    <div className="potter-container">
      <div className="potter-header">
        <h1 className="potter-title">Harry Potter API Explorer</h1>
        <div className="potter-selector">
          <select
            className="potter-dropdown"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="books">Books</option>
            <option value="characters">Characters</option>
            <option value="houses">Houses</option>
            <option value="spells">Spells</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && <div className="loading-spinner"></div>}

      {/* Error State */}
      {error && <p className="error-message">⚠️ Error: {error}</p>}

      <div className="data-display">
        <h2 className="data-title">{endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}</h2>

        {/* Display Data */}
        <div className="data-cards">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item._id || index} className="data-card">
                {/* Display Dynamic Content */}
                {item.image && <img src={item.image} alt={item.name || "Unnamed"} className="card-image" />}
                {endpoint === "books" && (
                  <>
                    {item.title && <h3 className="card-title">Title: {item.title}</h3>}
                    {item.originalTitle && <p className="card-text">Original Title: {item.originalTitle}</p>}
                    {item.releaseDate && <p className="card-text">Release Date: {item.releaseDate}</p>}
                    {item.description && <p className="card-text">Description: {item.description}</p>}
                    {item.pages && <p className="card-text">Pages: {item.pages}</p>}
                  </>
                )}
                {endpoint === "characters" && (
                  <>
                    {item.nickname && <h3 className="card-title">Name: {item.nickname}</h3>}
                    {item.hogwartsHouse && <p className="card-text">House: {item.hogwartsHouse}</p>}
                    {item.birthdate && <p className="card-text">Birthdate: {item.birthdate}</p>}
                  </>
                )}
                {endpoint === "houses" && (
                  <>
                    {item.house && <h3 className="card-title">House: {item.house}</h3>}
                    {item.founder && <p className="card-text">Founder: {item.founder}</p>}
                    {item.animal && <p className="card-text">Animal: {item.animal}</p>}
                  </>
                )}
                {endpoint === "spells" && (
                  <>
                    {item.spell && <h3 className="card-title">Spell: {item.spell}</h3>}
                    {item.use && <p className="card-text">Usage: {item.use}</p>}
                  </>
                )}
              </div>
            ))
          ) : (
            !loading && <p className="no-data">No data available for the selected category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Potter;
