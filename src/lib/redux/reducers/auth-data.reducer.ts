import { AuthData } from "@/common/interfaces/authData.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const authDataReducer = createSlice({
  name: "auth-data",
  initialState: (typeof window !== "undefined"
    ? localStorage.getItem("auth-data")
      ? {
          ...(JSON.parse(
            localStorage.getItem("auth-data") as string,
          ) as AuthData),
        }
      : null
    : null) as AuthData | null,
  reducers: {
    setAuthData: (_state, { payload }: PayloadAction<AuthData>) => {
      _state = { ...payload };
      localStorage.setItem("auth-data", JSON.stringify(payload));
      return { ...payload };
    },
    clearAuthData: () => {
      localStorage.removeItem("auth-data");
      return null;
    },
  },
});

export default authDataReducer.reducer;

export const { setAuthData, clearAuthData } = authDataReducer.actions;
