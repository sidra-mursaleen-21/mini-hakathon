import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import style from "./style";
import CustomInput from "../../components/input";
import CustomButton from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { push, ref, set } from "firebase/database";

const Signup = () => {
  const [userData, setUserData] = useState();
  const Navigate = useNavigate();

  const inputField = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const signUp = (e) => {
    e.preventDefault();

    const { username, password, email } = userData;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        push(ref(database, "data/"), userData).then((snap) => {
          console.log(snap.key);
          set(ref(database, `data/${snap.key}`), {
            ...userData,
            userId: snap.key,
          });
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem("id", JSON.stringify(snap.key));
          Navigate("/dashboard");
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <>
      <Flex
        backgroundColor="#e8e8e8"
        align="center"
        justify="center"
        minH="100vh"
      >
        <Flex
          wrap={{ base: "wrap", lg: "nowrap" }}
          justify="center"
          align="center"
          w="90%"
        >
          <Box sx={style.SignUpContainer}>
            <Heading mb="30px" textTransform="capitalize">
              sign up
            </Heading>
            <Flex as="form" onSubmit={signUp} direction="column" gap="20px">
              <CustomInput
                type="text"
                id="username"
                changed={(e) => inputField(e.target.id, e.target.value)}
                required={true}
                placeholder="username"
              />

              <CustomInput
                type="email"
                id="email"
                changed={(e) => inputField(e.target.id, e.target.value)}
                required={true}
                placeholder="email"
              />
              <CustomInput
                type="password"
                id="password"
                changed={(e) => inputField(e.target.id, e.target.value)}
                required={true}
                placeholder="password"
              />
              <CustomInput
                type="text"
                id="bloodGroup"
                changed={(e) => inputField(e.target.id, e.target.value)}
                required={true}
                placeholder="your blood group"
              />
              <Text>
                Already have an account ? <Link to="/">LogIn</Link>
              </Text>
              <CustomButton type="submit">sign up</CustomButton>
            </Flex>
          </Box>
          <Image
            w="600px"
            h="500px"
            src="./images/image-5.png"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
