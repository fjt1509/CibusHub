/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('E2ETesting', () => {


  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should have a title', function () {
      cy.contains('CibusHub');
  });

  it('should contain A Forum For Food Enthusiasts', function () {
    cy.contains('A Forum For Food Enthusiasts');
  });

  it('should have a navbar with home', function () {
      cy.contains('Home');
  });


  it('should have a navbar with profile', function () {

    cy.contains('Profile');
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

  it('should contain Forum Rules', function () {

      cy.contains('The Forum').click();
      cy.contains('Forum Rules');
  });

  it('should contain a no spam text', function () {
      cy.contains('The Forum').click();
      cy.contains('No spam');

  });


  it('should contain upload', function () {
    cy.visit('http://localhost:4200/forums/add/post');
    cy.contains('Upload');

  });


});
