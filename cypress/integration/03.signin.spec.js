describe('Sign In', () => {
  it('should sign in success', async () => {
    await cy.get('input[placeholder="Username"]').type('khanhjs')
    cy.wait(1000)
    await cy.get('input[placeholder="Password"]').type('abc@123')
    cy.wait(1000)
    await cy.get('button').click()
  })
})
