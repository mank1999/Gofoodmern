import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
import LogoutModal from "./LogOutModal";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";
const Navbar = () => {
  let data = useCart();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: DisOpen,
    onOpen: DonOpen,
    onClose: Donclose,
  } = useDisclosure();
  const {
    isOpen: cartisOpen,
    onOpen: cartonOpen,
    onClose: cartClose,
  } = useDisclosure();
  const [modalView, setModalView] = useState(false);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success"
        style={{ backgroundColor: "green" }}
      >
        <div className="container-fluid ">
          <Link className="navbar-brand fs-1 fst-italic mt-2" to="/">
            GO FOOD
          </Link>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 gap-2">
              <li className="nav-item">
                <Link
                  className="text-white fs-5 mt-6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {sessionStorage.getItem("authToken") ? (
                <Link className="text-white fs-5" aria-current="page">
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>
            <div style={{ justifyContent: "right" }}>
              {!sessionStorage.getItem("authToken") ? (
                <Flex alignItems="flex-end">
                  <Link
                    className="btn bg-white text-success mx-1 fs-5"
                    to="/login"
                  >
                    LogIn
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1 fs-5"
                    aria-current="page"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </Flex>
              ) : (
                <>
                  <div
                    className="btn bg-white text-success mx-1 fs-5"
                    onClick={cartonOpen}
                  >
                    My Cart{" "}
                    <span className="badge bg-danger">{data.length}</span>
                  </div>
                  <Modal
                    isOpen={cartisOpen}
                    onClose={cartClose}
                    size="300px*300px"
                  >
                    <ModalOverlay />
                    {/* <Box height="auto" width="600px"> */}
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody>
                        <Cart />
                      </ModalBody>
                    </ModalContent>
                    {/* </Box> */}
                  </Modal>

                  <Button
                    className="btn bg-white text-danger mx-1 fs-5"
                    onClick={onOpen}
                  >
                    LogOut
                  </Button>
                  <LogoutModal isOpen={isOpen} onClose={onClose} />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
