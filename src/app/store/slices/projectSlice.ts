import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee, Project } from "../../types/types";
import { RootState } from "../store";

interface IProjectState {
  projects: Project[];
  isPass: boolean;
  isFail: boolean;
  error: string;
}

const initialProjectState: IProjectState = {
  projects: [],
  isPass: false,
  isFail: false,
  error: "",
};

const ProjectSlice = createSlice({
  name: "Project",
  initialState: initialProjectState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      if (!state.projects.find((proj) => proj.name === action.payload.name)) {
        state.projects.push({
          id: String(Math.floor(Math.random() * 10000)),
          name: action.payload.name,
          description: action.payload.description,
          employees: [],
        });
        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "Project already exist";
      }
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      let idx = state.projects.findIndex(
        (proj) => proj.id === action.payload.id
      );

      if (idx !== -1) {
        const project = state.projects[idx];

        state.projects[idx] = {
          ...project,
          name: action.payload.name,
          description: action.payload.description,
        };

        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "Project not found";
      }
    },
    updateProjectEmployees: (state, action: PayloadAction<Project>) => {
      let idx = state.projects.findIndex(
        (proj) => proj.id === action.payload.id
      );

      if (idx !== -1) {
        const project = state.projects[idx];

        state.projects[idx] = {
          ...project,
          employees: action.payload.employees ? [...action.payload.employees] : [],
        };

        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "Project not found";
      }
    },
    addRemoveEmployeeFromProjects: (state, action: PayloadAction<Employee>) => {
      const updatedEmployee = action.payload;

      state.projects.forEach((proj) => {
        if (!updatedEmployee.projects?.find((p) => p.id === proj.id)) {
          proj.employees?.filter((emp) => emp.id !== updatedEmployee.id);
        }

        if (
          updatedEmployee.projects?.find((p) => p.id === proj.id) &&
          !proj.employees?.find((emp) => emp.id === updatedEmployee.id)
        ) {
          proj.employees?.push({
            id: updatedEmployee.id,
            name: updatedEmployee.name,
            email: updatedEmployee.email,
            role: updatedEmployee.role
          });
        }
      });
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects.filter((proj) => proj.id !== action.payload);
    },
  },
});

// Export the reducer methods to manipulate the state
export const {
  addProject,
  updateProject,
  updateProjectEmployees,
  addRemoveEmployeeFromProjects,
  deleteProject,
} = ProjectSlice.actions;

// Export helper methods to get state information
export const state = (state: RootState) => state.projects;

export default ProjectSlice.reducer;
