Feature: SauceDemo Login Functionality

  Background:
    Given User launches SauceDemo application

  @Smoke
  @TCID_Test01
  @Regression
  @TCID_Test02
  Scenario Outline: Verify login functionality

    When User enters username "<username>" and password "<password>"
    Then User should see "<result>"

    Examples:
      | username       | password       | result                               |
      | standard_user  | secret_sauce   | inventory                            |
      | invalid_user   | wrong_password | Username and password do not match   |

  @Smoke
  @TCID_Test03
  Scenario: Verify inventory page details

    When User enters username "standard_user" and password "secret_sauce"

    Then User should see Swag Labs logo
    And User should see Products header
    And Products should be displayed