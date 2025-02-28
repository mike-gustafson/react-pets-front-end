const PetDetails = ({ pet, setPet, editPet, deletePet }) => {

  return (
    <>
    {pet.name ? (
      <div className="PetDetails">
        <h2>{pet.name}</h2>
        <p>Type: {pet.type}</p>
        <p>Breed: {pet.breed}</p>
        <button onClick={() => setPet({})}>Close</button>
        <button onClick={() => editPet(pet._id)}>Edit</button>
        <button onClick={() => deletePet(pet._id)}>Delete</button>
      </div>
    ) : (
        <></>
    )
    }
    </>
  );
}

export default PetDetails;