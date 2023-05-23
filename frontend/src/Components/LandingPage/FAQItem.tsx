import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpened, setIsOpened] = useState(false);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  
  const handleToggle = () => {
    setIsOpened(!isOpened);
  };



  return (
    <Accordion
    expanded={isOpened}
    onChange={handleToggle}

    sx={isFocused && isOpened? {outline: "2px solid #e4a0f7"}: {}}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQItem;
