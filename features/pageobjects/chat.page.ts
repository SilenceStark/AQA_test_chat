import Page from "./page.ts";

class ChatPage extends Page {
  public get welcomeMessage() {
    return $(`[data-qa-id="homepage-welcome-text"]`);
  }

  public get chatContainer() {
    return $('[aria-label="Message list"]');
  }

  public get messageHistory() {
    return $$('[data-qa-type="message"]');
  }
  public async getMessagesHistory():Promise<ChainablePromiseArray> {
    return await this.messageHistory;
  }

  public get inputMessage() {
    return $('[name="msg"]');
  }

  public get btnSend() {
    return $('[aria-label="Send"]');
  }

  public get lastMessage() {
    return $$('#message-history > .message');
  }

  public async open(): Promise<void> {
    await browser.url('/home');
  }

  public async getWelcomeMessage() {
    return this.welcomeMessage;
  }


  public async getChatTab(label: string) {
    return $(`[aria-label="${label}"]`);
  }

  public async sendMessage(message: string): Promise<void> {
    await this.inputMessage.setValue(message);
    await this.btnSend.click();
  }

  public async getLastMessageText() {
    const messages = await this.getMessagesHistory();
    const lastMessage = messages.slice(-1)[0]; // Get the last element from the array
    return await lastMessage.getText();
  }

}

export default new ChatPage();