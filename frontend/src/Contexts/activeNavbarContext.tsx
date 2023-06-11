import React, { ReactNode, useState, useEffect } from "react";

export const ActiveNavbarContext = React.createContext<any>("");



type Props = {
	children: ReactNode;
};

export const ActiveNavbarContextProvider = ({ children }: Props) => {
    const [activeNavSection, setActiveNavSection] = useState("");
  
    return (
      <ActiveNavbarContext.Provider value={{activeNavSection, setActiveNavSection}}>
        {children}
      </ActiveNavbarContext.Provider>
    );
  };
