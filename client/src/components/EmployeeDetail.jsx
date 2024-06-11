import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Link,
  Button,
  VStack,
} from "@chakra-ui/react";

const EmployeeDetail = ({ employee, onClose }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" mt={5}>
      <Heading as="h3" size="md" mb={5}>
        Employee Details
      </Heading>
      <VStack spacing={3} align="start">
        <Text>
          <strong>Name:</strong> {employee.name}
        </Text>
        <Text>
          <strong>Email:</strong> {employee.email}
        </Text>
        <Text>
          <strong>Phone:</strong> {employee.phone}
        </Text>
        <Text>
          <strong>Position:</strong> {employee.position}
        </Text>
        <Box>
          <strong>Photo:</strong>
          <Image
            src={`http://localhost:2000/uploads/${employee.photo}`}
            alt="Employee Photo"
            boxSize="150px"
            objectFit="cover"
            mt={2}
          />
        </Box>
        <Box>
          <strong>Document:</strong>
          <Link
            href={`http://localhost:2000/uploads/${employee.document}`}
            isExternal
          >
            Download
          </Link>
        </Box>
        <Button colorScheme="teal" onClick={onClose}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};

export default EmployeeDetail;
