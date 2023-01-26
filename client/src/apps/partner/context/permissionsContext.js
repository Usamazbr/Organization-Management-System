import { createContext, useReducer, useContext } from "react";

export const permissionsContext = createContext();

export const useAllowedPermsContext = () => {
  const context = useContext(permissionsContext);

  if (!context) {
    throw Error("Outside of AllowedPermsContextWrap");
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

export const AllowedPermsContextWrap = ({ children }) => {
  const [state, allowedPermDispatch] = useReducer(permissionsReducer, {
    roles: null,
  });

  // allowedPermDispatch({ type: "DISPLAY", payload: null });

  return (
    <permissionsContext.Provider value={{ ...state, allowedPermDispatch }}>
      {children}
    </permissionsContext.Provider>
  );
};
