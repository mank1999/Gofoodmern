import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Input, Flex, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const URL = "https://gofoodmern-backend-cpmu.onrender.com";
const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const url = URL + "/api/userlogin";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const Response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          email: credentials.email,
        }),
      });
      const data = await Response.json();
      console.log("log in ", data);
      if (!data.success) {
        toast({
          title: `Invalid Creadential`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
      if (data.success) {
        sessionStorage.setItem("authToken", data?.authToken);
        sessionStorage.setItem("userEmail", credentials.email);
        sessionStorage.setItem("username", data?.UserName);
        toast({
          title: "Log in Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <Flex justifyContent="center" padding="20px 20px">
          <Text fontSize="30px" fontWeight="500" fontStyle="italic">
            Welcome to Go Food
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Text fontSize="30px" fontWeight="500" fontStyle="italic">
            Login Page
          </Text>
        </Flex>
        <Flex justifyContent="center" padding="50px 50px" gap="5px 5px">
          <Box width="800px">
            <form onSubmit={handleSubmit}>
              <div>
                <Text fontSize="15px" htmlFor="exampleInputEmail1">
                  Email address
                </Text>
                <Input
                  name="email"
                  onChange={handlevalue}
                  value={credentials.email}
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  border="1px"
                  height="40px"
                  isRequired
                />
              </div>
              <div style={{ paddingTop: "10px" }}>
                <Text fontSize="15px" htmlFor="exampleInputPassword1">
                  Password
                </Text>
                <Input
                  height="40px"
                  border="1px"
                  name="password"
                  onChange={handlevalue}
                  value={credentials.password}
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  isRequired
                />
              </div>
              <Flex
                padding="10px 50px"
                justifyContent="space-around"
                paddingTop="30px"
              >
                <Button
                  colorScheme="red"
                  variant="solid"
                  type="submit"
                  size="lg"
                >
                  Submit
                </Button>
                <Button colorScheme="teal" variant="outline" size="lg">
                  <Link to="/createuser">Register Here</Link>
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default Login;
