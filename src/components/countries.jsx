import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const filtered = response.data.filter((country) =>
          kingdomList.includes(country.name.common)
        );

        setCountries(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setError("Failed to fetch countries. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    navigate(`/countries/${country.cca2}`, { state: { country } });
    console.log(country)
  };

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "white" }}>World Kingdoms</h1>

      <select
        onChange={(e) => {
          const selectedCountry = JSON.parse(e.target.value);
          setSelectedCountry(selectedCountry);
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

      {selectedCountry && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            textAlign: "center",
          }}
          onClick={() => handleCountrySelect(selectedCountry)}
        >
          <img
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: "150px", marginBottom: "10px" }}
          />
          <h3 style={{ margin: 0 }}>{selectedCountry.name.common}</h3>
          <p>Capital: <strong>{selectedCountry.capital}</strong></p>
          <p>Located in: <strong>{selectedCountry.subregion}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Countries;
