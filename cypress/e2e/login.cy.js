describe("confirm insert email input, next, checkbox exist", () => {
  it("check if elements appear", () => {
    cy.openExtension();
    cy.get('[data-test="email-login-input"]').should("exist");
    cy.get('[data-test="email-login-submit-button"]').should("exist");
    cy.get(".checkbox-input").should("exist");
  });
});

describe("mark the checkbox", () => {
  it("check if checkbox is unmarked and marked", () => {
    cy.openExtension();
    cy.get(".checkbox-input").should("be.checked"); //default is marked
    cy.get(".checkbox-input").click({ force: true }).should("not.be.checked");
    cy.get(".checkbox-input").click({ force: true }).should("be.checked");
  });
});

// how to check pressing enter - https://dev.to/walmyrlimaesilv/how-to-type-and-press-enter-with-cypress-2fl3
describe("email insertion", () => {
  beforeEach(() => {
    cy.openExtension();
    cy.intercept("POST", "https://stgchrome.paradox.ai/api/v1/auth/lookup").as(
      "lookup"
    );
  });

  it("insert an invalid email and press enter", () => {
    cy.get('[data-test="email-login-input"]')
      .type("invalid")
      .type("Cypress.io{enter}");

    cy.wait("@lookup");
    cy.get("@lookup").then((interception) => {
      expect(interception.response.statusCode).to.equal(404);
      expect(interception.response.body).to.have.property("errors");
      // check if popup message appear
    });
  });

  it("insert a valid email and press next", () => {
    cy.get('[data-test="email-login-input"]').type(
      "rnd.extension+noashpack@paradox.ai"
    );
    cy.get('[data-test="email-login-submit-button"]').click();
    cy.wait("@lookup");
    cy.get("@lookup").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});

describe("confirm elements exist after user enters valid email", () => {
  it("check elemnts exist", () => {
    cy.enterMailSuccesfully();
    cy.get('[data-test="password-input"]').should("exist");
    cy.get('[data-test="signin-button"]').should("exist");
    cy.get('[data-test="submit-password-cancel"]').should("exist");
    cy.get('input[type="checkbox"]').should("exist");
    cy.get('a[data-test="forgot-password"]').should("exist");
  });
});

describe("redirect to previous view and the email address stil appears in the input field", () => {
  beforeEach(() => {
    cy.enterMailSuccesfully();
  });
  it("click cancel and redirect", () => {
    cy.get('[data-test="submit-password-cancel"]').click();
    cy.get("div.login_page.flex-column.flex-1.flex-gap")
      .should("exist")
      .find('input[data-test="email-login-input"]')
      .should("have.value", "rnd.extension+noashpack@paradox.ai");
  });
  it("click back arrow and redirect", () => {
    cy.get('[data-test="login-header-back-button"]').click();
    cy.get("div.login_page.flex-column.flex-1.flex-gap")
      .should("exist")
      .find('input[data-test="email-login-input"]')
      .should("have.value", "rnd.extension+noashpack@paradox.ai");
  });
});

//describe("check forgot password button", () => {
//  it("redirect to forgot-password page", () => {
//    cy.enterMailSuccesfully();
//    cy.get('a[data-test="forgot-password"]').click();
//    cy.url().should("eq", "https://stg.paradox.ai/forgot-password");
//  });
//});
