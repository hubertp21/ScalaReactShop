describe('ScalaReactShop – UI Test Cases', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Should load product list', () => {});
    it('2. Should display at least 1 product', () => {});
    it('3. Should add first product to cart', () => {});
    it('4. Should navigate to cart page', () => {
        cy.visit('/cart');
    });
    it('5. Should show empty cart initially', () => {});
    it('6. Should remove product from cart', () => {});
    it('7. Should return to product list from cart', () => {
        cy.visit('/');
    });
    it('8. Should add multiple products to cart', () => {});
    it('9. Should calculate total amount correctly (visually)', () => {});
    it('10. Should navigate to payment page', () => {
        cy.visit('/payment');
    });
    it('11. Should display payment form', () => {});
    it('12. Should submit payment with card', () => {});
    it('13. Should submit payment with BLIK', () => {});
    it('14. Should submit payment with PayPal', () => {});
    it('15. Should disable payment with empty cart', () => {});
    it('16. Should allow switching payment methods', () => {});
    it('17. Should show message after payment', () => {});
    it('18. Should preserve cart state between pages', () => {});
    it('19. Should clear cart after payment (optional)', () => {});
    it('20. Should navigate using navbar links', () => {});
});
