/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('E2ETesting', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200');


  })

  it('should have a title', function () {
      cy.contains('CibusHub');
  });

  it('should have a navbar with home', function () {
    cy.contains('Home');
  });

  it('should have a navbar with login', function () {
    cy.contains('Login');
  });


  it('should have a video', function () {
      cy.contains('Last Months Most Valuable Find')
  });

  it('should url contain forum', function () {
      cy.contains('The Forum').click();
      cy.url().should('include', '/forums');
  });

  it('should contain add post', function () {
    cy.visit('http://localhost:4200/forums/add/post');
    cy.contains('Add Post');
  });

});
