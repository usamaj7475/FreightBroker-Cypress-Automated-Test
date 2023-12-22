beforeEach(() => {
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/admin")
        cy.get('#basic_email').type("usama.javed@emerald-labs.com")
        cy.get('#basic_password').type("asdasdasd")
        cy.get('.ant-btn').click()

        cy.wait(5000)
  });


describe( 'visit back office brokerages table', () => {


    it('view profile of back office user', ()=>{
        
        cy.get('.ant-space-item').click()
        cy.get('.ant-dropdown-menu-item').contains('View Profile').click()

        //cy.get('#firstName').should('have.text' , 'qweasdzxcrtyfghvbnvuiopjklmqweasdzxcrtvbnvuiop')

        cy.get('.text-xl').should('have.text','view profile')

        cy.get('.text-xl').should('contain','profile')

    })


    it.only('Edit profile of back office user', ()=>{
        
        cy.get('.ant-space-item').click()
        cy.get('.ant-dropdown-menu-item').contains('View Profile').click()


        //Verifying whether its the profile of the user whose profile we wanted to view on the bases of first name
        cy.get('#firstName').should('have.value' , 'USAMA')


        //Verifying whether its the profile of the user whose profile we wanted to view on the bases of EMAIL
        cy.get('#email').should('have.value' , 'usama.javed@emerald-labs.com')

        cy.get('.ant-btn').contains('Edit Profile').click()


        //Verify that email is disabled
        cy.get('#email').should('be.disabled')


         //Uploading File Method-2 using fixtures & selectFile function
         cy.fixture('image1.jpg', { encoding: null })
         .as('uploadPic')
         .get('input[type=file]')
         .selectFile('@uploadPic',{force: true})


         cy.get('.ant-message-custom-content')
         .should('be.visible')
         .should('contain', 'successfully')

    })
})