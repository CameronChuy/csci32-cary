// UserContext.tsx
/*import React, { createContext, ReactNode, useContext, useState } from 'react';

export type UserContextType = {
    user_id: string;
    setUser: (user_id: string) => void;
};

const UserContext = createContext<UserContextType>({
    user_id: '',
    setUser: () => {},
});

const UserProvider = async ({ children }: { children: ReactNode }) => {
    const user = "cm4bbgy5200002uto24lwggl2";
    const [user_id, setUser] = useState(user);

    return (
        <UserContext.Provider
            value={{
                user_id,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };*/
