import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../pageobjects/login.page';
import ChatPage from '../pageobjects/chat.page';

// import { browser } from "@wdio/globals";

Given('a user is on the login page', async function () {
  await LoginPage.open();
  // await browser.pause(30000)
});

When('the user logs in with a valid email and password', async function () {
  await LoginPage.login('tester', '!Q@W#E$R%T');
});

When('the user should see the {string} message', async function (message:string) {

  await expect(await ChatPage.getWelcomeMessage()).toHaveText(message);
})

When('the user should click to the {string} channel tab', async function (label:string) {
  await (await ChatPage.getChatTab(label)).click()
})

Then('the user should see the chat interface', async function () {
  await expect(ChatPage.chatContainer).toBeDisplayed();
});

Then('the user should see the message history', async function () {
  const messages = await ChatPage.getMessagesHistory();
  await expect(messages.length).toBeGreaterThanOrEqual(1);
});