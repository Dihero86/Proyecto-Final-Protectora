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
      pet: {},
      amount: 0
    },
    actions: {
      addCompany: (company) => {
        setStore({ company: company });
      },
      addPet: (pet) => {
        setStore({ pet: pet })
      },
      setCash: (amount) => {
        setStore({ amount: amount })
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
