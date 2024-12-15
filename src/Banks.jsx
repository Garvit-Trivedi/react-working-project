import React, { useEffect, useState } from 'react';
import './BankDetails.css';

const Bank = () => {
  const [bank, setBank] = useState(null);
  const [searchIFSC, setSearchIFSC] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch States
  useEffect(() => {
    fetch('https://bank-apis.justinclicks.com/API/V1/STATE/')
      .then((res) => res.json())
      .then((data) => setStates(data))
      .catch((err) => console.error('Error fetching states:', err));
  }, []);

  // Fetch Districts
  const fetchDistricts = (state) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error('Error fetching districts:', err));
  };

  // Fetch Cities
  const fetchCities = (state, district) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${district}/`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error('Error fetching cities:', err));
  };

  // Fetch Centers
  const fetchCenters = (state, district, city) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${district}/${city}/`)
      .then((res) => res.json())
      .then((data) => setCenters(data))
      .catch((err) => console.error('Error fetching centers:', err));
  };

  // Fetch Bank Details
  const fetchBankByIFSC = (ifsc) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifsc}/`)
      .then((res) => res.json())
      .then((data) => setBank(data))
      .catch((err) => console.error('Error fetching bank data:', err));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict('');
    setSelectedCity('');
    setCenters([]);
    fetchDistricts(state);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCity('');
    setCenters([]);
    fetchCities(selectedState, district);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    fetchCenters(selectedState, selectedDistrict, city);
  };

  const handleSearch = () => {
    if (searchIFSC) fetchBankByIFSC(searchIFSC);
  };

  return (
    <div className="bank-container">
      <h2>Bank Finder</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by IFSC"
          value={searchIFSC}
          onChange={(e) => setSearchIFSC(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h3>Or Search by Location</h3>
      <div className="dropdown-section">
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {centers.length > 0 && (
        <div className="center-list">
          <h3>Available Centers</h3>
          <ul>
            {centers.map((center) => (
              <li key={center.IFSC}>
                {center.BANK} - {center.BRANCH}
              </li>
            ))}
          </ul>
        </div>
      )}

      {bank && (
        <div className="bank-details">
          <h3>Bank Details</h3>
          <p><strong>Bank:</strong> {bank.BANK}</p>
          <p><strong>Branch:</strong> {bank.BRANCH}</p>
          <p><strong>Address:</strong> {bank.ADDRESS}</p>
          <p><strong>City:</strong> {bank.CITY}</p>
          <p><strong>District:</strong> {bank.DISTRICT}</p>
          <p><strong>State:</strong> {bank.STATE}</p>
          <p><strong>IFSC:</strong> {bank.IFSC}</p>
          <p><strong>Contact:</strong> {bank.CONTACT}</p>
        </div>
      )}
    </div>
  );
};

export default Bank;
