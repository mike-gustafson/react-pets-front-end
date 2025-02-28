const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const fetchPets = async () => {
    const response = await fetch(BASE_URL);
    const pets = await response.json();
    console.log(pets);
    return pets;
    };

const fetchPet = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    const pet = await response.json();
    return pet;
    };

const createPet = async (pet) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
    });
    const newPet = await response.json();
    return newPet;
    };

const updatePet = async (id, pet) => {
    console.log(id, pet);
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
    });
    const updatedPet = await response.json();
    return updatedPet;
    };

const deletePet = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.ok;
    };

export { fetchPets, fetchPet, createPet, updatePet, deletePet };