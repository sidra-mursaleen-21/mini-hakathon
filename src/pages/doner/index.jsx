import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomInput from "../../components/input";
import style from "./style";
import CustomButton from "../../components/button";
import { database } from "../../config/firebase";
import { push, ref, set, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Doner = () => {
  const [doner, setDoner] = useState();
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("id")));
 const Navigate = useNavigate()
 
  const inputField = (key, value) => {
    setDoner({ ...doner, [key]: value });
  };

  const donerDetail = () => {
    alert("you appointment has been confirmed");

    update(ref(database, `data/${userId}`), {
      role: "doner",
      ...doner,
    });

    Navigate("/dashboard")
    
  };

  return (
    <>
      <Box maxW="100%">
        <Box maxW="1440px">
          <Flex
            backgroundColor="#e8e8e8"
            align="center"
            justify="center"
            minH="100vh"
            w="100%"
          >
            <Flex wrap="wrap" justify="center" w="90%">
              <Box sx={style.container}>
                <Heading color="#a22e2b" textTransform="capitalize">
                  want to donate blood
                </Heading>
                <Flex
                  as="form"
                  onSubmit={donerDetail}
                  gap="30px"
                  mt="30px"
                  direction="column"
                >
                  <Flex gap="30px">
                    <CustomInput
                      changed={(e) => inputField(e.target.id, e.target.value)}
                      type="text"
                      id="firstName"
                      required={true}
                      placeholder="first name"
                    />
                    <CustomInput
                      type="text"
                      id="lastName"
                      changed={(e) => inputField(e.target.id, e.target.value)}
                      required={true}
                      placeholder="last name"
                    />
                  </Flex>
                  <CustomInput
                    type="number"
                    id="phone"
                    changed={(e) => inputField(e.target.id, e.target.value)}
                    required={true}
                    placeholder="phone no."
                  />
                  <CustomInput
                    type="text"
                    id="address"
                    changed={(e) => inputField(e.target.id, e.target.value)}
                    required={true}
                    placeholder="address"
                  />

                  <CustomInput
                    type="text"
                    id="disease"
                    changed={(e) => inputField(e.target.id, e.target.value)}
                    required={true}
                    placeholder="have been suffering from any disease before"
                  />
                  <CustomButton type="submit">let's donate</CustomButton>
                </Flex>
              </Box>
              <Image w="400px" h="500px" src="/images/image-4.png" />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Doner;
