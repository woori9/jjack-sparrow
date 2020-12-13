const Pet = require('../models/pet');

const PetService = {
  createPet: async (petData) => {
    const newPet = await Pet.create(petData);
    return newPet;
  },
};

module.exports = PetService;
