context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should find an Add Space button', () => {
        cy.get('#showAddSpace')
            .should('exist')
    })

    it('should show a form when add space is clicked', () => {
        cy.get('input').should('not.exist')
        cy.get('#showAddSpace')
            .click()
        cy.get('input').should('have.length', 3)
        cy.get('h1').should('have.length', 1)
        cy.get('button#createSpace').should('have.length', 1)
    })

    it('should change view when create space is clicked', () => {
        cy.get('#showAddSpace')
            .click()
        cy.get('#name')
            .type('nameTest')
            .should('have.value', 'nameTest')
        cy.get('#memory')
            .type('memoryTest')
            .should('have.value', 'memoryTest')
        cy.get('#disk')
            .type('diskTest')
            .should('have.value', 'diskTest')
        cy.get('#createSpace')
            .click()
        cy.get('#createSpace')
            .should('not.exist')
        cy.get('.spaceItem')
            .should('have.length', 1)
            .should('have.text', 'nameTest memoryTest diskTest')
    })

})