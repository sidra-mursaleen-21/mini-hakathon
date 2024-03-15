import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./style";
import CustomInput from "../../components/input";
import CustomButton from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { onValue, ref } from "firebase/database";

const Login = () => {
  const [user, setUser] = useState();
  const Navigate = useNavigate();

  const inputField = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const logIn = (e) => {
    e.preventDefault();

    const { username, email, password } = user;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onValue(ref(database, "data/"), (snapshot) => {
          const data = Object.values(snapshot.val());
          data.map((object) => {
            object.email == email && object.password == password
              ? localStorage.setItem("id", JSON.stringify(object.userId))
              : null;
          });
        });

        localStorage.setItem("login", JSON.stringify(true));
        Navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <Flex
        backgroundColor="#e8e8e8"
        align="center"
        justify="center"
        minH="100vh"
        w="100%"
      >
        <Flex wrap="wrap" justify="center" align="center" w="90%">
          <Box sx={style.loginContainer}>
            <Heading mb="30px" textTransform="capitalize">
              log in
            </Heading>
            <Flex as="form" onSubmit={logIn} direction="column" gap="20px">
              <CustomInput
                changed={(e) => inputField(e.target.id, e.target.value)}
                type="email"
                id="email"
                required={true}
                placeholder="email"
              />
              <CustomInput
                changed={(e) => inputField(e.target.id, e.target.value)}
                type="password"
                id="password"
                required={true}
                placeholder="password"
              />
              <Text>
                Don't have an account ? <Link to="/signup">SignUp</Link>
              </Text>
              <CustomButton type="submit">log in</CustomButton>
            </Flex>
          </Box>
          <Image width="500px" src="./images/image-1.png" />
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
