describe('Share Video', () => {
  it('should share success', async () => {
    await cy.get('button').click()
    cy.wait(1000)
    await cy.get('input').type('https://www.youtube.com/watch?v=UoozJ99Rumw')
    cy.wait(1000)
    await cy.get('button[type="submit"]').click()
  })
})
