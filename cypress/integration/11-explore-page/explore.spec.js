describe('Explore Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)
        // Go to Explore page
        cy.get(':nth-child(4) > a > .css-fqxiwk').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display explore page', () => {
        cy.get('h1').should('have.text', 'Explore')

        // List of genres
        let genres = [
            'Fiction',
            'Crime',
            'Fantasy',
            'Science Fiction',
            'Thriller',
            'Poetry',
            'Classics'
        ]

        for (const [index, genre] of genres.entries()) {
            // Is the genre displaying?
            cy.get(`.css-12w4zwb > :nth-child(${index + 1})`).should('be.visible')

            // Does it have the correct title?
            cy.get(`:nth-child(${index + 1}) > div.css-1e2fy0l > .css-1e2fy0l`).should('have.text', genre)

            // Does it have 5 recommendations?
            cy.get(`:nth-child(${index + 1}) > div.css-1e2fy0l > .MuiGrid-container`).children().should('have.length', 5)
        }
    })
})