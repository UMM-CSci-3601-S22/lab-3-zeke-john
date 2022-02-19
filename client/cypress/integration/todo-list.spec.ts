import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for todo owner 'Blanche'
    cy.get('#todo-owner-input').type('Blanche');

    // All of the todo cards should have the owner we are filtering by
    page.getTodoCards().each($card => {
      cy.wrap($card).find('.todo-card-owner').should('have.text', 'Blanche');
    });

    // (We check this two ways to show multiple ways to check this)
    page.getTodoCards().find('.todo-card-owner').each($owner =>
      expect($owner.text()).to.equal('Blanche')
    );
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'software design'
    cy.get('#todo-category-input').type('software design');

    // All of the todo cards should have the category we are filtering by
    page.getTodoCards().find('.todo-card-category').each($card => {
      cy.wrap($card).should('have.text', 'software design');
    });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for categories that contain 'de'
    cy.get('#todo-category-input').type('de');

    // Go through each of the cards that are being shown and get the categories
    page.getTodoCards().find('.todo-card-category')
      // We should see these categories
      .should('contain.text', 'software design')
      .should('contain.text', 'video games')
      // We shouldn't see these categories
      .should('not.contain.text', 'homework')
      .should('not.contain.text', 'groceries');
  });

  it('Should change the status filter and check that it returned correct elements', () => {

    page.changeStatus('complete');

    page.getTodoCards().find('.todo-card-status')
    .should('contain.text', 'complete')
    .should('not.contain.text', 'incomplete');
  });

  it('Should change the view', () => {
    // Choose the view type "List"
    page.changeView('list');

    // We should not see any cards
    // There should be list items
    page.getTodoCards().should('not.exist');
    page.getTodoListItems().should('exist');

    // Choose the view type "Card"
    page.changeView('card');

    // There should be cards
    // We should not see any list items
    page.getTodoCards().should('exist');
    page.getTodoListItems().should('not.exist');
  });

  it('Should click view profile on a todo and go to the right URL', () => {
    page.getTodoCards().first().then((card) => {
      const firstTodoOwner = card.find('.todo-card-owner').text();
      const firstTodoCategory = card.find('.todo-card-category').text();

      // When the view profile button on the first todo card is clicked, the URL should have a valid mongo ID
      page.clickViewProfile(page.getTodoCards().first());

      // The URL should contain '/todos/' (note the ending slash) and '/todos/' should be followed by a mongo ID
      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the name and category should be correct
      cy.get('.todo-card-name').first().should('have.text', firstTodoOwner);
      cy.get('.todo-card-category').first().should('have.text', firstTodoCategory);
    });
   });

});
