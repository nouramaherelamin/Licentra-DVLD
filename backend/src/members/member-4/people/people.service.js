import { peopleRepository } from './people.repository.js';

export const peopleService = {
  getAllPeople: async () => await peopleRepository.findAll(),
  getPersonById: async (id) => {
    const person = await peopleRepository.findById(id);
    if (!person) {
      const err = new Error(`Person with identifier '${id}' not found`);
      err.statusCode = 404;
      err.code = 'PERSON_NOT_FOUND';
      throw err;
    }
    return person;
  },
  createPerson: async (payload) => {
    if (!payload.nationalId || !payload.firstName || !payload.lastName) {
      const err = new Error('National ID, first name, and last name are required.');
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      throw err;
    }
    const existing = await peopleRepository.findById(payload.nationalId);
    if (existing) {
      const err = new Error(`A person with National ID '${payload.nationalId}' already exists.`);
      err.statusCode = 409;
      err.code = 'DUPLICATE_NATIONAL_ID';
      throw err;
    }
    return await peopleRepository.create(payload);
  },
};
