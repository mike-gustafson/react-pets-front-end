const PetForm = ({submit}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPet = {
          name: e.target.name.value,
          type: e.target.type.value,
          breed: e.target.breed.value,
        };
        submit(newPet);
      };

    return (
      <div>
        <h2>Add a Pet</h2>
        <form onSubmit={handleSubmit} className="PetForm-form">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" required />
            <label htmlFor="type">Type:</label>
            <input type="text" name="type" id="type" required />
            <label htmlFor="breed">Breed:</label>
            <input type="text" name="breed" id="breed" required />
            <button type="submit">Add Pet</button>
        </form>
      </div>
    );
    }

export default PetForm;