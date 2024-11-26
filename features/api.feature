Feature: Login functionality

  Scenario: Successful login
    Given I have valid login credentials
    When I send a login request
    Then I should receive an auth token

  Scenario: Failed login
    Given I have invalid login credentials
    When I send a login request
    Then I should receive an unauthorized error

  Scenario: Send a message
    Given I am authenticated
    When I send message "Hello chat, today's time is: {time}" in the chat
    Then the message should be stored successfully