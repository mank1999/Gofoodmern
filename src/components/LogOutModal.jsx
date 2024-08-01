import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
const LogoutModal = ({ isOpen, onClose }) => {
  const handlrLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  const navigate = useNavigate();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Flex justifyContent='center' paddingTop='50px'>
                <Box height='200px' width='auto'>
                  <Text fontSize='20px'>Are You want to Logout?</Text>
                  <Flex justifyContent='space-around' paddingTop='30px'>
                    <Button onClick={handlrLogout} colorScheme="red" width='60px' height='30px'>
                      LogOut
                    </Button>
                    <Button width='60px' height='30px' colorScheme="blue" mr={3} onClick={onClose}>
                      No
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
      </Modal>
    </>
  );
};
export default LogoutModal;
