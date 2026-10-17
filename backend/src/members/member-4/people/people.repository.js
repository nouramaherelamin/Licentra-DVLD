const mockPeople = [
  {
    id: 'per-001',
    nationalId: '29876543210123',
    firstName: 'Ahmed',
    secondName: 'Mohamed',
    thirdName: 'Ali',
    lastName: 'Hassan',
    email: 'ahmed.m@example.com',
    phone: '+20 101 234 5678',
    gender: 'Male',
    dateOfBirth: '1995-04-12',
    nationality: 'Egyptian',
  },
  {
    id: 'per-002',
    nationalId: '29901121234567',
    firstName: 'Sara',
    secondName: 'Ali',
    thirdName: 'Ibrahim',
    lastName: 'Khaled',
    email: 'sara.ali@example.com',
    phone: '+20 102 345 6789',
    gender: 'Female',
    dateOfBirth: '1999-01-12',
    nationality: 'Egyptian',
  },
  {
    id: 'per-003',
    nationalId: '29876543219999',
    firstName: 'Noura',
    secondName: 'Mohamed',
    thirdName: 'Ahmed',
    lastName: 'Mahmoud',
    email: 'noura.m@gmail.com',
    phone: '+20 123 456 7890',
    gender: 'Female',
    dateOfBirth: '2000-01-12',
    nationality: 'Egyptian',
  },
];

export const peopleRepository = {
  findAll: async () => [...mockPeople],
  findById: async (id) => mockPeople.find((p) => p.id === id || p.nationalId === id) || null,
  create: async (personData) => {
    const newPerson = {
      id: `per-${Date.now()}`,
      ...personData,
    };
    mockPeople.push(newPerson);
    return newPerson;
  },
};
