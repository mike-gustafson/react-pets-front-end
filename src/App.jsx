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

  const handleFormSubmit = (petData) => {
    console.log(petData);
    if (petData.formType === "edit") {
      handleEditPet(selectedPet._id, petData);
    }
    if (petData.formType === "create") {
      handleAddPet(petData);
    }
  }
   

  const handleAddPet = async (newPet) => {
    try {
      const createdPet = await petService.createPet(newPet);
      setPets([...pets, createdPet]);
      setSelectedPet(createdPet);
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error adding pet:", err);
      setError("Failed to add pet.");
    }
  }

  const handleDeletePet = async (id) => {
    try {
      await petService.deletePet(id);
      setPets(pets.filter((pet) => pet._id !== id));
      setSelectedPet({});
    } catch (err) {
      console.error("Error deleting pet:", err);
      setError("Failed to delete pet.");
    }
  }

  const handleEditPet = async (id, updatedPet) => {
    try {
      const editedPet = await petService.updatePet(id, updatedPet);
      const updatedPets = pets.map((pet) => (pet.id === id ? editedPet : pet));
      setPets(updatedPets);
      setSelectedPet(editedPet);
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error editing pet:", err);
      setError("Failed to edit pet.");
    }
  }

  const handleShowEditForm = (id) => {
    setSelectedPet(pets.find((pet) => pet._id === id));
    setIsFormOpen(true);
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
      <PetDetails 
        pet={selectedPet} 
        setPet={handleSetPet}
        deletePet={handleDeletePet}
        editPet={handleShowEditForm} />
      {isFormOpen && 
        <PetForm 
          selectedPet={selectedPet}
          submit={handleFormSubmit} 
          selected={handleEditPet}
          update={handleEditPet}
        />}
      </div>
    </div>
  );
};

export default App;
