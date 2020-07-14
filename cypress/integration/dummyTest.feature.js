describe("show hello world", () => {
  before(() => {
    cy.visit("/");
  });
  it("show hello world", () => {
    cy.get("div").should("contain", "Hello Worlds");
  });
});