describe('Init Application', () => {
  it('should open root page', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', 'http://localhost:3000')
    cy.wait(5000)
    cy.get('iframe').should('be.visible')
  })
})
