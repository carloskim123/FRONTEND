import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextInterface {
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
    setAccountCreated: Dispatch<SetStateAction<boolean>>;
    accountCreated: boolean;
}

const AuthContext = createContext<AuthContextInterface>({
    auth: false,
    setAuth: () => { },
    setAccountCreated: () => { },
    accountCreated: false,
});

export default AuthContext;
