import { account } from '../appwriteConfig';

export const registerUser = async (email, password, name) => {
  try {
    const user = await account.create('unique()', email, password, name);
    return user;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error;
  }
};
