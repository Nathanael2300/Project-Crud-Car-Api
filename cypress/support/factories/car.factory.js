import { faker } from "@faker-js/faker";

export const CarFactory = {
  createCar(overrides = {}) {
    return {
      nome: faker.vehicle.vehicle(),
      marca: faker.vehicle.manufacturer(),
      modelo: faker.vehicle.model(),
      ano: faker.number.int({ min: 1990, max: 2025 }),
      preco: faker.number.int({ min: 20000, max: 300000 }),
      ...overrides,
    };
  },
};
