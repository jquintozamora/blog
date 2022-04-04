---
layout: post
title: Cypress cheat sheet
language: English
permalink: cypress-cheat-sheet
id: 912
categories:
  - Utilities
tags:
  - Cypress
date: 2021-02-06 18:00:24
featuredImage: 
  url: featured.png
---

This post is a compilation of useful git commands I normally use. I don't use UI tooling to work with git as I prefer to have 100% control on git commands triggered, so I'm using `git` on terminal (iTerm2)




## Selection commands

### Filter by text
  cy.findAllByTestId("topMenu.item")
    .filter(':contains("My Menu Action")')
    .should("be.visible").click()




## Patterns

### Use selectors
const getWindow = () => cy.findByTestId("myWindowTestId")
const closeWindow = () => getWindow().should("be.visible").findByText("Close").click()
const checkWindowIsOpen = () => getWindow().should("be.visible")

### Wait for animations, Modals, Windows to be opened or closed, ...

const createTodoItem = (name, itemType) => {
  cy.findByTestId("buttonToOpenMenu").click()

  // wait for the menu to be opened
  cy.findByTestId("menu").should("be.visible")

  // once menu is opened we can interact
  cy.findByTestId("menu").findByPlaceholderText("Type data").type(name)
  cy.findByTestId("menu").findByText(itemType).click()
  cy.findByTestId("menu").findByText("Create").click()

  // once create / cancel button is clicked we wait for the menu to be closed
  cy.findByTestId("menu").should("not.be.visible")
}






## Plugins

import "@testing-library/cypress/add-commands"




