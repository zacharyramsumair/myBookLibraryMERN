import React, { ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useShowCurrentUser } from "../Hooks/Auth/useShowCurrentUser";
import axios from "axios";

export const UserContext = React.createContext<any | null>(null);

interface IUser {
	userId: string;
	name: string;
	role: "admin" | "user";
	tier: "free" | "standard" | "premium";
}

type Props = {
	children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	//   let {data, error, isLoading, isError} = useShowCurrentUser()
	//   if(data){
	// 	setUser(data.user)
	//   } else{
	// 	setUser(null)
	//   }

	const fetchUser = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(`/api/v1/auth/showCurrentUser`);
			setUser(data);
		} catch (error) {
			setUser(null);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	//   useEffect(() => {
	//     // Check if user data exists in the cookie
	//     const storedUser = Cookies.get("user");

	//     if (storedUser) {
	//       setUser(JSON.parse(storedUser));
	//     }

	//     setIsLoading(false);
	//   }, []);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};
