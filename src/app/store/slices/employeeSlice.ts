import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, Project } from "../../types/types";
import { RootState } from "../store";

interface IEmployeeState {
  employees: Employee[];
  isPass: boolean;
  isFail: boolean;
  error: string;
}

const initialEmployeeState: IEmployeeState = {
  employees: [],
  isPass: false,
  isFail: false,
  error: "",
};

const EmployeeSlice = createSlice({
  name: "Employee",
  initialState: initialEmployeeState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      if (
        !state.employees.find(
          (emp) =>
            emp.name === action.payload.name ||
            emp.email === action.payload.email
        )
      ) {
        state.employees.push({
          id: String(Math.floor(Math.random() * 10000)),
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
          projects: [],
        });
        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "User already exist";
      }
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      let idx = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (idx !== -1) {
        const employee = state.employees[idx];

        state.employees[idx] = {
          ...employee,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };

        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "Employee not found";
      }
    },
    updateEmployeeProjects: (state, action: PayloadAction<Employee>) => {
      let idx = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (idx !== -1) {
        const employee = state.employees[idx];

        state.employees[idx] = {
          ...employee,
          projects: action.payload.projects ? [...action.payload.projects] : [],
        };

        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "Employee not found";
      }
    },
    addRemoveProjectFromEmployees: (state, action: PayloadAction<Project>) => {
      const updatedProj = action.payload;

      state.employees.forEach((emp) => {
        if (!updatedProj.employees?.find((e) => e.id === emp.id)) {
          emp.projects?.filter((proj) => proj.id !== updatedProj.id);
        }

        if(updatedProj.employees?.find((e) => e.id === emp.id) && !emp.projects?.find((proj) => proj.id === updatedProj.id)) {
         emp.projects?.push({
            id: updatedProj.id,
            name: updatedProj.name,
            description: updatedProj.description,
          })   
        }
      });
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees.filter((emp) => emp.id !== action.payload);
    },
  },
});

// Export the reducer methods to manipulate the state
export const {
  addEmployee,
  updateEmployee,
  updateEmployeeProjects,
  addRemoveProjectFromEmployees,
  deleteEmployee,
} = EmployeeSlice.actions;

// Export helper methods to get state information
export const state = (state: RootState) => state.employees;

export default EmployeeSlice.reducer;
