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


before(() => {
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/signin")
    cy.get('#basic_email').type("usama.javed+tofubroker@emerald-labs.com")
    cy.get('#basic_password').type("asdasdasd")
    cy.get('.ant-btn').click()

    cy.wait(5000)
});


describe('visit web app explore page', () => {

    beforeEach(() => {
        //navigating to invite platform members screen
        cy.get('[route="/invite-external-member"] > .ant-menu-title-content').click()
    });

    it.only('search driver and view profile', () => {

        cy.fixture('Invitemembers').then((indata) => {

            indata.forEach((iedata) => {

                //creating a intercept obj to pass the aws email endpoint
                cy.intercept('POST', 'https://email.us-east-1.amazonaws.com/').as('inviteemail')

                //clicking on invite External members button
                cy.get(':nth-child(2) > .ant-btn')
                    .should('have.text', 'Invite External Member')
                    .click()

                //enter first name
                cy.get('#firstName').type(iedata.firstname)

                //enter last name
                cy.get('#lastName').type(iedata.lastname)

                //enter email
                cy.get('#email').type(iedata.email)

                //enter phone number
                cy.get('input[placeholder="(222) 222-2222"]').type(iedata.phonenumber)







                if (iedata.email == "usama.javed+validdata86@emerald-labs.com") {

                    //select role
                    cy.get('#role').click()

                    //select driver role from the dropdown
                    cy.get('.ant-select-item')
                        .contains('.ant-select-item', iedata.role).click()


                    //click sumbit button
                    cy.get('.ant-form-item-control-input-content > .ant-btn')
                        .should('have.text', 'Send Invite')
                        .click()


                    //assert the invite email has been dispatched
                    cy.wait('@inviteemail').its('response.statusCode').then((statuscode) => {
                        expect(statuscode).to.equal(200);
                    })

                    //assert the invite success toast message
                    cy.get('.ant-message-notice-content', { timeout: 1000000 })
                        .should('have.text', 'Invite sent successfully')
                        .should('be.visible')


                }

                else if (iedata.email == "usama.javed+invaliddata@emerald-labs.com") {

                    //select role
                    cy.get('#role').click()

                    //select driver role from the dropdown
                    cy.get('.ant-select-item')
                        .contains('.ant-select-item', iedata.role).click()


                    //click sumbit button
                    cy.get('.ant-form-item-control-input-content > .ant-btn')
                        .should('have.text', 'Send Invite')
                        .click()

                    //assert first name validation of numbers
                    cy.get('#firstName_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please enter a valid first name!')
                        .should('be.visible')

                    //assert last name validation of numbers
                    cy.get('#lastName_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please enter a valid last name!')
                        .should('be.visible')

                    //assert phone number validation message
                    cy.get('#phoneNumber_help > .ant-form-item-explain-error')
                        .should('have.text', 'The phone number must have 10 digits!')
                        .should('be.visible')


                    //assert the invite success toast message
                    cy.get('.ant-message-notice-content')
                        .should('not.exist')

                    cy.get('.ant-modal-close-x').click()
                }

                else {


                //click sumbit button
                cy.get('.ant-form-item-control-input-content > .ant-btn')
                .should('have.text', 'Send Invite')
                .click()

                    //assert first name validation of numbers
                    cy.get('#firstName_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please enter a valid first name!')
                        .should('be.visible')

                    //assert last name validation of numbers
                    cy.get('#lastName_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please enter a valid last name!')
                        .should('be.visible')

                    //assert phone number validation message
                    cy.get('#phoneNumber_help > .ant-form-item-explain-error')
                        .should('have.text', 'The phone number must have 10 digits!')
                        .should('be.visible')

                    //assert email validation message
                    cy.get('#email_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please enter a valid email!')
                        .should('be.visible')


                    //assert email validation message
                    cy.get('#role_help > .ant-form-item-explain-error')
                        .should('have.text', 'Please select some value!')
                        .should('be.visible')

                    //assert the invite success toast message
                    cy.get('.ant-message-notice-content')
                        .should('not.exist')

                }
            })
        })
    })

}) 