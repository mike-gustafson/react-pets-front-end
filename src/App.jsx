import React, { useEffect, useState } from "react";
import * as petService from "./services/petService";
import PetDetails from "./components/PetDetails";
import PetList from "./components/PetList";
import PetForm from "./components/PetForm";
import "./App.css";

const App = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    if (id === "none") {
      setSelectedPet({});
      return;
    }
    if (id === "form") {
      setSelectedPet({});
      setIsFormOpen(true);
      return;
    }
    setSelectedPet(pets.find((pet) => pet._id === id));
    setIsFormOpen(false);
    if (!selectedPet) {
      setError("Pet not found.");
    }
  }

  const handleSetPet = (pet) => {
    setSelectedPet(pet);
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleAddPet = async (newPet) => {
    try {
      const createdPet = await petService.createPet(newPet);
      setPets([...pets, createdPet]);
    } catch (err) {
      console.error("Error adding pet:", err);
      setError("Failed to add pet.");
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Adopt a Pet</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
        <PetList 
          pets={pets} 
          loading 
          showDetails={handleShowDetails} 
          handleFormView={handleFormView}

        />
        )}
      </header>
      <div className="App-content">
      <PetDetails pet={selectedPet} setPet={handleSetPet} />
      {isFormOpen && <PetForm submit={handleAddPet}/>}
      </div>
    </div>
  );
};

export default App;
