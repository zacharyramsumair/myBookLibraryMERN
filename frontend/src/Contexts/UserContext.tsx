import React, { ReactNode, useState } from "react";

export const UserContext = React.createContext<any | null>(null);



type Props = {
	children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any | null>("finally");

	// const Mary = () => {
	// 	setUser("mary");
	// };

	

	return (
		<UserContext.Provider value={{ user}}>
		{/* <UserContext.Provider value={{ user, Mary }}> */}
			{children}
		</UserContext.Provider>
	);
};
