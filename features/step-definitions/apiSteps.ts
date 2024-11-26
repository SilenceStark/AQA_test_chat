import axios, { AxiosResponse } from "axios";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@wdio/globals";

const BASE_URL = "http://localhost:3000/api/v1";
let response: AxiosResponse;
let token: string | null = null;
let userId: string | null = null;
let credentials: { username: string; password: string };
let dynamicMessage: string | null = null;
const generateTime = () => new Date().toISOString();


Given("I have valid login credentials", () => {
  credentials = { username: "tester02", password: "1234" };
});

Given("I have invalid login credentials", () => {
  credentials = { username: "tester02", password: "wrongpassword" };
});

When("I send a login request", async () => {
  const requestData = {
    message: JSON.stringify({
      msg: "method",
      id: "1",
      method: "login",
      params: [
        {
          user: { username: credentials.username },
          password: credentials.password,
        },
      ],
    }),
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  response = await axios.post(`${BASE_URL}/method.callAnon/login`, requestData, { headers });
});

Then("I should receive an auth token", () => {
  expect(response.status).toBe(200);
  const parsedMessage = JSON.parse(response.data.message);
  expect(parsedMessage.result).toHaveProperty("token");
  console.log("Збережене повідомлення:", parsedMessage);
  token = parsedMessage.result.token;
  userId = parsedMessage.result.id;
  console.log("Auth Token:", token);
  console.log("User ID:", userId);
  expect(token).not.toBeNull();
});

Then("I should receive an unauthorized error", () => {
  expect(response.status).toBe(200);
  const parsedMessage = JSON.parse(response.data.message);
  expect(parsedMessage.error).toBeDefined();
  expect(parsedMessage.error.reason).toBe("User not found");
});

Given("I am authenticated", async () => {
  const loginData = {
    message: JSON.stringify({
      msg: "method",
      id: "1",
      method: "login",
      params: [
        {
          user: { username: "tester02" },
          password: "1234",
        },
      ],
    }),
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const loginResponse = await axios.post(`${BASE_URL}/method.callAnon/login`, loginData, {
    headers,
  });

  const parsedLoginMessage = JSON.parse(loginResponse.data.message);
  token = parsedLoginMessage.result.token;
  userId = parsedLoginMessage.result.id;
  console.log("Auth Token:", token);
  console.log("User ID:", userId);
  expect(token).not.toBeNull();
});

When(`I send message {string} in the chat`, async (messageTemplate: string) => {

  dynamicMessage = messageTemplate.replace("{time}", generateTime());
  const messageData = {
    message: JSON.stringify({
      msg: "method",
      id: "22",
      method: "sendMessage",
      params: [
        {
          rid: "GENERAL", // Channel name
          msg: dynamicMessage, // message text
        },
        null,
      ],
    }),
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Auth-Token": token,
    "X-User-Id": userId,
  };

  try {
    response = await axios.post(`${BASE_URL}/method.call/sendMessage`, messageData, {
      headers,
    });
    console.log("Response:", response.data);
  } catch (error:any) {
    console.error("Error sending message:",   error.response?.data || error.message);
    throw error;
  }
});

Then("the message should be stored successfully",async () => {
  expect(response.status).toBe(200);
  const parsedMessage = JSON.parse(response.data.message);
  expect(parsedMessage.msg).toBeDefined();
 await expect(parsedMessage.result.msg).toBe(dynamicMessage);
  expect(parsedMessage.id).not.toBeNull();
});
