import api from "../../shared/lib/api";

export const loginSession = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      user_name: username,
      password,
    });

    return {
      success: true,
      token: response.data.access_token,
    };
  } catch (error) {
    let message = "Error al iniciar sesión";

    if (error.response?.data?.error) {
      message = error.response.data.error;
    }

    return {
      success: false,
      error: message,
    };
  }
};
