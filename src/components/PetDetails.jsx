const PetDetails = ({ pet, setPet }) => {

  return (
    <>
    {pet.name ? (
      <div className="PetDetails">
        <h2>{pet.name}</h2>
        <p>Type: {pet.type}</p>
        <p>Breed: {pet.breed}</p>
        <button onClick={() => setPet({})}>Close</button>
      </div>
    ) : (
        <></>
    )
    }
    </>
  );
}

export default PetDetails;