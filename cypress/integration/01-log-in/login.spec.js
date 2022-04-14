describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should display login page', () => {
        // Title and subtitle
        cy.get('h1').should('have.text', 'Login')
        cy.get('.css-1ukcoy2').should('have.text',
            'Enter your information below')

        // Form inputs
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')

        // Submit Button
        cy.get('.MuiButton-root').should('have.text', 'Submit')
    })

    it('should log in correctly', () => {
        cy.login('john_d@yahoo.com', '12345678')
    })

    it('should show the invalid credentials error', () => {
        // Fill in incorrect details
        cy.get('input#email').type('john_d@yahoo.com')
        cy.get('input#password').type('1234')

        // Submit
        cy.get('.MuiButton-root').click()

        // Check error
        cy.get('.MuiAlert-message').should('be.visible')
        cy.get('.MuiAlert-message').should('have.text', 'Invalid credentials')
    })

    it('shoud link to register page', () => {
        // Click on link
        cy.get('.css-6zak5a').click()

        // Check page
        cy.get('h1').should('have.text', 'Register')
    })
})