import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('671fb557000d9ca78a61');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// const usersinfo = databases.getCollection('67253d620007d209c150', '67253d89002f8c6f2950');

export { client, account, databases, storage};
