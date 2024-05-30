// src/context/authReducer.ts

export type AuthState = {
  userEmail: string | null;
};

export type AuthAction =
  | { type: "LOGIN"; payload: { email: string; token: string } }
  | { type: "LOGOUT" };

export const initialState: AuthState = {
  userEmail: localStorage.getItem("email"),
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      return { userEmail: action.payload.email };
    case "LOGOUT":
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      return { userEmail: null };
    default:
      return state;
  }
};
