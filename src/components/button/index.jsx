import { Button } from "@chakra-ui/react";
import React from "react";
import style from "./style";

const CustomButton = ({ type, clicked, children, customStyle }) => {
  return (
    <>
      <Button
        variant="unstyled"
        type={type}
        onClick={clicked}
        sx={{ ...style.defaultStyle, ...customStyle }}
      >
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
