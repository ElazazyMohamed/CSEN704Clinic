import React from "react";
import { useEffect, useState } from "react";
import FamilyMembersTable from "../components/familymemberstable";


export default function PatientPackages() {
  const [packages, setPackages] = useState<Array<Package>>([]);
  const [familySelected, setFamilySelected] = useState<Family>();
  const [patient, setPatient] = useState<any>(null);
  const [url,setUrl] = useState<any>(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/package/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch packages");
        }
      })
      .then((data) => {
        setPackages(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("http://localhost:4000/api/patient", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch packages");
        }
      })
      .then((data) => {
        setPatient(data[5]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSelect(familySelected: Family) {
    setFamilySelected(familySelected);
  }

  async function handleSubscribe(packageType: String | null) {
    if (familySelected) {
      await fetch("http://localhost:4000/api/patient/payment-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient: patient,
          packageType: packageType,
          familyNationalID: familySelected.nationalID,
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
          setUrl(data);
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
            setPatient((prevState) => ({
              ...prevState, // Copy the previous state
              packageType: packageType, // Update only the desired property
            }));
            return response.json();
          } else {
            throw new Error("Failed to subscribe to package");
          }
        })
        .then((data) => {
          setUrl(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <div className="my-auto">
        <FamilyMembersTable
          handleSelect={handleSelect}
          familySelected={familySelected}
          patient={patient}
        />
      </div>
      <div>
        {familySelected ? (
          <div className="flex flex-col space-y-2 w-[500px]">
            <h2 className="font-bold">{"Name: " + familySelected.name}</h2>
            <p>{"Age: " + familySelected.age}</p>
            <p>{"Gender: " + familySelected.gender}</p>
            <p>{"National ID: " + familySelected.nationalID}</p>
            <p>{"Package Type: " + familySelected.packageType}</p>
            <p>{"Relation To Patient: " + familySelected.relationToPatient}</p>
          </div>
        ) : null}
      </div>
      {patient && patient.packageType ? (
        <div className="flex justify-between">
          <h1
            className={`my-6 font-bold ${
              patient.packageType === "Platinum"
                ? "text-teal-500"
                : patient.packageType === "Gold"
                ? "text-yellow-600"
                : patient.packageType === "Silver"
                ? "text-slate-500"
                : "text-black"
            }`}
          >
            {patient.packageType}
          </h1>
          <button
            onClick={() => {
              handleSubscribe(null);
            }}
            className="rounded-2xl bg-main hover:bg-main-hover duration-300 p-3 text-white cursor-pointer"
          >
            Unsubscribe
          </button>
        </div>
      ) : null}
      {packages.map((pkg: Package) => (
        <div
          key={pkg.id}
          className={`my-5 rounded-xl text-slate-200 p-3 ${
            pkg.type === "Platinum"
              ? "bg-teal-500"
              : pkg.type === "Gold"
              ? "bg-yellow-600"
              : pkg.type === "Silver"
              ? "bg-slate-500"
              : "bg-black"
          }`}
        >
          <div className="flex flex-col space-y-2 w-[500px]">
            <h2 className="font-bold">{"Type: " + pkg.type}</h2>
            <p>{"Price :" + pkg.price}</p>
            <p>{"Clinic Discount :" + pkg.clinicDiscount}</p>
            <p>{"Pharmacy Discount :" + pkg.pharmacyDiscount}</p>
            <p>{"Family Discount :" + pkg.familyDiscount}</p>
          </div>
          <div className="flex justify-center mt-4">
          <a href="http://localhost:4000/api/patient/payment-package" className="rounded-2xl bg-main hover:bg-main-hover duration-300 p-3 text-white cursor-pointer">Pay With Stripe</a>
            <button
              onClick={() => {
                handleSubscribe(pkg.type);
              }}
              className="rounded-2xl bg-main hover:bg-main-hover duration-300 p-3 text-white cursor-pointer"
            >
              Pay with Wallet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}