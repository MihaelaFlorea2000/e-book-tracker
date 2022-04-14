describe('Menu', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
    })

    it('should link to track page', () => {
        cy.get(':nth-child(2) > a > .css-fqxiwk').click()
        cy.url().should('include', '/track')
    })

    it('should link to badges page', () => {
        cy.get(':nth-child(3) > a > .css-fqxiwk').click()
        cy.url().should('include', '/badges')
    })

    it('should link to explore page', () => {
        cy.get(':nth-child(4) > a > .css-fqxiwk').click()
        cy.url().should('include', '/explore')
    })

    it('should link to friends page', () => {
        cy.get(':nth-child(5) > a > .css-fqxiwk').click()
        cy.url().should('include', '/friends')
    })

    it('should link to settings page', () => {
        cy.get(':nth-child(6) > a > .css-fqxiwk').click()
        cy.url().should('include', '/settings')
    })
})