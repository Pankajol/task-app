import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]')
  .setProject('[YOUR_PROJECT_ID]');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
