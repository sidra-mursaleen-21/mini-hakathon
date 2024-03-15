import React, { useEffect, useState } from "react";
import Appbar from "../../components/appbar";
import { Box, Circle, CircularProgress, Flex, Text } from "@chakra-ui/react";
import style from "./style";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { IoClose } from "react-icons/io5";
import Customflex from "../../components/flex";
import CustomButton from "../../components/button";

const Dashboard = () => {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("id")));
  const [userInformation, setUserInformation] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [doner, setDoner] = useState([]);
  const [donerInformation, setDonerInformation] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const bloodgroup = [
    {
      group: "O",
      text: "the people having blood group 'O' can donate you blood.",
      doner: ["O"],
    },
    {
      group: "A",
      text: "the people having blood group 'O' , 'A' can donate you blood .",
      doner: ["O", "A"],
    },
    {
      group: "B",
      text: "the people having blood group 'O' , 'B' can donate you blood .",
      doner: ["O", "B"],
    },
    {
      group: "AB",
      text: "the people having blood group '0' , 'A' , 'B' , 'AB' can donate you blood .",
      doner: ["O", "A", "B", "AB"],
    },
  ];

  useEffect(() => {
    onValue(ref(database, `data/${userId}`), (snapshot) => {
      setUserInformation(snapshot.val());
    });
  }, [userId]);

  useEffect(() => {
    userInformation !== undefined ? setShow(true) : setShow(false);

    onValue(ref(database, "data/"), (snapshot) => {
      setData(Object.values(snapshot.val()));
      bloodgroup.map((object) => {
        return userInformation.bloodGroup == object.group ?
         object.doner.map((bloodgroup) => {
           data.map((donerobject) => {
            return donerobject.role == "doner" &&
              donerobject.bloodGroup == bloodgroup
              ? setDoner([donerobject])
              : null;
          }); 
        }) : null
      });
    });
  }, [userInformation]);

  return (
    <>
    {console.log(doner)}
      <Appbar />
      <Flex sx={style.container}>
        {show ? (
          bloodgroup.map((object, index) => {
            return userInformation.bloodGroup == object.group ? (
              <>
                <Text sx={style.heading} key={index}>
                  Hi {userInformation.username} ! {object.text}
                </Text>
                {isOpen ? (
                  <Flex sx={style.modal}>
                    <Flex justify="end" w="80%">
                      <IoClose
                        onClick={() => setIsOpen(false)}
                        cursor="pointer"
                        fontSize="20px"
                      />
                    </Flex>
                    <Customflex label="name" text={donerInformation.username} />
                    <Customflex label="email" text={donerInformation.email} />
                    <Customflex
                      label="address"
                      text={donerInformation.address}
                    />
                    <Customflex
                      label="blood group"
                      text={donerInformation.bloodGroup}
                    />
                    <Customflex
                      label="phone no."
                      text={donerInformation.phone}
                    />
                    <Customflex
                      label="disease"
                      text={donerInformation.disease}
                    />
                  </Flex>
                ) : (
                  <Box sx={style.donerContainer}>
                    {doner.map((object) => {
                      return (
                        <>
                          <Flex
                            onClick={() => {
                              setDonerInformation(object), setIsOpen(true);
                            }}
                            sx={style.doner}
                          >
                            <Circle sx={style.circle}>
                              {object.bloodGroup}
                            </Circle>
                            <Box>
                              <Text fontWeight="bold">{object.username}</Text>
                              <Text>{object.address}</Text>
                              <Text color="#a22e2b">{object.phone}</Text>
                            </Box>
                          </Flex>
                        </>
                      );
                    })}
                  </Box>
                )}
              </>
            ) : null;
          })
        ) : (
          <CircularProgress isIndeterminate color="#8d99ae" />
        )}
      </Flex>
    </>
  );
};

export default Dashboard;
