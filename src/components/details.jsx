import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { cca2 } = useParams();
  const { state } = useLocation();
  const [country, setCountry] = useState(state?.country || null);
  const [loading, setLoading] = useState(!state?.country);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${cca2}`)
        .then((response) => {
          setCountry(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching country details:", error);
          setError("Failed to load details. Please try again.");
          setLoading(false);
        });
    }
  }, [cca2, country]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!country) return <p>No data available</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "purple" }}>Kingdom of {country.name.common}</h1>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "300px", border: "2px solid black", marginBottom: "20px" }}
      />
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Located in:</strong> {country.subregion || "N/A"}
      </p>
    </div>
  );
};

export default Details;
