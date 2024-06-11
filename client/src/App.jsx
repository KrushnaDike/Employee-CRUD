import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/v1/employee/getAllEmployees"
      );
       console.log(response.data.data)
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetail = () => {
    setSelectedEmployee(null);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <Box my={10}>
          <EmployeeForm fetchEmployees={fetchEmployees} />
        </Box>
        <Box my={10}>
          <EmployeeList
            employees={employees}
            handleEmployeeClick={handleEmployeeClick}
            selectedEmployee={selectedEmployee}
            handleCloseDetail={handleCloseDetail}
            fetchEmployees={fetchEmployees}
          />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default App;
