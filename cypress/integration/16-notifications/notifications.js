describe('Notifications', () => {
    before(() => {
        cy.login('emma_s@yahoo.com', '1234')
        cy.wait(1000)

        // Open notification menu
        cy.get('.css-mxjnqt').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should open notifications panel', () => {
        // Check notification menu appears
        cy.get('.css-548rad').should('be.visible')

        cy.get('.css-548rad > .css-1e2fy0l').should('have.text', 'Notifications')
    })

    it('should accept friend request', () => {

        cy.get('.css-yo0lwc > :nth-child(1) > .css-btwlf3 > .css-pspwy9 > .css-cx3lbq > .css-1swabab').then(($friend) => {
            const friendName = $friend.text();

            // Go to first friend request
            cy.get('.css-yo0lwc > :nth-child(1)').click()

            // Close notification menu
            cy.get('.MuiBackdrop-root').click({force: true, multiple: true})

            // Check the correct profile page is displayed
            cy.url().should('include', '/profile')

            cy.get('h1').should(($friend2) => {
                expect($friend2.text()).to.eq(friendName)
            })
        })

        // Check the Accept/Reject buttons display
        cy.get('.css-b7l21c > :nth-child(1)').should('have.text', 'Accept')
        cy.get('.css-b7l21c > :nth-child(2)').should('have.text', 'Reject')

        // Accept the request
        cy.get('.css-b7l21c > :nth-child(1)').click()

        // Check the button changes to Unfriend
        cy.get('.MuiButton-root').should('have.text', 'Unfriend')
    })

    it('should reject friend request', () => {

        // Open the notification panel
        cy.get('.css-mxjnqt').click()

        // Check panel opened
        cy.get('.css-548rad').should('be.visible')
        cy.get('.css-548rad > .css-1e2fy0l').should('have.text', 'Notifications')

        cy.get('.css-yo0lwc > :nth-child(2) > .css-btwlf3 > .css-pspwy9 > .css-cx3lbq > .css-1swabab').then(($friend) => {
            const friendName = $friend.text();

            // Go to second friend request
            cy.get('.css-yo0lwc > :nth-child(2)').click()

            // Close the notifications panel
            cy.get('.MuiBackdrop-root').click({force: true, multiple: true})

            // Check the right profile page is displayed
            cy.url().should('include', '/profile')

            cy.get('h1').should(($friend2) => {
                expect($friend2.text()).to.eq(friendName)
            })
        })

        // Check the Accept/Reject buttons display
        cy.get('.css-b7l21c > :nth-child(1)').should('have.text', 'Accept')
        cy.get('.css-b7l21c > :nth-child(2)').should('have.text', 'Reject')

        // Reject the request
        cy.get('.css-b7l21c > :nth-child(2)').click()

        // Check the button changes to Add Friend
        cy.get('.MuiButton-root').should('have.text', 'Add Friend')
    })

    it('should link to badges', () => {
        // Open the notification panel
        cy.get('.css-mxjnqt').click()

        // Check panel opened
        cy.get('.css-548rad').should('be.visible')
        cy.get('.css-548rad > .css-1e2fy0l').should('have.text', 'Notifications')

        // Click on badge notification
        cy.get('.css-yo0lwc > :nth-child(3)').click()

        // Close the panel
        cy.get('.MuiBackdrop-root').click({force: true, multiple: true})

        // Check Badges page displays
        cy.url().should('include', '/badges')

        cy.get('h1').should('have.text', 'Badges')
    })
})