describe('Edit Book Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')

        // Go to the first book's info page
        cy.get('.MuiGrid-container > :nth-child(1) > .css-qiwkdw > .css-1vcqj8z > .css-1y4257v > :nth-child(2)').click()

        // Click on Edit button
        cy.get('.css-txmkqw > :nth-child(1)').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display edit form', () => {

        // Title
        cy.get('h1').should('have.text', 'Edit Book')

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
        cy.get('.css-ov0u0p').click()
        cy.get('[for="mui-19"]').click()

        // Set title
        cy.get('#title').clear()
        cy.get('#title').type('Adventures of Sherlock Holmes')

        // Set authors
        cy.get('#authors').type('{backspace}')
        cy.get('#authors').type('Aurthur Conan Doyle')
        cy.get('#authors').type('{enter}')

        // Set series
        cy.get('#series').clear()
        cy.get('#series').type('Sherlock Holmes')

        // Set description
        cy.get('#description').clear()
        cy.get('#description').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        // Set publsher
        cy.get('#publisher').clear()
        cy.get('#publisher').type('Libra')

        // Set publication date
        cy.get('#pubDate').clear()
        cy.get('#pubDate').type('1999-03-01')

        // Set language
        cy.get('#language').clear()
        cy.get('#language').type('en')

        // Set tags
        cy.get('#tags').type('{backspace}')
        cy.get('#tags').type('Crime')
        cy.get('#tags').type('{enter}')

        // Buttons
        cy.get('[type="submit"]').click()

        // Check book updated
        cy.wait(2000)
        cy.url().should('include', '?fromEdit')
        cy.get('.MuiAlert-message').should('have.text', 'Book successfully updated')
    })
})