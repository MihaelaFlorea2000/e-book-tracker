describe('Library Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
    })

    it('should display library page', () => {
        // Title and books
        cy.get('h1').should('have.text', 'Library')
        cy.get('.MuiGrid-container').children().should('have.length', 3)

        // Menu
        cy.get('.css-1luc7vq').should('be.visible')
        cy.get('.css-qejm3e').children().should('have.length', 6)

        // Header
        cy.get('#search').should('be.visible')
        cy.get('.css-mxjnqt').should('be.visible')
        cy.get('.css-uq4jyl').should('be.visible')

        // Buttons
        cy.get('.css-1mk42xx').should('be.visible')
        cy.get('.css-1yh2ol4').should('be.visible')
    })

    it('should sort books', () => {
        // Click sort button
        cy.get('.css-1mk42xx').click()
    })

    it('should link to upload', () => {
        // Click add button
        cy.get('.css-1yh2ol4').click()
        cy.get('h1').should('have.text', 'Upload Book')
    })

    it('should open user menu', () => {
        // Click on profile image
        cy.get('.css-uq4jyl').click()
        cy.get('.MuiList-root').should('be.visible')
    })
})