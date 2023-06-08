import React, { ReactNode } from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import FramingRightTopBand from "./FramingRightTopBand";

type Props = {
    children:ReactNode
};

const FramingRight = ({ children }:Props) => {
	return (
        <>
        {/* <FramingRightTopBand/> */}
            {children}

        </>
	);
};

export default FramingRight;
