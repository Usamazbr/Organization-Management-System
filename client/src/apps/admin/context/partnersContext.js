import { createContext, useReducer, useContext } from "react";

export const partnersContext = createContext();

export const usePartnersContext = () => {
  const context = useContext(partnersContext);

  if (!context) {
    throw Error("Outside of PartnersContextWrap");
  }

  return context;
};

export const partnersReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY":
      return { partners: payload };
    case "CREATE":
      return { partners: [...state.partners, payload] };
    case "DELETE":
      return {
        partners: state.partners.filter(
          (partner) => partner._id !== payload._id
        ),
      };
    case "UPDATE":
      return {
        partners: state.partners.map((partner) => {
          if (partner._id === payload._id) {
            return payload;
          } else {
            return partner;
          }
        }),
      };

    default:
      return state;
  }
};

export const PartnersContextWrap = ({ children }) => {
  const [state, partnerDispatch] = useReducer(partnersReducer, {
    partners: null,
  });

  // partnerDispatch({ type: "DISPLAY", payload: null });

  return (
    <partnersContext.Provider value={{ ...state, partnerDispatch }}>
      {children}
    </partnersContext.Provider>
  );
};
