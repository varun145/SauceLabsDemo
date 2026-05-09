Feature: SauceDemo Checkout Functionality

  Background:
    Given User launches SauceDemo application

  @Smoke
  @TCID_Test06
  Scenario: Verify complete checkout flow

    When User enters username "standard_user" and password "secret_sauce"

    And User adds backpack product to cart
    And User clicks cart icon
    And User clicks checkout button

    And User enters firstname "Sai"
    And User enters lastname "Varun"
    And User enters postalcode "500001"

    And User clicks continue button

    Then User should see Overview page
    And Product should be displayed in checkout overview

    When User clicks finish button

    Then User should see order success message