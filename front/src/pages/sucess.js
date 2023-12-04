import { useEffect } from "react";
import {useParams} from 'react-router-dom';

export default function Success(){
    const {patient, packageType , familyNationalID, familySubscription } = useParams();
    const handleFetch = async () => {
        if (familySubscription) {
            await fetch("http://localhost:4000/api/patient/payment-package", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                patient: patient,
                packageType: packageType,
                familyNationalID: familyNationalID,
                familySubscription: true,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  
                  return response.json();
                } else {
                  throw new Error("Failed to subscribe to package");
                }
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            await fetch("http://localhost:4000/api/patient/payment-package", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                packageType: packageType,
                patient: patient,
                familyNationalID: null,
                familySubscription: false,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Failed to subscribe to package");
                }
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
      }

    useEffect(() => {
        // Fetch user's appointments from your backend API
        handleFetch();
      }
        ,);
    return(
        <div>
            <h1>Success</h1>
        </div>
    )
}