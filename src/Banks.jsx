import React, { useState } from "react";
import "./BankDetails.css";

const Banks = () => {
  const [bankDetails, setBankDetails] = useState(null);
  const [ifscCode, setIfscCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setBankDetails(null);

    if (!ifscCode.trim()) {
      setError("Please enter a valid IFSC code.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode.toUpperCase()}/`
      );

      if (!response.ok) {
        throw new Error("Bank not found. Please check the IFSC code.");
      }

      const data = await response.json();
      setBankDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="banks-container">
      <h1 className="banks-title">Bank Finder</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter IFSC Code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading">Searching...</p>}
      {error && <p className="error-message">{error}</p>}

      {bankDetails && (
        <div className="bank-details">
          <h2 className="bank-name">{bankDetails.BANK}</h2>
          <p><strong>Branch:</strong> {bankDetails.BRANCH}</p>
          <p><strong>IFSC:</strong> {bankDetails.IFSC}</p>
          <p><strong>City:</strong> {bankDetails.CITY}</p>
          <p><strong>State:</strong> {bankDetails.STATE}</p>
          <p><strong>District:</strong> {bankDetails.DISTRICT}</p>
          <p><strong>Address:</strong> {bankDetails.ADDRESS}</p>
          <p><strong>Contact:</strong> {bankDetails.CONTACT || "N/A"}</p>
          <p><strong>IMPS:</strong> {bankDetails.IMPS ? "Available" : "Not Available"}</p>
          <p><strong>RTGS:</strong> {bankDetails.RTGS ? "Available" : "Not Available"}</p>
          <p><strong>NEFT:</strong> {bankDetails.NEFT ? "Available" : "Not Available"}</p>
          <p><strong>UPI:</strong> {bankDetails.UPI ? "Available" : "Not Available"}</p>
        </div>
      )}
    </div>
  );
};

export default Banks;