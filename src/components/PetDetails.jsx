const PetDetails = ({ pet, setPet }) => {

  return (
    <>
    {pet.name ? (
      <div>
        <h2>{pet.name}</h2>
        <p>{pet.type}</p>
        <p>{pet.breed}</p>
        <button onClick={() => setPet({})}>Close</button>
      </div>
    ) : (
      <p>No pet selected</p>
    )
    }
    </>
  );
}

export default PetDetails;