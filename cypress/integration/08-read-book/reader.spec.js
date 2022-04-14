describe('Reader Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.get('.MuiGrid-container > :nth-child(1) > .css-qiwkdw > .css-1vcqj8z > .css-1y4257v > :nth-child(1)').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should open the book', () => {

        // URL and Page Title
        cy.url().should('include', '/book/reader')
        cy.get('[style="position: absolute; top: 20px; left: 50px; right: 50px; text-align: center; color: rgb(153, 153, 153);"]').should('have.text', 'The Man in the Iron Mask')

        // Menu
        cy.get('[style="background: none; border: none; width: 32px; height: 32px; position: absolute; top: 10px; left: 10px; border-radius: 2px; outline: none; cursor: pointer;"]').should('be.visible')

        // Left and Right arrows
        cy.get('[style="outline: none; border: none; background: none; position: absolute; top: 50%; margin-top: -32px; font-size: 64px; padding: 0px 10px; color: rgb(94, 75, 49); font-family: arial, sans-serif; cursor: pointer; user-select: none; appearance: none; font-weight: normal; left: 1px;"]').should('be.visible')
        cy.get('[style="outline: none; border: none; background: none; position: absolute; top: 50%; margin-top: -32px; font-size: 64px; padding: 0px 10px; color: rgb(94, 75, 49); font-family: arial, sans-serif; cursor: pointer; user-select: none; appearance: none; font-weight: normal; right: 1px;"]').should('be.visible')

        // Top Buttons
        cy.get('.css-aynoax > :nth-child(1)').should('be.visible')
        cy.get('.css-aynoax > :nth-child(2)').should('be.visible')
        cy.get('.css-aynoax > :nth-child(3)').should('be.visible')
        cy.get('.css-aynoax > :nth-child(4)').should('be.visible')
        cy.get('.css-aynoax > :nth-child(5)').should('be.visible')

        // Font sizer and position in book
        cy.get('.css-t36q9a > :nth-child(1)').should('be.visible')
    })

    it('should open and close the menu', () => {
        // Click hamburger menu
        cy.get('[style="background: none; border: none; width: 32px; height: 32px; position: absolute; top: 10px; left: 10px; border-radius: 2px; outline: none; cursor: pointer;"]').click()

        // Check menu shows up
        cy.get('[style="position: absolute; left: 0px; top: 0px; bottom: 0px; z-index: 0; width: 256px; overflow-y: auto; background: rgb(242, 242, 242); padding: 10px 0px;"]').should('be.visible')

        // Close menu
        cy.get('[style="position: absolute; inset: 0px 0px 0px 256px; z-index: 1;"]').click()
    })

    it('should open search menu', () => {
        // Click Search icon
        cy.get('.css-aynoax > :nth-child(2)').click()

        // Check menu shows up
        cy.get('.css-1sct6h1').should('be.visible')
        cy.get('.css-1sct6h1').should('have.text', 'Search')
        cy.get('#search').should('be.visible')

    })

    it('should search for something', () => {
        // Search for a term
        cy.get('#search').type('Aramis')
        cy.get('#search').type('{enter}')

        // Check number of results
        cy.get('.css-krhda7').should('have.text', 'Results (735)')

        // Go to a result and close search menu
        cy.get('.css-udybjs > :nth-child(1)').click()
        cy.get('.MuiBackdrop-root').click({force: true})

    })

    it('should open highlight menu', () => {
        // Click highlight icon
        cy.get('.css-aynoax > :nth-child(4)').click()

        // Check highlight menu opens
        cy.get('.css-1e2fy0l').should('be.visible')
        cy.get('.css-548rad > .css-1e2fy0l').should('have.text', 'Highlights')
    })

    it('should edit highlight', () => {
        // Click on edit button
        cy.get(':nth-child(1) > .css-7qbcrs > :nth-child(1)').click()

        // Check edit highlight dialog dislays
        cy.get('#mui-3').should('be.visible')
        cy.get('#mui-3').should('have.text', 'Edit Highlight')
        cy.get('#note').should('be.visible')

        // Select blue color
        cy.get('.css-b7c04q').click()

        // Edit note
        cy.get('#note').clear()
        cy.get('#note').type('Nice quote!')

        // Click Submit
        cy.get('.MuiDialogActions-root > :nth-child(1)').click()
    })

    it('should delete highlight', () => {
        // Click on delete button
        cy.get(':nth-child(1) > .css-7qbcrs > :nth-child(2)').click()

        // Check it was deleted
        cy.get(':nth-child(1) > .css-1j8xvlg').should('not.exist')
    })

    it('should go to highlight', () => {
        // Click on a highlight
        cy.get('.css-udybjs > :nth-child(2) > :nth-child(2)').click()

        // Close the menu
        cy.get('.MuiBackdrop-root').click({force: true})
    })

    it('should link to settings', () => {
        // Click on settings button
        cy.get('.css-aynoax > :nth-child(1)').click()

        // Check it went to settings
        cy.url().should('include', '/settings')

        // Go back to reader
        cy.go('back')
    })

    it('should link to library', () => {
        cy.wait(200)
        // Click on home button
        cy.get('.css-aynoax > :nth-child(5)').click()

        // Check it went to library
        cy.get('h1').should('have.text', 'Library')
        cy.go('back')
    })

})