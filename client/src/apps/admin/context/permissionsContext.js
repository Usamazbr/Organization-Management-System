import { createContext, useReducer, useContext } from "react";

export const permissionsContext = createContext();

export const usePermsContext = () => {
  const context = useContext(permissionsContext);

  if (!context) {
    throw Error("Outside of PermsContextWrap");
  }

  return context;
};

export const permissionsReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY":
      return { permissions: payload };
    case "CREATE":
      return { permissions: [...state.permissions, payload] };
    case "DELETE":
      return {
        permissions: state.permissions.filter(
          (permission) => permission._id !== payload._id
        ),
      };
    case "UPDATE":
      return {
        permissions: state.permissions.map((permission) => {
          if (permission._id === payload._id) {
            return payload;
          } else {
            return permission;
          }
        }),
      };

    default:
      return state;
  }
};

export const PermsContextWrap = ({ children }) => {
  const [state, permDispatch] = useReducer(permissionsReducer, { roles: null });

  // permDispatch({ type: "DISPLAY", payload: null });

  return (
    <permissionsContext.Provider value={{ ...state, permDispatch }}>
      {children}
    </permissionsContext.Provider>
  );
};
