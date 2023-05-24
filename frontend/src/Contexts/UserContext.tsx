import React, { ReactNode, useState } from "react";

export const UserContext = React.createContext<any | null>(null);

interface IUser {
    userId: string;
    name: string;
    role: 'admin' | 'user';
    tier: 'free' | 'standard' | 'premium';

  }

type Props = {
	children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading, setIsLoading}}>
		{/* <UserContext.Provider value={{ user, Mary }}> */}
			{children}
		</UserContext.Provider>
	);
};
