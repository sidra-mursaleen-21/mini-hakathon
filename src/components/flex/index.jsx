import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Customflex = ({ label, text }) => {
  return (
    <>
      <Flex
        wrap={{ base: "wrap", sm: "nowrap" }}
        w="80%"
        p="0px 10px"
        borderBottom="2px solid grey"
      >
        <Text
          sx={{
            w: "300px",
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
        <Text>{text}</Text>
      </Flex>
    </>
  );
};

export default Customflex;
