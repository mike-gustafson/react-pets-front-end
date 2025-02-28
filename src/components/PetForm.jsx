const PetForm = ({ submit, selectedPet, update }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const petData = {
        name: e.target.name.value,
        type: e.target.type.value,
        breed: e.target.breed.value,
        formType: e.target.formType.value
      };
  
     if (selectedPet.id && update) {
        update(selectedPet.id, petData);
      } else {
        submit(petData);
      }
    };
  
    return (
      <div>
        <form className="PetForm-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={selectedPet.name || ''}
            required
          />
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            defaultValue={selectedPet.type || ''}
            required
          />
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            defaultValue={selectedPet.breed || ''}
            required
          />
          <input type="hidden" name="formType" value={selectedPet.name ? "edit" : "create" } />
          {selectedPet.name && (
            <>
            <button type="submit">Update</button>
            <button type="button" onClick={() => submit({})}>Cancel</button>
            </>
          )}
          {!selectedPet.name && <button type="submit">Add</button>}
        </form>
      </div>
    );
  };
  
  export default PetForm;
  