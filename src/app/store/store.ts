import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import projectReducer from "./slices/projectSlice";

// Config the persistance
const persistAuthConfig = {
  key: "Authentication",
  storage,
};
const persistEmployeeConfig = {
  key: "Employees",
  storage,
};
const persistProjectConfig = {
  key: "Projects",
  storage,
};

// PersistReducer is wrap the app’s root reducers and pass it to the persistStore function that ensures
// your redux state is stored to persisted storage whenever it changes.
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedEmployeeReducer = persistReducer(
  persistEmployeeConfig,
  employeeReducer
);

const persistedProjectReducer = persistReducer(
  persistProjectConfig,
  projectReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    employees: persistedEmployeeReducer,
    projects: persistedProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux/toolkit
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

// Inferred type: {auth: AuthState, employees: EmployeeState, projects: ProjectState}
export type RootState = ReturnType<typeof store.getState>;
