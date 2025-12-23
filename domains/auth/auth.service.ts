type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  // SIMULADO por ahora
  await new Promise((r) => setTimeout(r, 1000));

  return {
    token: "fake-jwt-token",
    user: {
      id: "1",
      email,
    },
  };
}
