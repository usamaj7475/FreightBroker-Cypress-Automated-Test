beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      // Check if the error message or stack trace includes the specific error you want to ignore
      if (err.message.includes('Cannot read properties of undefined') || err.stack.includes('SpecificError')) {
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

describe( 'visit back office', () => {


  beforeEach(() => {
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/admin")
        cy.get('#basic_email').type("usama.javed@emerald-labs.com")
        cy.get('#basic_password').type("dsadsadsa")
        cy.get('.ant-btn').click()

        cy.wait(2000)
  });


  it('visit back office brokerages table', ()=>{
        
    //cy.get('[route="/team-management"] > .ant-menu-title-content').click()

    cy.wait(5000)

    cy.get('.text-xl').should('have.text','team management')

  })


    it('Invite form back office', ()=>{
        
        cy.contains('Invite Team Member').click()
 
        cy.get('#firstName').type("automation")
        cy.get('#lastName').type("testing")
        cy.get('#email').type("usama.javed+91auto3@emerald-labs.com")
        cy.get('#phoneNumber').type("7894561230")

        cy.get('#role').click()
        cy.get('[title="Admin"] > .ant-select-item-option-content').click()


        cy.get('.ant-form-item-control-input-content > .ant-btn').click()

        cy.contains('invited successfully').should('be.visible')

    })


    it('Visit Active Users of Team Management', ()=>{
        
      cy.wait(2000)

      //Click on Active status to view all user in Active status
      cy.get('.ant-btn').contains('Active').click()

    })

    it('Visit Invited Users of Team Management', ()=>{
        
    cy.wait(2000)

    //Click on Active status to view all user in Active status
    cy.get('.ant-btn').contains('Invited').click()

    })


    it.only('Visit Suspended Users of Team Management', ()=>{
        
      cy.wait(2000)

      //Click on Active status to view all user in Active status
      cy.get('.ant-btn').contains('Suspended').click()

    })

})
