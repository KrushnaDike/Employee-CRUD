import Employee from "../models/employee.js";

export const testing = (req, res, next) => {
  res.send("Server running");
};

// Create a new employee
export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;
    const photo = req.files.photo[0].filename;
    const document = req.files.document[0].filename;

    if (!name || !email || !phone || !position || !photo || !document) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      position,
      photo,
      document,
    });

    return res.status(201).json({
      success: true,
      employee,
      message: "New Employee created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all employees with pagination
export const getAllEmployees = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Employee.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        totalItems: count,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        totalPages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Edit an employee
export const editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, position } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    const updates = { name, email, phone, position };

    if (req.files && req.files.photo) {
      updates.photo = req.files.photo[0].filename;
    }
    if (req.files && req.files.document) {
      updates.document = req.files.document[0].filename;
    }

    await employee.update(updates);

    return res.status(200).json({
      success: true,
      employee,
      message: "Employee updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    await employee.destroy();

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get a single employee by ID
export const getSingleEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
