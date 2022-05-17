describe('Search Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should search for a book', () => {

        // Search for a term
        cy.get('#search').should('be.visible')
        cy.get('#search').type('man')
        cy.get('#search').type('{enter}')

        // Check we got to search page
        cy.url().should('include', '/search')
        cy.get('#search').should('not.have.value', 'man')

        cy.get('h1').should('have.text', 'Search Results')

        // Results from library
        cy.get('.css-17lb5a2 > :nth-child(2) > .css-1e2fy0l').should('have.text', 'From Your Library')
        cy.get(':nth-child(2) > .MuiGrid-container').children().should('have.length.at.least', 1)

        // Other books
        cy.get('.css-17lb5a2 > :nth-child(3) > .css-1e2fy0l').should('have.text', 'Other Results')
        cy.get(':nth-child(3) > .MuiGrid-container').children().should('have.length', 5)

        // Get info on other book
        cy.get(':nth-child(3) > .MuiGrid-container > :nth-child(1) > .css-qiwkdw > .css-1vcqj8z > .css-1y4257v > a > .MuiButton-root').click()
        cy.url().should('include', '/book')
        cy.go('back')
        cy.url().should('include', '/search')

    })

    it('should search for a user', () => {

        // Search for a term
        cy.get('#search').should('be.visible')
        cy.get('#search').type('julian')
        cy.get('#search').type('{enter}')

        // Check we got to the search page
        cy.url().should('include', '/search')
        cy.get('#search').should('not.have.value', 'julian')

        cy.get('h1').should('have.text', 'Search Results')

        cy.get('.css-17lb5a2 > :nth-child(2) > .css-1e2fy0l').should('have.text', 'Users')

        cy.get(':nth-child(2) > .MuiGrid-container').children().should('have.length.at.least', 1)

        // Send friend request
        cy.get(':nth-child(2) > .MuiGrid-container > :nth-child(1)').click()

        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Add Friend')

        cy.get('.css-b7l21c > .MuiButton-root').click()

        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Unsend Request')


    })
})