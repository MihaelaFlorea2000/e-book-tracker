describe('User Menu', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)
        cy.saveLocalStorage()
    })

    it('should link to profile', () => {
        // Open user menu
        cy.get('.css-uq4jyl').click()

        // Click on Profile
        cy.get(':nth-child(2) > a > .css-1e2fy0l').click()

        // Check profile page displays
        cy.url().should('include', '/profile')
        cy.get('h1').should('have.text', 'John Doe')
        cy.get('.css-uu5gi5').should('have.text', 'john_d@yahoo.com')

        cy.get('.css-1069bkt').children().should('have.length', 2)
    })

    it('should link to settings', () => {
        // Open user menu
        cy.get('.css-uq4jyl').click()

        // Click on Settings
        cy.get(':nth-child(3) > a > .css-1e2fy0l').click()

        // Check Settings page displays
        cy.url().should('include', '/settings')
        cy.get('h1').should('have.text', 'Settings')
    })

    it('should logout user', () => {
        // Open user menu
        cy.get('.css-uq4jyl').click()

        // Click on Logout
        cy.get(':nth-child(4) > a > .css-1e2fy0l').click()

        // Check Login page displays
        cy.get('h1').should('have.text', 'Login')
    })
})