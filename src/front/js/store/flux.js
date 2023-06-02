const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      company: {},
      userRol: "",
    },
    actions: {
      addCompany: (company) => {
        setStore({ company: company });
      },

      deleteCompany: () => {
        setStore({ company: {} });
      },
      setUserRol: (rol) => {
        setStore({ userRol: rol });
      },
    },
  };
};

export default getState;
