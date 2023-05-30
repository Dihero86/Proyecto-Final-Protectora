import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import { FormPet } from "./pages/formpet.jsx";

import { RegisterUser } from "./pages/registerUser.jsx";
import { LoginUser } from "./pages/loginUser.jsx";
import { AllCompanies } from "./pages/allCompanies.jsx";
import { AllVolunteers } from "./pages/allVolunteers.jsx";
import { AllAdoptionProcesses } from "./pages/allAdoptionProcesses.jsx";
import { AllUserAdoptionProcesses } from "./pages/allUserAdoptionProcesses.jsx";
import { EditUser } from "./pages/editUser.jsx";
import injectContext from "./store/appContext";
import { FormCompany } from "./pages/company.jsx";
import { EditCompany } from "./pages/editCompany.jsx";
import { FormVolunteer } from "./pages/formvolunteer.jsx";
import { AllPets } from "./pages/allpets.jsx";
import { OnePet } from "./pages/onePet.jsx";
import { Historial } from "./pages/historial.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { CompanyDashboard } from "./pages/companyDashboard.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<FormCompany />} path="/createcompany" />
            <Route element={<EditCompany />} path="/edit_company" />
            <Route element={<AllPets />} path="/pet_gallery" />
            <Route element={<FormPet />} path="/create_pet" />
            <Route element={<RegisterUser />} path="/register_user" />
            <Route element={<LoginUser />} path="/login_user" />
            <Route element={<OnePet />} path="/one_pet/:pet_id" />
            <Route element={<AllCompanies />} path="/companies" />
            <Route element={<AllVolunteers />} path="/volunteers/:company_id" />
            <Route
              element={<AllAdoptionProcesses />}
              path="/adoption_processes/:company_id"
            />
            <Route element={<AllUserAdoptionProcesses />} path="/my_profile" />
            <Route element={<Historial />} path="/historial/:pet_id" />
            <Route
              element={<FormVolunteer />}
              path="/register_volunteer/:company_id"
            />
            <Route element={<EditUser />} path="/edit_user" />
            <Route element={<CompanyDashboard />} path="/company_dashboard" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default injectContext(Layout);
