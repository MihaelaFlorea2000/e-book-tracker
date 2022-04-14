describe('Delete Book', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')

        // // Go to the first book's info page
        cy.get('.MuiGrid-container > :nth-child(1) > .css-qiwkdw > .css-1vcqj8z > .css-1y4257v > :nth-child(2)').click()

        // Click delete button
        cy.get('.css-txmkqw > :nth-child(3)').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display confirm dialog', () => {
        cy.get('#alert-dialog-title').should('have.text', 'Confirm Delete')

        cy.get('#alert-dialog-description').should('have.text', 'Are you sure you want to delete this book?')

        cy.get('.MuiDialogActions-root > :nth-child(1)').should('have.text', 'Yes')

        cy.get('.MuiDialogActions-root > :nth-child(2)').should('have.text', 'No')

    })

    it('should cancel delete', () => {
        // Click No
        cy.get('.MuiDialogActions-root > :nth-child(2)').click()

        // Check dialog closed
        cy.get('.MuiDialog-container').should('not.exist')
    })

    it('should confirm delete', () => {
        // Click Yes
        cy.get('.css-txmkqw > :nth-child(3)').click()
        cy.get('.MuiDialogActions-root > :nth-child(1)').click()

        // Click it deleted
        cy.wait(2000)
        cy.url().should('include', '?fromDelete')
        cy.get('.MuiGrid-container').children().should('have.length', 3)
        cy.get('.MuiAlert-message').should('have.text', 'Book successfully deleted')
    })
})