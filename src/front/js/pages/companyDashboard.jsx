import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { companyDash } from "../service";
import "../../styles/allpets.css";
import { Petcard } from "../component/petcard.jsx";

export const CompanyDashboard = () => {
    const [pets, setPets] = useState([]);
    const [petFilter, setPetFilter] = useState([]);
    const [select, setSelect] = useState({
        city: "",
        type: "",
        size: "",
    })

    const getPets = async () => {
        const data = await companyDash();
        console.log(data)
        setPets(data.pets);
        setPetFilter(data);
    }

    useEffect(() => {
        getPets()
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="title">CompañiaX</h1>
                </div>
                <div className="companyactions">
                    <Link to="/create_pet">
                        <button >Agregar Mascota</button>
                    </Link>


                </div>
                <div className="row blue-background">
                    {pets.map((pet, index) => <Petcard key={index} pet={pet} />)}
                </div>
            </div>
        </div>
    );
};
