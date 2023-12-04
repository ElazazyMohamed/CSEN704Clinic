import React from "react";
import CreatePackageForm from "../components/createPackageForm.js";
import '../styles/packages.css'
import UpdatePackageForm from "../components/updatePackageForm.js";
import DeletePackageForm from "../components/deletePackageForm.js";
export default function packages(){

return (
    
    <main>

    <div><CreatePackageForm/></div>
    <div><UpdatePackageForm/></div>
    <div><DeletePackageForm/></div>


    </main>
)




};