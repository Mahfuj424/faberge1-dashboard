// src/constants/service.js

export const allServices = [
  {
    id: 1,
    name: "Manicure",
    price: 25,
    subServices: [
      { id: 101, name: "Gel", price: 10, water: 5 },
      { id: 102, name: "Water", price: 7, water: 3 },
    ],
  },
  {
    id: 2,
    name: "Pedicure",
    price: 30,
    subServices: [
      { id: 201, name: "Gel", price: 12, water: 6 },
      { id: 202, name: "Water", price: 8, water: 3 },
    ],
  },
  {
    id: 3,
    name: "Barbar",
    price: 20,
    subServices: [],
  },
  {
    id: 4,
    name: "Facial",
    price: 40,
    subServices: [],
  },
];
