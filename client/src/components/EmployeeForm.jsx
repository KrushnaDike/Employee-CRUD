import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  FormLabel,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";

const EmployeeForm = ({ employee, fetchEmployees, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setEmail(employee.email || "");
      setPhone(employee.phone || "");
      setPosition(employee.position || "");
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("photo", photo);
    formData.append("document", document);

    try {
      let response;
      if (employee) {
        response = await axios.put(
          `http://localhost:2000/api/v1/employee/editEmployee/${employee.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:2000/api/v1/employee/createEmployee",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      fetchEmployees();
      if (onClose) {
        onClose();
      }

      //   empty all fields
      setName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setPhoto(null);
      setDocument(null);

      toast({
        title: "Employee saved.",
        description: "The employee data has been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving employee.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      maxWidth="500px"
      mx="auto"
      my={5}
    >
      <Heading as="h3" size="lg" mb={5}>
        {employee ? "Edit Employee" : "Add Employee"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Box>
          <Box>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box>
            <FormLabel>Phone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Box>
          <Box>
            <FormLabel>Position</FormLabel>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel>Photo</FormLabel>
            <Input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          </Box>
          <Box>
            <FormLabel>Document</FormLabel>
            <Input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </Box>
          <Button type="submit" colorScheme="teal">
            {employee ? "Save" : "Submit"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EmployeeForm;
