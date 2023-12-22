import {Login} from '../pages/login'

beforeEach(() => {
  cy.on('uncaught:exception', (err) => {
    // Check if the error message or stack trace includes the specific error you want to ignore
    if (err.message.includes('Incorrect') || err.message.includes('User') || err.stack.includes('SpecificError')) {
      // Log the error to the Cypress Command Log without failing the test
      Cypress.log({
        name: 'Error',
        message: err.message,
        consoleProps: () => ({
          Error: err,
        }),
      });

      // Return false to prevent the error from failing the test
      return false;
    }
  });
});


const log = new Login();


describe('Login to Freight Broker back office', () => {


  it.only('Login to back office with multiple user', () => {


    cy.fixture('Usersdata').then((data) => {

      data.forEach((userData, index) => {



        log.navigator("https://staging.d2m5lpbf9n6q29.amplifyapp.com/admin")

        log.enterEmail(userData.username)
        log.enterPwd(userData.password)


        log.loginBtnClick()



        if (userData.username == "usama.javed@emerald-labs.com" && userData.password == "asdasdasd") {

          cy.get('.text-xl').should('have.text', userData.expected)
          cy.get('span[aria-label="logout"] ')
            .click()
        }

        else if (userData.username == "usama.javed@emerald-labs.com" && userData.password == "dasdasdda") {
          cy.get('.ant-alert')
            .should('have.text', userData.expected)
        }

        else {
          cy.get('.ant-alert').should('have.text', userData.expected)
        }


        if (index < data.length - 1) {
          cy.wait(2000);
        }
      })
    });
  })
})