import { Input } from "@chakra-ui/react";
import React from "react";
import style from "./style";

const CustomInput = ({
  placeholder,
  required,
  id,
  changed,
  type,
  customStyle,
}) => {
  return (
    <>
      <Input
        variant="unstyle"
        id={id}
        required={required}
        onChange={changed}
        type={type}
        placeholder={placeholder}
        sx={{ ...style.defaultStyle, ...customStyle }}
      />
    </>
  );
};

export default CustomInput;
