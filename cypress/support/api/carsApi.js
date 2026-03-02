class CarsApi {
  constructor() {
    this.baseUrl = Cypress.config("baseUrl");
  }

  getAll() {
    return cy.api("GET", `${this.baseUrl}/cars`);
  }

  getCarById(id, options = {}) {
    return cy.api({
      method: "GET",
      url: `/cars/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  createCar(data, options = {}) {
    return cy.api({
      method: "POST",
      url: "/cars",
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  updateCar(id, data, options = {}) {
    return cy.api({
      method: "PUT",
      url: `${this.baseUrl}/cars/${id}`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  deleteCar(id) {
    return cy.api({
      method: "DELETE",
      url: `${this.baseUrl}/cars/${id}`,
    });
  }
}

module.exports = CarsApi;
