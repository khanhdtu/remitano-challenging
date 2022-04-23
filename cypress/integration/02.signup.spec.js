describe('Sign Up', () => {
  it('should sign up success', async () => {
    await cy.get('input[placeholder="Username"]').type('khanhjsx')
    cy.wait(1000)
    await cy.get('input[placeholder="Password"]').type('abc@123')
    cy.wait(1000)
    await cy.get('a').click()
  })
})
