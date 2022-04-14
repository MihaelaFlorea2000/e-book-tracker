describe('Track Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)
        // Go to Track page
        cy.get(':nth-child(2) > a > .css-fqxiwk').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display track page', () => {
        cy.get('h1').should('have.text', 'Track')

        // Progress Bar
        cy.get('.css-hvmy1i').should('be.visible')
        cy.get('.css-hvmy1i > canvas').should('be.visible')

        // Goals
        cy.get('.css-1hd6o66 > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(1) > .css-19i0pug > canvas').should('be.visible')
        cy.get(':nth-child(2) > .css-19i0pug > canvas').should('be.visible')
        cy.get(':nth-child(3) > .css-19i0pug > canvas').should('be.visible')
        cy.get('.MuiButton-root').should('be.visible')

        // Numbers
        cy.get('.css-1wl8vzn').should('be.visible')

        // Calendar
        cy.get('.css-f340w5').should('be.visible')

        // Tag Charts
        cy.get('.css-1hd6o66 > :nth-child(5)').should('be.visible')
        cy.get('[value="book"]').click()

        // Line Charts
        cy.get('.css-80hunv').should('be.visible')
        cy.get('[value="month"]').click()
        cy.get('[value="year"]').click()
        cy.get('[value="total"]').click()

    })

    it('should display goals dialog', () => {
        // Click Edit Goals
        cy.get('.MuiButton-root').click()

        // Check dialog opens
        cy.url().should('include', '/track/goals')
        cy.get('#mui-2').should('have.text', 'Set Goals')

        // Check fields show up
        cy.get('#yearly').should('be.visible')
        cy.get('#monthly').should('be.visible')
        cy.get('#dailyHours').should('be.visible')
        cy.get('#dailyMinutes').should('be.visible')

        // Check buttons show up
        cy.get('[type="submit"]').should('be.visible')
        cy.get('.MuiDialogActions-root > [type="button"]').should('be.visible')
    })

    it('should edit goals', () => {

        // Edit goals
        cy.get('#yearly').clear()
        cy.get('#yearly').type('30')

        cy.get('#monthly').clear()
        cy.get('#monthly').type('4')

        cy.get('#dailyHours').clear()
        cy.get('#dailyHours').type('1')

        cy.get('#dailyMinutes').clear()
        cy.get('#dailyMinutes').type('30')

        // Click submit
        cy.get('[type="submit"]').click()
        cy.get('#mui-2').should('not.exist')

        // Check if they were updated correctly
        cy.get(':nth-child(1) > .css-9hibp9').contains('/30 books')
        cy.get(':nth-child(2) > .css-9hibp9').contains('/4 books')
        cy.get(':nth-child(3) > .css-9hibp9').contains('/1h 30min')
    })

})