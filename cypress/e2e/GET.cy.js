describe("", () => {
  it("", () => {
    cy.api({
      url: "http://localhost:3003/cars",
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
