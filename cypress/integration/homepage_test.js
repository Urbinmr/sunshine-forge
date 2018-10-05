const spacesList = require('../fixtures/spacesList')
const createResponse = require('../fixtures/spacesCreateResponse')

xcontext('Spaces', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should find an Add Space button', () => {
        cy.exec('psql -d sunshine_development -a -f resetDb.sql')
        cy.get('#showAddSpace')
            .should('exist')
    })

    it('should show a form when add space is clicked', () => {
        cy.get('input').should('not.exist')
        cy.get('#showAddSpace')
            .click()
        cy.get('input').should('have.length', 3)
        cy.get('h1').should('have.length', 1)
        cy.get('button#addSpace').should('have.length', 1)
    })

    it('should change view when create space is clicked', () => {
        cy.get('#showAddSpace')
            .click()
        cy.get('#name')
            .type('nameTest')
            .should('have.value', 'nameTest')
        cy.get('#memory')
            .type('12')
            .should('have.value', '12')
        cy.get('#disk')
            .type('23')
            .should('have.value', '23')
        cy.get('#addSpace')
            .click()
        cy.get('#addSpace')
            .should('not.exist')
        cy.get('.spaceItem').last()
            .should('have.text', 'nameTest 0%')
    })

    it('should initialize with fetched data', () => {
        cy.get('.spaceItem').last()
            .should('have.text', 'nameTest 0%')
    })

    it('should display detail page and edit page', () => {
        cy.get('.spaceItem')
            .first()
            .click()

        cy.get('.spaceDetails')
            .should('have.length', 1)

        cy.get('#viewEditSpace')
            .click()

        cy.get('#editSpace')
            .should('have.length', 1)

        cy.get('#cancelEdit').click()

        cy.get('.spaceDetails')
            .should('have.length', 1)
    })

    it('should edit spaces', () => {
        cy.get('.spaceItem')
            .first()
            .click()

        cy.get('.spaceDetails')
            .should('have.length', 1)

        cy.get('#viewEditSpace')
            .click()

        cy.get('#editSpace')
            .should('have.length', 1)

        cy.get('#name').clear().type('new name')
        cy.get('#disk').clear().type('34')
        cy.get('#memory').clear().type('1')

        cy.get('#editSpace').click()

        cy.get('.spaceDetails')
            .should('have.length', 1)
        cy.contains('new name')
            .should('have.length', 1)
    })

    it('should display confirm delete when delete button is clicked', () => {
        cy.get('.spaceItem')
            .first()
            .click()

        cy.get('#deleteSpace')
            .click()

        cy.get('.spaceItem')
            .should('have.length', 0)

    })

    it('cleans up', () => {
        cy.exec('psql -d sunshine_development -a -f resetDb.sql')
    })
})

context('Apps', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('starts with a clean up', () => {
        cy.exec('psql -d sunshine_development -a -f resetDb.sql')
    })

    it('creates an app', () => {
        cy.get('#showAddSpace').click()
        cy.get('#name').type('nameTest')
        cy.get('#memory').type('12')
        cy.get('#disk').type('23')
        cy.get('#addSpace').click()
        cy.get('.spaceItem').last().click()

        //on details
        cy.get('#addApp')
            .should('exist')
            .click()

        cy.get('#name').should('have.length', 1)
        cy.get('#memory').should('have.length', 1)
        cy.get('#disk').should('have.length', 1)
        cy.get('#addApp').should('have.length', 1)
    })

    it('cleans up', () => {
        cy.exec('psql -d sunshine_development -a -f resetDb.sql')
    })
})