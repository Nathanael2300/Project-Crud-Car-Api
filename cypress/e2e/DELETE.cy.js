import 'cypress-mochawesome-reporter/register';

class SubjectApi {
  requestHTTP = ({ method, url, failOnStatusCode }) => {
    return cy.api({ method, url, failOnStatusCode });
  };
}


describe("Method DELETE", () => {
    it("Should delete a car off the list", () => {
        const api = new SubjectApi()
        const requestDELETE = api.requestHTTP({
            method: "DELETE",
            url: "/1"
        });
        return requestDELETE().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should('have.property', "mensagem", 'Lancer Evolution X deletado com sucesso!!!');
            cy.wrap(res.body.carroDeletado).then((car) => {
                expect(car).to.have.keys("id", "nome", "modelo", "marca", "ano", "preco");
                expect(car.id).to.be.a("number");
                expect(car.nome).to.be.a("string");
                expect(car.modelo).to.be.a("string");
                expect(car.marca).to.be.a("string");
                expect(car.ano).to.be.a("number");
                expect(car.preco).to.be.a("number");

                const requestGET = api.requestHTTP({
                    method: "GET",
                    url: "/1",
                    failOnStatusCode: false
                });
                return requestGET().then((res) => {
                    cy.wrap(res.status).should("eq", 404);
                    cy.wrap(res.body).should("have.property",  "mensagem", "carro não encontrado");
                });
            });
        });
    });
});
