import React, { ReactNode, useState } from "react";

export const UserContext = React.createContext<any | null>(null);



type Props = {
	children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);


  // const saveUser = (user) => {
  //   setUser(user)
  // }

  // const removeUser = () => {
  //   setUser(null)
  // }


	// const Mary = () => {
	// 	setUser("mary");
	// };

	

	return (
		<UserContext.Provider value={{ user, setUser, isLoading, setIsLoading}}>
		{/* <UserContext.Provider value={{ user, Mary }}> */}
			{children}
		</UserContext.Provider>
	);
};
