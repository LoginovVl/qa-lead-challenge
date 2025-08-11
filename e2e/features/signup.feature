Feature: Ninox Sign-Up Flow

   Scenario: Sign up with Personal account
    Given I navigate to the sign up page
    And I accept cookies settings
    When I select "personal" account type
    And I enter personal account details
    Then I should be redirected to the dashboard
    And I accept cookies settings
    And I close the onboarding popup
    And I open the profile screen
    And I should be redirected to the Profile page
    And I accept cookies settings
    Then the Company Information tab should NOT be visible in the profile

 Scenario: Sign up with Business account
    Given I navigate to the sign up page
    And I accept cookies settings
    When I select "business" account type
    And I enter personal account details
    And I enter business account details
    Then I should be redirected to the dashboard
    And I accept cookies settings
    And I close the onboarding popup
    And I open the profile screen
    And I should be redirected to the Profile page
    And I accept cookies settings
    Then the Company Information tab should be visible in the profile
