import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Input, Flex, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const toast = useToast();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate()
  const URL = "https://gofoodmern-backend-cpmu.onrender.com";
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const url = URL + "/api/createuser";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
          location: credentials.geolocation,
        }),
      });
      const data = await Response.json();
      if (data?.success === true) {
        toast({
          title: "User Create Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login");
      }
      if (!data.success) {
        alert("Enter valid credentials");
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
            Register Here...
          </Text>
        </Flex>
        <Flex justifyContent="center" padding="50px 50px" gap="5px 5px">
          <Box width="800px">
            <form onSubmit={handleSubmit}>
              <div>
                <Text fontSize="15px" htmlFor="exampleInputPassword1">
                  Full Name
                </Text>
                <Input
                  name="name"
                  value={credentials.name}
                  onChange={handlevalue}
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Enter Name.."
                  border="1px"
                  height="40px"
                  isRequired
                />
              </div>
              <div className="form-group" style={{ paddingTop: "5px" }}>
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
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <Text fontSize="15px" htmlFor="exampleInputPassword1">
                  Password
                </Text>
                <Input
                  name="password"
                  onChange={handlevalue}
                  value={credentials.password}
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  border="1px"
                  height="40px"
                  isRequired
                />
              </div>
              <div className="form-group">
                <Text fontSize="15px" htmlFor="exampleInputPassword1">
                  Address
                </Text>
                <Input
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={handlevalue}
                  type="text"
                  id="exampleInputPassword1"
                  placeholder=" Enter address here"
                  border="1px"
                  height="40px"
                  isRequired
                />
              </div>
              <Flex
                padding="10px 50px"
                justifyContent="space-around"
                paddingTop="30px"
              >
                <Button
                  type="submit"
                  colorScheme="red"
                  variant="solid"
                  size="lg"
                >
                 Register
                </Button>
                <Button  size="lg">
                  <Link to="/login" type="button">
                    Already have User
                  </Link>
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default SignUp;
