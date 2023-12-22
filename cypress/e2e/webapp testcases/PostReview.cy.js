beforeEach(() => {
  cy.on('uncaught:exception', (err) => {
    // Check if the error message or stack trace includes the specific error you want to ignore
    if (err.message.includes('Cannot read properties of null') || err.stack.includes('SpecificError')) {
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


beforeEach(() => {
  cy.fixture('Postreviewdata').as('reviewData')
});

describe('Post Review to driver', () => {


  beforeEach(() => {

    //navigating to website sigin page and performing login
    cy.visit("https://staging.d2m5lpbf9n6q29.amplifyapp.com/signin")
    cy.get('#basic_email').type("usama.javed+tofubroker@emerald-labs.com")
    cy.get('#basic_password').type("asdasdasd")
    cy.get('.ant-btn').click()


    //navigating to explore page
    cy.wait(5000)
    cy.get('[route="/explore"]').click()
    cy.get('.text-xl').should('contain', 'explore');

    //searching the user zeeshan by entering the 
    cy.get('#searchText').type("zeeshan")
    cy.get('#byRole').click()
    cy.get('[title="Driver"] > .ant-select-item-option-content').click()

    //finding the user profile card and clicking the view profile button
    cy.get('.ant-form-item-control-input-content > .ant-btn').click()
    cy.get('.px-7').should('contain', 'Zeeshan')
    cy.get('.mt-5 > .ant-btn').should('contain', 'View Profile').click()



    cy.wait(2000)
    //cy.get('.text-xl').should('contain', 'Driver')


    //clicking on the post review button
    cy.get('.items-start > .ant-btn-round').should('contain', 'Review').click()


  });



  it('post review to a driver from explore page', () => {



    cy.get('@reviewData').then((data) => {



      //intercepting the email sending to check whether the email to reviewee has been dispatched or not 
      cy.intercept('POST', 'https://email.us-east-1.amazonaws.com/').as('emailstatus')

      //3 stars for equipment as described
      cy.get('ul.ant-rate').eq(0).find('li').eq(2).click();

      // 2 stars for punctuality
      cy.get('ul.ant-rate').eq(1).find('li').eq(1).click();

      //3 stars for reliability
      cy.get('ul.ant-rate').eq(2).find('li').eq(2).click();

      // 2 stars for Communication
      cy.get('ul.ant-rate').eq(3).find('li').eq(1).click();

      //3 stars for Response time
      cy.get('ul.ant-rate').eq(4).find('li').eq(2).click();

      // 2 stars for likelihood of working again
      cy.get('ul.ant-rate').eq(5).find('li').eq(1).click();

      // adding the review text
      cy.get('#aboutYou').type(data.aboutyou)

      /* 
     //This code gets the image from the json file 
       const imageData = reviewData.proofofwork;
       const fileName = 'image.jpg';
       const mimeType = 'image/jpg';
      
       cy.get('input[type="file"]').eq(1).then((input) => {
         const testFile = new File([imageData], fileName, { type: mimeType });
         const dataTransfer = new DataTransfer();
     
         dataTransfer.items.add(testFile);
         input[0].files = dataTransfer.files;
     
         cy.wrap(input).trigger('change', { force: true });
       });
     */

      //adding proof of work
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/image1.jpg', { force: true })

      //adding attachment
      cy.get('input[type=file]').eq(1).selectFile('cypress/fixtures/image1.jpg', { force: true })

      //clicking submit or post review button
      cy.get('.ant-form-item-control-input-content > .ant-btn').click()

      //asserting whether the review has been posted or not with API call
      cy.wait(['@emailstatus'], { timeout: 10000 }).its('response.statusCode').then((statusCode) => {
        expect(statusCode).to.equal(200);
      });


      //cy.get('.ant-message-custom-content > :nth-child(2)').should('be.visible')


      // navigating to All reviews page
      cy.get('[route="/all-reviews"]').click()

      //cy.get('.text-xl').should('contain', 'All Reviews');



      //Asserting the review on the based of text from All reviews page
      cy.get('.px-7').eq(0).should('contain', reviewdata.aboutyou)


    })

  })


  it('asserting the toast for proof of work', () => {


    cy.get('@reviewData').then((data) => {



      //3 stars for equipment as described
      cy.get('ul.ant-rate').eq(0).find('li').eq(2).click();

      // 2 stars for punctuality
      cy.get('ul.ant-rate').eq(1).find('li').eq(1).click();

      //3 stars for reliability
      cy.get('ul.ant-rate').eq(2).find('li').eq(2).click();

      // 2 stars for Communication
      cy.get('ul.ant-rate').eq(3).find('li').eq(1).click();

      //3 stars for Response time
      cy.get('ul.ant-rate').eq(4).find('li').eq(2).click();

      // 2 stars for likelihood of working again
      cy.get('ul.ant-rate').eq(5).find('li').eq(1).click();

      // adding the review text
      cy.get('#aboutYou').type(data.aboutyou)


      //clicking submit or post review button
      cy.get('.ant-form-item-control-input-content > .ant-btn').click()

      //asserting the alert that proof of work is required
      cy.get('.ant-message-notice-content')
        .should('be.visible')
        .should('have.text', 'Please upload at least 1 image in proof of work')
    })

  })

  it('asserting the limit of attachment, user cant add more than 3 attachments', () => {


    cy.get('@reviewData').then((data) => {



      //3 stars for equipment as described
      cy.get('ul.ant-rate').eq(0).find('li').eq(2).click();

      // 2 stars for punctuality
      cy.get('ul.ant-rate').eq(1).find('li').eq(1).click();

      //3 stars for reliability
      cy.get('ul.ant-rate').eq(2).find('li').eq(2).click();

      // 2 stars for Communication
      cy.get('ul.ant-rate').eq(3).find('li').eq(1).click();

      //3 stars for Response time
      cy.get('ul.ant-rate').eq(4).find('li').eq(2).click();

      // 2 stars for likelihood of working again
      cy.get('ul.ant-rate').eq(5).find('li').eq(1).click();

      // adding the review text
      cy.get('#aboutYou').type(data.aboutyou)


      //adding proof of work
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/image1.jpg', { force: true })
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/image1.jpg', { force: true })
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/image1.jpg', { force: true })
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/image1.jpg', { force: true })

      //asserting the alert that proof of work is required
      cy.get('.ant-message-notice-content')
        .should('be.visible')
        .should('have.text', 'You can not upload more than three images')
    })

  })

  it('asserting the format of the file toast message', () => {


    cy.get('@reviewData').then((data) => {



      //3 stars for equipment as described
      cy.get('ul.ant-rate').eq(0).find('li').eq(2).click();

      // 2 stars for punctuality
      cy.get('ul.ant-rate').eq(1).find('li').eq(1).click();

      //3 stars for reliability
      cy.get('ul.ant-rate').eq(2).find('li').eq(2).click();

      // 2 stars for Communication
      cy.get('ul.ant-rate').eq(3).find('li').eq(1).click();

      //3 stars for Response time
      cy.get('ul.ant-rate').eq(4).find('li').eq(2).click();

      // 2 stars for likelihood of working again
      cy.get('ul.ant-rate').eq(5).find('li').eq(1).click();

      // adding the review text
      cy.get('#aboutYou').type(data.aboutyou)


      //adding csv file in proof of work
      cy.get('input[type=file]').eq(0).selectFile('cypress/fixtures/demo.csv', { force: true })

      //asserting the alert that proof of work is required
      cy.get('.ant-message-notice-content')
        .should('be.visible')
        .should('have.text', 'The uploaded file format should be jpg, png, jpeg, or pdf!')
    })

  })


});