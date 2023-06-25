import {createContext, ReactNode, useContext, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {User} from "../App";
export interface AuthContext {
    user: User | null;
    login: (data: User) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({
    user: null,
    login: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    async function login(data: User) {
        setUser(data);
        navigate("/");
    }

    // call this function to sign out logged in user
    function logout() {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};