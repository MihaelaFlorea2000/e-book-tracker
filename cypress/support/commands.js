import 'cypress-file-upload';
import "cypress-localstorage-commands"

// Login a user
Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:3000')
    cy.get('input#email').type(username)
    cy.get('input#password').type(password)
    cy.get('.MuiButton-root').click()
    cy.wait(2000)
})

// Check Add/Edit read form
Cypress.Commands.add('checkReadForm', () => {
    // Form fields
    cy.get('#startDate').should('be.visible')
    cy.get('#endDate').should('be.visible')

    // Add session
    cy.get('#date').should('be.visible')
    cy.get('#hours').should('be.visible')
    cy.get('#minutes').should('be.visible')
    cy.get('.css-yett57').should('be.visible')

    // Rating and notes
    cy.get('.MuiRating-root').should('be.visible')
    cy.get('#notes').should('be.visible')

    // Buttons
    cy.get('[type="submit"]').should('be.visible')
    cy.get('.css-1npq63p > [type="button"]').should('be.visible')
})

Cypress.Commands.add('addInvalidSession', () => {
    cy.get('#date').type('2022-03-06')
    cy.get('#hours').type('1')
    cy.get('#minutes').type('30')
    cy.get('.css-yett57').click()
    cy.get('.MuiAlert-message').should('be.visible')
    cy.get('.MuiAlert-message').should('have.text', 'A session must be between start and end dates')
})

// Add valid sessions
Cypress.Commands.add('addValidSessions', () => {
    // Add valid sessions
    cy.get('#date').clear()
    cy.get('#hours').clear()
    cy.get('#minutes').clear()

    const sessions = [
        {
            date: '2022-04-02',
            hours: '1',
            minutes: '30'
        },
        {
            date: '2022-04-03',
            hours: '2',
            minutes: '30'
        },
        {
            date: '2022-04-05',
            hours: '1',
            minutes: '10'
        },
        {
            date: '2022-04-06',
            hours: '3',
            minutes: '30'
        }
    ]

    for( const session of sessions) {
        cy.get('#date').clear()
        cy.get('#date').type(session.date)

        cy.get('#hours').clear()
        cy.get('#hours').type(session.hours)

        cy.get('#minutes').clear()
        cy.get('#minutes').type(session.minutes)

        cy.get('.css-yett57').click()
    }
})
