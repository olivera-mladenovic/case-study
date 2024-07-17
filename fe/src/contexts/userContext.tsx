import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RegistratedUser, UserContextData } from '../models';

const UserContext = createContext<UserContextData | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<RegistratedUser | null>(null);

    const loginUser = (user: RegistratedUser) => {
        setUser(user);
        window.localStorage.setItem('token', user.token);
    };

    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserProvider, useUser };