import { createContext, useReducer, useContext } from "react";

export const rolesContext = createContext();

export const useRolesContext = () => {
  const context = useContext(rolesContext);

  if (!context) {
    throw Error("Outside of RolesContextWrap");
  }

  return context;
};

export const rolesReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY":
      return { roles: payload };
    case "CREATE":
      return { roles: [...state.roles, payload] };
    case "DELETE":
      return {
        roles: state.roles.filter(
          (permission) => permission._id !== payload._id
        ),
      };
    case "UPDATE":
      return {
        roles: state.roles.map((permission) => {
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

export const RolesContextWrap2 = ({ children }) => {
  const [state, dispatch] = useReducer(rolesReducer, { roles: null });

  // dispatch({ type: "DISPLAY", payload: null });

  return (
    <rolesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </rolesContext.Provider>
  );
};
