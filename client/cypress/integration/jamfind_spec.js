describe("JamFind", () => {
  context("create account", () => {
    before(() => {
      cy.visit("http://localhost:3000");
    });

    it("can open create account page", () => {
      cy.contains("Create Account").click();
      cy.contains("Create A New Account");
    });

    it("user can create an account, login, and delete account", () => {
      cy.contains("Create Account").click();
      cy.get('[name="username"]').type("deleteme123");
      cy.get('[name="email"]').type("deleteme123@test.com");
      cy.get('[name="password"]').type("123456");
      cy.get('[name="password2"]').type("123456");
      cy.get('[type="submit"]').click();
      cy.wait(1000);
      cy.contains("Login");
      cy.get('[name="email"]')
        .clear()
        .type("deleteme123@test.com");
      cy.get('[name="password"]')
        .clear()
        .type("123456");
      cy.get('[type="submit"]').click();
      cy.wait(3000);
      cy.contains("Welcome deleteme123");
      cy.contains("Delete Account").click();
      cy.wait(1000);
      cy.contains("Login");
    });
  });

  context("login", () => {
    before(() => {
      cy.visit("http://localhost:3000");
    });

    it("can open front page", () => {
      cy.contains("JamFind");
    });

    it("login page can be visited", () => {
      cy.contains("Login").click();
      cy.contains("E-mail");
    });

    it("user can login", () => {
      cy.contains("Login").click();
      cy.get('[name="email"]')
        .clear()
        .type("test@test.com");
      cy.get('[name="password"]')
        .clear()
        .type("123456");
      cy.get('[type="submit"]').click();
      cy.wait(3000);
      cy.contains("Welcome test123");
    });

    it("user can logout", () => {
      cy.contains("Logout").click();
      cy.contains("Login");
    });
  });
});

context("adding profile items", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
    cy.wait(1000);
    cy.get('[name="email"]')
      .clear()
      .type("test@test.com");
    cy.get('[name="password"]')
      .clear()
      .type("123456");
    cy.get('[type="submit"]').click();
    cy.contains("Welcome test123");
  });

  it("user can add and delete experience", () => {
    cy.contains("Add Experience").click();
    cy.wait(1000);
    cy.get('[name="typeofexperience"]').type("band");
    cy.get('[name="role"]').type("guitar");
    cy.get('[name="from"]').type("1999-01-01");
    cy.get("#current").click();
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Welcome test123");
    cy.contains("Type");
    cy.get(".btn.btn-custom-danger").click();
    cy.wait(1000);
    cy.contains("No experience listed");
  });

  it("user can add and delete education", () => {
    cy.contains("Add Education").click();
    cy.wait(1000);
    cy.get('[name="school"]').type("berklee");
    cy.get('[name="degree"]').type("music");
    cy.get('[name="program"]').type("music");
    cy.get('[name="from"]').type("1999-01-01");
    cy.get("#current").click();
    cy.get('[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Welcome test123");
    cy.contains("School");
    cy.get(".btn.btn-custom-danger").click();
    cy.wait(1000);
    cy.contains("No education listed");
  });
});
