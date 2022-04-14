describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('should display register page', () => {
        // Title and subtitle
        cy.get('h1').should('have.text', 'Register')
        cy.get('.css-1ukcoy2').should('have.text',
            'Create a new account')

        // Form inputs
        cy.get('#firstName').should('be.visible')
        cy.get('#lastName').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#confirmPassword').should('be.visible')

        // Submit Button
        cy.get('.MuiButton-root').should('have.text', 'Submit')
    })

    it("should show passwords don't match", () => {
        // Fill in incorrect details
        cy.get('input#firstName').type('Test')
        cy.get('input#lastName').type('User')
        cy.get('input#email').type('test_user@yahoo.com')
        cy.get('input#password').type('12345678')
        cy.get('#confirmPassword').type('1234')

        // Submit
        cy.get('.MuiButton-root').click()

        // Check error
        cy.get('#confirmPassword-error').should('be.visible')
        cy.get('#confirmPassword-error').should('have.text', 'Passwords must match')
    })

    it('should show email already exists error', () => {
        // Fill in incorrect details
        cy.get('input#firstName').type('Emma')
        cy.get('input#lastName').type('Smith')
        cy.get('input#email').type('emma_s@yahoo.com')
        cy.get('input#password').type('12345678')
        cy.get('#confirmPassword').type('12345678')

        // Submit
        cy.get('.MuiButton-root').click()
    })

    it('should register correctly', () => {
        // Fill in correct details
        cy.get('input#firstName').type('Test')
        cy.get('input#lastName').type('User')
        cy.get('input#email').type('test_user@yahoo.com')
        cy.get('input#password').type('12345678')
        cy.get('#confirmPassword').type('12345678')

        // Submit
        cy.get('.MuiButton-root').click()
    })

    it('should link to login page', () => {
        // Click link
        cy.get('.css-6zak5a').click()

        // Check page
        cy.get('h1').should('have.text', 'Login')
    })
})