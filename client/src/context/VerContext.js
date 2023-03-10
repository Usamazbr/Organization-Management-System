import { createContext, useReducer, useEffect, useContext } from "react";

const VerContext = createContext();

export const useVer = () => {
  return useContext(VerContext);
};

export const verReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { user: payload };
    // case "MEMBERS":
    //   return { user: payload[0], data: payload[1] };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const VerContextWrap = ({ children }) => {
  const [state, dispatch] = useReducer(verReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // console.log("VerContext state:", state);

  return (
    <VerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VerContext.Provider>
  );
};
