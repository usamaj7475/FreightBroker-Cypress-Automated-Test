beforeEach(() => {
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/admin")
        cy.get('#basic_email').type("usama.javed@emerald-labs.com")
        cy.get('#basic_password').type("asdasdasd")
        cy.get('.ant-btn').click()

        cy.wait(5000)
  });


  describe( 'visit back office brokerages table', () => {


    it('visit back office brokerages table', ()=>{
        
        cy.get('[route="/brokerages"] > .ant-menu-title-content').click()
        cy.get('.text-xl').should('contain', 'brokerages');

    })

    it('visit back office brokerages table', ()=>{
        cy.get(':nth-child(2) > .ant-btn').click()
        //cy.get('.bg-themeOrange > .flex > :nth-child(1) > .text-white').should('contain', 'brokerages').click()
        cy.get('.ant-modal-content').should('be.visible');

    })



} ) 