describe('Settings Page', () => {
    before(() => {
        cy.login('john_d@yahoo.com', '12345678')
        cy.wait(1000)

        // Got o Setting page
        cy.get(':nth-child(6) > a > .css-fqxiwk').click()
        cy.saveLocalStorage()
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })

    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('should display settings page', () => {

        // Check Settings page
        cy.url().should('include', '/settings')
        cy.get('h1').should('have.text', 'Settings')

        // Check Account section
        cy.get(':nth-child(2) > .MuiAccordionSummary-root').should('be.visible')
        cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .css-1kq6w27 > .css-r73csp').should('have.text', 'Account')

        // Check Appearance section
        cy.get(':nth-child(3) > .MuiAccordionSummary-root').should('be.visible')
        cy.get(':nth-child(3) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .css-1kq6w27 > .css-r73csp').should('have.text', 'Appearance')

        // Check Privacy section
        cy.get(':nth-child(4) > .MuiAccordionSummary-root').should('be.visible')
        cy.get(':nth-child(4) > .MuiAccordionSummary-root > .MuiAccordionSummary-content > .css-1kq6w27 > .css-r73csp').should('have.text', 'Privacy')
    })

    it('should edit account settings', () => {

        // Check Account section is visible
        cy.get('.css-jenr7b').should('be.visible')

        // Check use details are correct
        cy.get('#firstName').should('have.value', 'John')
        cy.get('#lastName').should('have.value', 'Doe')
        cy.get('#email').should('have.value', 'john_d@yahoo.com')

        // Edit user details
        cy.get('#firstName').clear()
        cy.get('#firstName').type('John')

        cy.get('#lastName').clear()
        cy.get('#lastName').type('Doe')

        cy.get('#email').clear()
        cy.get('#email').type('john_d@yahoo.com')

        // Save
        cy.get('.css-to16qx > [type="submit"]').click()

        // Check update was successful
        cy.url().should('include', '?fromUpdate')
        cy.get('.MuiAlert-message').should('have.text', 'Successful update')
    })

    it('should edit appearance settings', () => {
        // Expand Appearance section
        cy.get(':nth-child(4) > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > .css-1nu6ntq > .svg-inline--fa > path').click()

        // Check Appearance section is visible
        cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root').should('be.visible')

        // Toggle dark theme
        cy.get('.MuiAccordionDetails-root > :nth-child(1) > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input').click()
        cy.get('.MuiAccordionDetails-root > :nth-child(1) > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input').click()

        // Change font size
        cy.get('.css-1x96a45 > div.css-1e2fy0l > :nth-child(1)').click()
        cy.get('div.css-1e2fy0l > :nth-child(3)').click()

        // Change reader theme
        cy.get('.css-l87b50 > :nth-child(1)').click()
        cy.get('.css-l87b50 > :nth-child(3)').click()

        // Save
        cy.get(':nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .css-x0no4f > [type="submit"]').click()

        // Check update was successful
        cy.url().should('include', '?fromUpdate')
        cy.get('.MuiAlert-message').should('have.text', 'Successful update')
    })

    it('should edit privacy settings', () => {
        // Expand Privacy section
        cy.get(':nth-child(5) > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > .css-1nu6ntq > .svg-inline--fa > path').click()

        // Check Privacy section is visible
        cy.get(':nth-child(5) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root').should('be.visible')

        // Toggle notifications
        cy.get('.css-p6yv8f > .css-1kq6w27 > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input').click()
        cy.get('.css-p6yv8f > .css-1kq6w27 > .MuiSwitch-root > .MuiSwitch-switchBase > .MuiSwitch-input').click()

        // What to show on profile
        cy.get(':nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').click()

        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').click()
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').click()

        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').click()

        // Save
        cy.get(':nth-child(5) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .css-x0no4f > [type="submit"]').click()

        // Check update was successful
        cy.url().should('include', '?fromUpdate')
        cy.get('.MuiAlert-message').should('have.text', 'Successful update')
    })
})