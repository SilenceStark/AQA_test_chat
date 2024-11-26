Feature: Chat functionality

  Scenario: Login with valid credentials and verify chat functionality
    Given a user is on the login page
    When the user logs in with a valid email and password
    And the user should see the 'Welcome to best_company' message
    And the user should click to the 'general' channel tab
    Then the user should see the chat interface
    And the user should see the message history

  Scenario: Send a message and verify it
    Given a user is logged into the chat
    When the user should click to the 'general' channel tab
    And the user sends a message 'Hello!'
    Then the message 'Hello!' should be displayed in the chat