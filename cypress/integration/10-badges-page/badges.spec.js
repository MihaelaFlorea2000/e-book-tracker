describe('Badges Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)
        // Go to Badges page
        cy.get(':nth-child(3) > a > .css-fqxiwk').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display badges page', () => {
        cy.get('h1').should('have.text', 'Badges')

        // Finish 10 books badge
        cy.get('.css-12w4zwb > :nth-child(1)').should('be.visible')
        cy.get(':nth-child(1) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Finish 10 books')

        // Add 10 highlights badge
        cy.get('.css-12w4zwb > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(2) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Add 10 highlights')

        // Read for 7 days in a row badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(3) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Read for 7 days in a row')

        // Finish 50 books badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(4) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Finish 50 books')

        // Add 50 highlights badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(5) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Add 50 highlights')

        // Read for 30 days in a row badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(6) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Read for 30 days in a row')

        // Finish 100 books badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(7) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Finish 100 books')

        // Add 100 highlights badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(8) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Add 100 highlights')

        // Read for 100 days in a row badge
        cy.get('.css-12w4zwb > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(9) > .css-pspwy9 > .css-cx3lbq').should('have.text', 'Read for 100 days in a row')

    })
})