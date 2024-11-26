import { Given, When, Then } from '@cucumber/cucumber';
import ChatPage from '../pageobjects/chat.page';

Given('a user is logged into the chat', async function () {
  await ChatPage.open(); // Assuming user is already logged in for simplicity
});

When('the user sends a message {string}', async function (message:string) {
  await ChatPage.sendMessage(message);
});

Then('the message {string} should be displayed in the chat', async function (message:string) {
  const lastMessageText = await ChatPage.getLastMessageText();
  await expect(lastMessageText).toContain(message);

});