class SubjectApi {
  requestHTTP = ({ method, url }) => {
      return () => {
          return cy.api({ method, url });
      }
  }
}


describe("Method GET", () => {
    it("Should get all cars off the list", () => {
      const api = new SubjectApi()
      const requestGET = api.requestHTTP({
        method: "GET",
        url: "/"
      });
      return requestGET().then((res) => {
        res.body.forEach((car) => {
          cy.wrap(res.status).should("eq", 200);
          cy.wrap(car.id).should("be.a", "number");
          cy.wrap(car.nome).should("be.a", "string");
          cy.wrap(car.modelo).should("be.a", "string");
          cy.wrap(car.marca).should("be.a", "string");
          cy.wrap(car.ano).should("be.a", "number");
          cy.wrap(car.preco).should("be.a", "number");
        });
      });
    });  

    it("Should get a car of the list", () => {
      const api = new SubjectApi()
      const requestGET = api.requestHTTP({
        method: "GET",
        url: "/1"
      });
      return requestGET().then((res) => {
          for(let i = 0; i < res.body.length; i++) {
          cy.wrap(res.status).should("eq", 200);
          cy.wrap(res.body[i].id).should("be.a", "number");
          cy.wrap(res.body[i].nome).should("be.a", "string");
          cy.wrap(res.body[i].modelo).should("be.a", "string");
          cy.wrap(res.body[i].marca).should("be.a", "string");
          cy.wrap(res.body[i].ano).should("be.a", "number");
          cy.wrap(res.body[i].preco).should("be.a", "number");
          }
      });
    });
});