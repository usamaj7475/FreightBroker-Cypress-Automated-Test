beforeEach(() => {
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/signin")
        cy.get('#basic_email').type("usama.javed+tofubroker@emerald-labs.com")
        cy.get('#basic_password').type("asdasdasd")
        cy.get('.ant-btn').click()

        cy.wait(5000)
  });


  describe( 'visit web app explore page', () => {

    beforeEach(() =>{
      cy.get('[route="/explore"]').click()
      cy.get('.text-xl').should('contain', 'explore');
    });

    it('Search a valid user on web app', ()=>{
        
        cy.get('#searchText').type("zeeshan")
        cy.get('#byRole').click()
        cy.get('[title="Driver"] > .ant-select-item-option-content').click()


        cy.get('.ant-form-item-control-input-content > .ant-btn').click()
        cy.get('.px-7').should('contain', 'Zeeshan')

    })

    it('Search return no result', ()=>{

        cy.get('#searchText').type("zeeshan ")
        cy.get('#byRole').click()
        cy.get('[title="Driver"] > .ant-select-item-option-content').click()
        cy.get('.ant-form-item-control-input-content > .ant-btn').click()
        cy.contains( 'No users found.')
    })

    
    it('Get all the driver', ()=>{
     
      cy.get('#byRole').click()
      cy.get('[title="Driver"] > .ant-select-item-option-content').click()
      cy.get('.ant-form-item-control-input-content > .ant-btn').click()
    })

    it.only('search driver and view profile', ()=>{

      cy.get('#searchText').type("zeeshan")
      cy.get('#byRole').click()
      cy.get('[title="Driver"] > .ant-select-item-option-content').click()


      cy.get('.ant-form-item-control-input-content > .ant-btn').click()
      cy.get('.px-7').should('contain', 'Zeeshan')
      cy.get('.mt-5 > .ant-btn').should('contain', 'View Profile').click()
  })

} ) 