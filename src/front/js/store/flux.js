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
      updateUser: (user) => {
        const store = getStore();
        const editUser = { ...store.company };
        editUser["name"] = user.name;
        editUser["lastname"] = user.lastname;
        editUser["email"] = user.email;
        console.log(editUser);
        console.log(user);
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
