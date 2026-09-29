import api from "../axios";

export const createEmployee = async (employeeData) => {
  const response = await api.post("/employees", employeeData);

  return response.data;
};

export const loginEmployee = async (employeeData) => {
  const response = await api.post("/employees/login", employeeData);

  return response.data;
};

export const markAttendance = async (token) => {
  const response = await api.post(
    "/attendance/day-in",{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markDayOut = async (token) => {
  const response = await api.post(
    "/attendance/day-out",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
