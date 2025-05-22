import { createContext } from "react";
import type { User } from "./interfaces/User";

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ setUser: () => {}, user: null });
