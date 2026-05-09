Feature: SauceDemo Cart Functionality

  Background:
    Given User launches SauceDemo application

  @Smoke
  @TCID_Test04
  Scenario: Verify add to cart

    When User enters username "standard_user" and password "secret_sauce"
    And User adds backpack product to cart
    And User clicks cart icon

    Then User should navigate to cart page
    And Product should be visible in cart
    And Checkout button should be visible

  @Regression
  @TCID_Test05
  Scenario: Verify remove from cart

    When User enters username "standard_user" and password "secret_sauce"
    And User adds backpack product to cart
    And User clicks cart icon
    And User removes product from cart

    Then Cart should be empty