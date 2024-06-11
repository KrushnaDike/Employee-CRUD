import React, { useState } from "react";
import axios from "axios";
import { Box, List, ListItem, Button, Heading, Text } from "@chakra-ui/react";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = ({
  employees,
  handleEmployeeClick,
  selectedEmployee,
  handleCloseDetail,
  fetchEmployees,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setIsEditing(true);
    setEditEmployee(employee);
  };

  const handleDeleteClick = async (employee) => {
    try {
      await axios.delete(
        `http://localhost:2000/api/v1/employee/deleteEmployee/${employee.id}`
      );
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditFormClose = () => {
    setIsEditing(false);
    setEditEmployee(null);
  };

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      maxWidth="700px"
      mx="auto"
      my={5}
    >
      <Heading as="h3" size="lg" mb={5}>
        Employee List
      </Heading>
      {isEditing ? (
        <EmployeeForm
          employee={editEmployee}
          fetchEmployees={fetchEmployees}
          onClose={handleEditFormClose}
        />
      ) : (
        <>
          <List spacing={3}>
            {employees.map((employee) => (
              <ListItem
                key={employee.id}
                p={3}
                borderWidth="1px"
                borderRadius="lg"
                d="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Text fontWeight="bold">{employee.name}</Text>
                  <Text fontSize="sm">{employee.email}</Text>
                </Box>
                <Box>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    Details
                  </Button>
                  <Button
                    colorScheme="blue"
                    ml={2}
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    ml={2}
                    onClick={() => handleDeleteClick(employee)}
                  >
                    Delete
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
          {selectedEmployee && (
            <EmployeeDetail
              employee={selectedEmployee}
              onClose={handleCloseDetail}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default EmployeeList;
