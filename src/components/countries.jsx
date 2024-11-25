import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]); // Stores the filtered countries
  const [selectedCountry, setSelectedCountry] = useState(null); // Tracks the selected country
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors during API fetch
  const navigate = useNavigate(); // For dynamic navigation

  const kingdomList = [
    "Norway",
    "Tonga",
    "Lesotho",
    "Sweden",
    "Eswatini",
    "Morocco",
    "Bhutan",
    "Jordan",
    "Netherlands",
    "Saudi Arabia",
    "Denmark",
    "Bahrain",
    "Belgium",
    "Spain",
    "Cambodia",
    "United Kingdom",
    "Thailand",
  ];

  // Fetch countries from the API and filter by `kingdomList`
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          kingdomList.includes(country.name.common)
        );
        console.log("Filtered Countries:", filteredCountries);

        setCountries(filteredCountries); // Update state with filtered countries
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching countries:", error); // Log error
        setError("Failed to fetch countries. Please try again."); // Set error message
        setLoading(false); // Stop loading
      });
  }, []);

  // Handle country selection from dropdown
  const handleCountrySelect = (country) => {
    setSelectedCountry(country); // Update the selected country
    navigate(`/countries/${country.cca2}`, { state: { country } }); // Navigate with state
  };

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>{error}</p>;

  // Render countries dropdown and map
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "white" }}>World Kingdoms</h1>

      {/* Dropdown to select countries */}
      <select
        onChange={(e) => {
          const selectedCountry = JSON.parse(e.target.value); // Parse selected country
          handleCountrySelect(selectedCountry); // Navigate to details
        }}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid gray",
          borderRadius: "4px",
        }}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={JSON.stringify(country)}>
            {country.name.common}
          </option>
        ))}
      </select>

      {/* Display selected country */}
      {selectedCountry && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: "150px", marginBottom: "10px" }}
          />
          <h3 style={{ margin: 0 }}>{selectedCountry.name.common}</h3>
          <p>
            Capital: <strong>{selectedCountry.capital}</strong>
          </p>
          <p>
            Located in: <strong>{selectedCountry.subregion}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Countries;
