import React, { ReactNode, useState, useEffect } from "react";

export const ActiveNavbarContext = React.createContext<any>("");

type Props = {
	children: ReactNode;
};

export const ActiveNavbarContextProvider = ({ children }: Props) => {
	const [activeNavSection, setActiveNavSection] = useState("");
	const [globalSearchParameters, setGlobalSearchParameters] = useState({
		tag: "noSearch",
		title: "noSearch",
		sort: "ratingDesc",
		page: "1",
		limit: "10",
	});

	return (
		<ActiveNavbarContext.Provider
			value={{ activeNavSection, setActiveNavSection, globalSearchParameters, setGlobalSearchParameters }}
		>
			{children}
		</ActiveNavbarContext.Provider>
	);
};
