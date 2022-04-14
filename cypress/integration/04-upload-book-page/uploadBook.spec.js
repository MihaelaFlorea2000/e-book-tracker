describe('Upload Book', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.get('.css-1yh2ol4').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display upload step 1 page', () => {

        // Title
        cy.get('h1').should('have.text', 'Upload Book')
        cy.get('.css-6y5c9t').should('have.text', 'Choose a digital book (.EPub format) to upload')

        // Buttons
        cy.get('.css-16wnldy > .MuiButton-root').should('have.text', 'Upload file')
        cy.get('.css-1hppjzv > .MuiButton-root').should('have.text', 'Continue')
    })

    it('should choose an invalid file', () => {
        // Input file
        cy.fixture('newCover.jpg').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent: fileContent.toString(),
                fileName: 'newCover.jpg',
                mimeType: 'image/jpeg'
            });
        });

        // Click Continue
        cy.get('.css-1hppjzv > .MuiButton-root').click()

        // Check error
        cy.get('.css-1e2fy0l > .MuiPaper-root').should('be.visible')
        cy.get('.css-1e2fy0l > .MuiPaper-root').should('have.text', 'File must be epub format')
    })

    it('should choose a valid file', () => {
        // Chose file
        cy.fixture('sherlock_holmes.epub', 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent,
                filePath: '../fixtures/sherlock_holmes.epub',
                fileName: 'sherlock_holmes.epub',
                mimeType: 'application/epub+zip'
            });
        });

        // Click continue
        cy.get('.css-1hppjzv > .MuiButton-root').click()

        // Check it moved to step 2
        cy.url().should('include', '/upload/2')
        cy.get('.css-5s9ypz > .MuiPaper-root').should('be.visible')
    })

    it('should display step 2', () => {
        // Cover and rating
        cy.get('.css-8g4rsd').should('be.visible')
        cy.get('.css-t66pi6').should('be.visible')

        // Form fields
        cy.get('#title').should('be.visible')
        cy.get('#authors').should('be.visible')
        cy.get('#series').should('be.visible')
        cy.get('#description').should('be.visible')
        cy.get('#publisher').should('be.visible')
        cy.get('#pubDate').should('be.visible')
        cy.get('#language').should('be.visible')
        cy.get('#tags').should('be.visible')

        // Buttons
        cy.get('[type="submit"]').should('be.visible')
        cy.get('.css-to16qx > [type="button"]').should('be.visible')

    })

    it('should edit book metadata', () => {
        // Pick new cover
        cy.fixture('newCover.jpg').then(fileContent => {
                cy.get('input[type="file"]').attachFile({
                    fileContent,
                    filePath: '../fixtures/newCover.jpg',
                    fileName: 'newCover.jpg',
                    mimeType: 'image/jpeg'
                });
            });

        // Set rating
        cy.get('[for="mui-10"]').click()
        cy.get('.css-ov0u0p').click()
        cy.get('[for="mui-12"]').click()

        // Set title
        cy.get('#title').clear()
        cy.get('#title').type('Sherlock Holmes')

        // Set authors
        cy.get('#authors').type('{backspace}')
        cy.get('#authors').type('Aurthur Conan Doyle')
        cy.get('#authors').type('{enter}')

        // Set series
        cy.get('#series').type('The Adventures of Sherlock Holmes')

        // Set description
        cy.get('#description').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        // Set publsher
        cy.get('#publisher').type('Libra')

        // Set publication date
        cy.get('#pubDate').clear()
        cy.get('#pubDate').type('1999-03-01')

        // Set language
        cy.get('#language').clear()
        cy.get('#language').type('en')

        // Set tags
        cy.get('#tags').type('Crimme')
        cy.get('#tags').type('{enter}')
        cy.get('#tags').type('{backspace}')
        cy.get('#tags').type('Crime')
        cy.get('#tags').type('{enter}')

        // Buttons
        cy.get('[type="submit"]').click()

        // Check book updated
        cy.wait(2000)
        cy.url().should('include', '?fromUpload')
        cy.get('.MuiGrid-container').children().should('have.length', 4)
        cy.get('.MuiAlert-message').should('have.text', 'Successful upload')
    })
})