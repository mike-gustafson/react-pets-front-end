import React, { useEffect, useState } from "react";
import * as petService from "./services/petService";

const App = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsData = await petService.fetchPets();
        setPets(petsData);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowDetails = (id) => {
    setSelectedPet(pets.find((pet) => pet._id === id));
    if (!selectedPet) {
      setError("Pet not found.");
    }

  }

  return (
    <div>
      <h1>Adopt a Pet</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet._id}>
              <a href="#">{pet.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
