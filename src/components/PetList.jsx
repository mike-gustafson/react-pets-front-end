const PetList = ({ pets, loading, showDetails }) => {
  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet._id}>
          <a 
            href="#" 
            onClick={() => showDetails(pet._id)}
          >
            {pet.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default PetList;