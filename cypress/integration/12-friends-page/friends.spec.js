describe('Friends Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)
        // Go to Friends page
        cy.get(':nth-child(5) > a > .css-fqxiwk').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display friends page', () => {
        // Check Friends page
        cy.get('h1').should('have.text', 'Friends')

        cy.get(':nth-child(1) > a > .css-qhl0nx').should('be.visible')
    })

    it('should link to friend profile', () => {
        // Click on a friend
        cy.get(':nth-child(1) > a > .css-qhl0nx > .css-18n0fuw').then(($friend) => {
            const friendName = $friend.text();

            cy.get(':nth-child(1) > a > .css-qhl0nx > .css-18n0fuw').click()

            // Check we go to their profile
            cy.url().should('include', '/profile')

            cy.get('h1').should(($friend2) => {
                expect($friend2.text()).to.eq(friendName)
            })

            // Check they are your friend
            cy.get('.MuiButton-root').should('have.text', 'Unfriend')
        })
    })

    it('should unfriend a friend', () => {
        // Click Unfriend button
        cy.get('.MuiButton-root').should('have.text', 'Unfriend')

        cy.get('.MuiButton-root').click()

        // Check button changed to Add Friend
        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Add Friend')
    })

    it('should send friend request', () => {
        // Click Add Friend button
        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Add Friend')

        cy.get('.css-b7l21c > .MuiButton-root').click()

        // Check button changed to Unsend Request
        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Unsend Request')

        // Resend request
        cy.get('.css-b7l21c > .MuiButton-root').click()

        cy.get('.css-b7l21c > .MuiButton-root').should('have.text', 'Add Friend')

        cy.get('.css-b7l21c > .MuiButton-root').click()
    })
})