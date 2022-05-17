describe('Book Reads', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')

        // Open the second book
        cy.get('.MuiGrid-container > :nth-child(1) > .css-qiwkdw > .css-1vcqj8z > .css-1y4257v > :nth-child(2)').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display add read form', () => {
        cy.get('.css-yett57').click()

        // URL and Page Title
        cy.url().should('include', '/read/add')
        cy.get('h1').should('have.text', 'Add Read')

        cy.checkReadForm()
    })

    it('should enter read information', () => {

        // Form fields
        cy.get('#startDate').type('2022-04-01')
        cy.get('#endDate').type('2022-04-13')

        // Add invalid session
        cy.addInvalidSession()

        // Add valid sessions
        cy.addValidSessions()

        // Rating and notes
        cy.get('[for="mui-19"]').click()
        cy.get('#notes').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        // Buttons
        cy.get('[type="submit"]').click()

        cy.url().should('include', '/book')
        cy.get('.css-1kycr2a').should('have.text', 'Read 1 times')
    })

    it('should display edit read form', () => {

        cy.get('.css-1mwn02k > :nth-child(1)').click()

        // URL and Page Title
        cy.url().should('include', '/edit')
        cy.get('h1').should('have.text', 'Edit Read')

        cy.checkReadForm()

        // Form fields
        cy.get('#startDate').should('have.value', '2022-04-01')
        cy.get('#endDate').should('have.value', '2022-04-13')

        // Notes
        cy.get('#notes').should('have.value', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    })

    it('should edit read information', () => {

        // Start and end date
        cy.get('#startDate').clear()
        cy.get('#startDate').type('2022-04-02')
        cy.get('#endDate').clear()
        cy.get('#endDate').type('2022-04-14')

        // Add invalid session
        cy.addInvalidSession()

        // Delete sessions
        cy.get(':nth-child(1) > .css-nt43tc > :nth-child(2)').click()
        cy.get(':nth-child(2) > .css-nt43tc > :nth-child(2)').click()
        cy.get(':nth-child(3) > .css-nt43tc > :nth-child(2)').click()
        // cy.get(':nth-child(4) > .css-nt43tc > :nth-child(2)').click()

        // Add valid sessions
        cy.addValidSessions()

        // Edit a session dialog
        cy.get(':nth-child(1) > .css-nt43tc > :nth-child(1)').click()
        cy.get('#mui-53').should('have.text', 'Edit Session')

        // Session date
        cy.get('.MuiDialogContent-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #date').should('have.value', '2022-04-02')
        cy.get('.MuiDialogContent-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #date').clear()
        cy.get('.MuiDialogContent-root > :nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #date').type('2022-04-03')

        // Session hours
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #hours').should('have.value', '1')
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #hours').clear()
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > #hours').type('2')

        // Session minutes
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > #minutes').should('have.value', '30')
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > #minutes').clear()
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > #minutes').type('20')

        // Save Session
        cy.get('.MuiDialogActions-root > :nth-child(1)').click()
        cy.get('.MuiDialog-container').should('not.exist')

        // Rating and notes
        cy.get('[for="mui-48"]').click()

        cy.get('#notes').clear()
        cy.get('#notes').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        // Submit
        cy.get('[type="submit"]').click()

        // Check update
        cy.url().should('include', '/book')
        cy.get('.css-cx3lbq').should('have.text', '2 April 2022 - 14 April 2022')
    })

    it('should delete read', () => {
        cy.get('.css-1mwn02k > :nth-child(2)').click()
        cy.get('.css-1kycr2a').should('have.text', 'Book not read yet')
    })
})