import api from "../axios";

export const createEmployee = async (employeeData) => {
  const response = await api.post("/employees", employeeData);

  return response.data;
};