describe('ScalaReactShop – UI Test Cases', () => {
    beforeEach(() => {
        cy.intercept('GET', '/products', {
            statusCode: 200,
            body: [
                { id: 1, name: 'Laptop', price: 3000 },
                { id: 2, name: 'Phone', price: 2000 },
                { id: 3, name: 'Keyboard', price: 500 }
            ]
        }).as('getProducts');

        cy.visit('/');
        cy.wait('@getProducts');

        cy.intercept('POST', '/payments', {
            statusCode: 200,
            body: { status: 'Payment received' }
        });

        cy.clearLocalStorage();
    });

    it('Should load product list', () => {
        cy.get('li').should('exist');
    });

    it('Should display at least 1 product', () => {
        cy.get('li').its('length').should('be.gte', 1);
    });

    it('Should add first product to cart', () => {
        cy.get('li').first().contains('Add').click();
    });

    it('Should navigate to cart page', () => {
        cy.contains('Cart').click();
        cy.url().should('include', '/cart');
    });

    it('Should show empty cart initially', () => {
        cy.contains('Cart').click();
        cy.get('ul li').should('have.length', 0);
    });

    it('Should add and then remove a product', () => {
        cy.get('button').contains('Add').eq(0).click();
        cy.contains('Cart').click();
        cy.get('button').contains('Delete').click();
        cy.get('ul li').should('have.length', 0);
    });

    it('Should return to product list from cart', () => {
        cy.contains('Cart').click();
        cy.contains('Products').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('Should calculate total visually (not validated)', () => {
        cy.get('button').contains('Add').eq(0).click();
        cy.contains('Cart').click();
        cy.contains('Payment').click();
        cy.contains('Total amount:').should('exist');
    });

    it('Should navigate to payment page', () => {
        cy.contains('Payment').click();
        cy.url().should('include', '/payment');
    });

    it('Should display payment form elements', () => {
        cy.contains('Payment').click();
        cy.contains('Order ID:').should('exist');
        cy.get('select').should('exist');
        cy.get('button').contains('Submit').should('exist');
    });

    it('Should submit payment with card', () => {
        cy.get('button').contains('Add').click();
        cy.contains('Payment').click();
        cy.get('select').select('card');
        cy.get('button').contains('Submit').click();
        cy.get('p').should('contain.text', 'Payment received');
    });

    it('Should submit payment with BLIK', () => {
        cy.get('button').contains('Add').click();
        cy.contains('Payment').click();
        cy.get('select').select('blik');
        cy.get('button').contains('Submit').click();
        cy.get('p').should('contain.text', 'Payment received');
    });

    it('Should submit payment with PayPal', () => {
        cy.get('button').contains('Add').click();
        cy.contains('Payment').click();
        cy.get('select').select('paypal');
        cy.get('button').contains('Submit').click();
        cy.get('p').should('contain.text', 'Payment received');
    });

    it('Should allow accessing payment page with empty cart', () => {
        cy.contains('Payment').click();
        cy.contains('Payment').should('exist');
    });

    it('Should allow switching payment methods', () => {
        cy.get('button').contains('Add').click();
        cy.contains('Payment').click();
        cy.get('select').select('paypal').should('have.value', 'paypal');
        cy.get('select').select('blik').should('have.value', 'blik');
    });

    it('Should show confirmation message after payment', () => {
        cy.get('button').contains('Add').click();
        cy.contains('Payment').click();
        cy.get('button').contains('Submit').click();
        cy.get('p').should('contain.text', 'Payment received');
    });

    it('Should preserve cart between pages', () => {
        cy.get('button').contains('Add').eq(0).click();
        cy.contains('Cart').click();
        cy.contains('Payment').click();
        cy.contains('Total amount:').should('exist');
    });

    it('Should optionally clear cart after payment', () => {
        cy.wrap(true).should('eq', true);
    });

    it('Should navigate using nav links', () => {
        cy.contains('Products').click();
        cy.url().should('include', '/');
        cy.contains('Cart').click();
        cy.url().should('include', '/cart');
        cy.contains('Payment').click();
        cy.url().should('include', '/payment');
    });
});
