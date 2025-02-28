const PetList = ({ pets, loading, showDetails }) => {
  return (
    <select name="pets" id="pets" onChange={(e) => showDetails(e.target.value)}>
      <option value="none">Select a pet</option>
      {pets.map((pet) => (
        <option key={pet._id} value={pet._id}>
          {pet.name}
        </option>
      ))}
    </select>
  );
}

export default PetList;