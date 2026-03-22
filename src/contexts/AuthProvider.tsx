import { createContext, useContext, useReducer } from "react";
import api, { setAuthToken } from "../api/api";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// user signs up with this data
type UserSignUpData = {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessLogo?: string;
  ownerFullname: string;
  ownerUsername: string;
  ownerEmail: string;
  ownerPassword: string;
  ownerPhone: string;
};

interface DecodedToken {
  id: string;
  email: string;
  roleName: string;
  businessId: string;
  permissions: string[];
  exp: number;
}

// user logs in with this data
type UserLogInData = {
  email: string;
  password: string;
};

// user sends a data with this
interface otpInput {
  email: string;
  otp: string;
}

// result of when the user logs in
interface UserData {
  id: string;
  fullName: string;
  email: string;
  username: string;
  permissions: string[];
  roleName: string;
}

interface Business {
  businessName: string;
  businessEmail: string;
}

interface Owner {
  email: string;
  fullname: string;
  username: string;
}

// result of when the user signs
interface UserSignedUpData {
  business: Business;
  owner: Owner;
}

type AuthState = {
  userData: UserData | null;
  userSignedUpData: UserSignedUpData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  success: string | null;
  error: string | null;
};

type AuthContextAction = {
  state: AuthState;
  signup: (
    data: UserSignUpData,
  ) => Promise<{ success: boolean; message: string }>;
  login: (
    data: UserLogInData,
  ) => Promise<{ success: boolean; message: string }>;
  otp: (data: otpInput) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuthStatus: () => void;
  resetLink: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (
    token: string,
    newPassword: string,
  ) => Promise<{ success: boolean; message: string }>;
};

const initialState: AuthState = {
  userData: null,
  userSignedUpData: null,
  isAuthenticated: false,
  isLoading: false,
  success: null,
  error: null,
};

type authAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SIGNED_UP"; payload: UserSignedUpData }
  | { type: "AUTH_LOGGED_IN"; payload: UserData }
  | { type: "ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: authAction) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, error: null, isLoading: true };

    case "AUTH_SIGNED_UP":
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "Sign up successful, kindly check mail for otp",
        userSignedUpData: {
          business: {
            businessName: action.payload.business?.businessName,
            businessEmail: action.payload.business?.businessEmail,
          },
          owner: {
            fullname: action.payload.owner?.fullname,
            email: action.payload.owner?.email,
            username: action.payload.owner.username,
          },
        },
      };

    case "AUTH_LOGGED_IN":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        success: "Login successful",
        userData: {
          username: action.payload.username,
          email: action.payload.email,
          fullName: action.payload.fullName,
          id: action.payload.id,
          permissions: action.payload.permissions,
          roleName: action.payload.roleName,
        },
      };

    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        userData: null,
      };

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextAction | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // check if token is expired
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        setAuthToken(null);
        return;
      }

      // token is valid → rehydrate state
      dispatch({
        type: "AUTH_LOGGED_IN",
        payload: {
          id: decoded.id,
          fullName: decoded.id,
          email: decoded.email,
          username: decoded.email,
          permissions: decoded.permissions,
          roleName: decoded.roleName,
        },
      });
    } catch {
      // token is malformed
      setAuthToken(null);
    }
  }, []);

  // user logs in
  const login = async (loginData: UserLogInData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const { token, user } = response.data.data;

      setAuthToken(token);

      

      dispatch({
        type: "AUTH_LOGGED_IN",
        payload: {
          username: user.username,
          email: user.email,
          fullName: user.fullname,
          id: user._id,
          roleName: user.role.roleName,
          permissions: user.role.permissions,
        },
      });

      return { success: true, message: "Login successful" };
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data.message || "Something went wrong"
        : "An unexpected error occurred";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // user signs up
  const signup = async (signupData: UserSignUpData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/auth/sign-up", signupData);

      dispatch({
        type: "AUTH_SIGNED_UP",
        payload: response.data,
      });
      return {
        success: true,
        message: response.data.message || "Sign up successful",
      };
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data.message || "Something went wrong"
        : "An unexpected error occurred";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // user logs out
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");

    
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error?.response?.data.message || "Something went wrong";
        dispatch({ type: "ERROR", payload: message });
      } else {
        dispatch({ type: "ERROR", payload: "An unexpected error occurred" });
      }
    }
  };

  // user fills in otp
  const otp = async (otpData: otpInput) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/auth/verify-otp", otpData);

      return {
        success: true,
        message: response.data.message || "Verification successful",
      };
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data.message || "Something went wrong"
        : "An unexpected error occurred";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // user checks auth status
  const checkAuthStatus = async () => {
    try {
      const x = 1;
      console.log(x);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error?.response?.data.message || "Something went wrong";
        dispatch({ type: "ERROR", payload: message });
      } else {
        dispatch({ type: "ERROR", payload: "An unexpected error occurred" });
      }
    }
  };

  const resetLink = async (email: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/auth/reset-link", { email });
      return {
        success: true,
        message: response.data.message || "Kindly check your mail",
      };
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data.message || "Something went wrong"
        : "An unexpected error occurred";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  // user resets password
  const resetPassword = async (token: string, newPassword: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return {
        success: true,
        message: response.data.message || "Password reset successful",
      };
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data.message || "Something went wrong"
        : "An unexpected error occurred";
      dispatch({ type: "ERROR", payload: message });
      return { success: false, message };
    }
  };

  const value: AuthContextAction = {
    state,
    login,
    signup,
    logout,
    otp,
    checkAuthStatus,
    resetLink,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Wrap the app in the auth provider");
  return context;
};
