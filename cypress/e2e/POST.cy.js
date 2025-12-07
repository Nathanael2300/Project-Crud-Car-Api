const { faker } = require('@faker-js/faker');
import 'cypress-mochawesome-reporter/register';

class SubjectApi {
    requestHTTP = ({ method, url, body }) => {
        return () => {
            return cy.api({ method, url, body });
        }
    }
}

describe("Method POST", () => {
    it("Should register a car on the list", () => {
        const api = new SubjectApi();
        const newCar = {
            nome: faker.vehicle.vehicle(),
            modelo: faker.vehicle.model(),
            marca: faker.vehicle.manufacturer(),
            ano: faker.number.int({ min: 2005, max: 2025 }),
            preco: faker.number.int({ min: 100000, max: 300000 })
        }
        const requestPOST = api.requestHTTP({
            method: "POST",
            url: "/",
            body: newCar
        });
        return requestPOST().then((res) => {
            cy.wrap(res.status).should("eq", 200);
            cy.wrap(res.body).should('have.property', 'mensagem', 'Carro adicionado com sucesso!!!');
            cy.wrap(res.body.carro).should("deep.equal", {
                nome: newCar.nome,
                modelo: newCar.modelo,
                marca: newCar.marca,
                ano: newCar.ano,
                preco: newCar.preco
            });
        });
    });
});