import { Box, Circle, Flex, Image } from "@chakra-ui/react";
import style from "./style";
import CustomButton from "../button";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { CiLogout } from "react-icons/ci";

const Appbar = () => {
  const Navigate = useNavigate();
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("id")));
  const doner = () => {
    onValue(ref(database, `data/${userId}`), (snapshot) => {
      const data = snapshot.val();
      data.role == "doner"
        ? alert("we have all your information")
        : Navigate("/doner");
    });
  };

  const logOut = () =>{
    localStorage.removeItem("id")
    localStorage.removeItem("login")
    Navigate("/")
  }

  return (
    <>
      <Box width={"100%"}>
        <Box maxW="1440px">
          <Flex sx={style.navMenu}>
            <Image w="50px" h="50px" src="./images/logo.png" />
            <Flex gap="20px">
            <CustomButton clicked={() => doner()}>
              want to donate ?
            </CustomButton>
            <CiLogout cursor="pointer" onClick={()=>logOut()} fontSize="30px" />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Appbar;
