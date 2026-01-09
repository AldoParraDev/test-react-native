import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

export const secureStore = {
  getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
  setToken: (token) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clearToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};
