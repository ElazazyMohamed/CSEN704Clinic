import React, { useState } from "react";

function FamilyMembersTable(props) {
  console.dir("?", props);
  const [username, setUsername] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFetchFamilyMembers = async () => {
    // Make an API request to fetch family members based on the entered username
    try {
      const response = await fetch(
        "http://localhost:4000/api/patient/getfamily/" + username,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setError("");
        setFamilyMembers(await response.json());
        console.log(familyMembers);
      } else {
        const data = await response.json();
        setError(data.error || "User NOT Found");
        setFamilyMembers([]);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      setError("An error occurred while Getting Family Members.");
    }
  };

  async function handleUnsubscribe(familyMember) {
    await fetch("http://localhost:4000/api/package/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: props.patient,
        packageType: null,
        familyNationalID: familyMember.nationalID,
        familySubscription: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setFamilyMembers((prevArray) =>
            prevArray.map((familySelected) =>
              familySelected.nationalID === familyMember.nationalID
                ? { ...familySelected, packageType: null }
                : familySelected
            )
          );
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

  return (
    <>
      <div className="input-section">
        <label>Patient UserName : </label>
        <input
          type="text"
          placeholder="Enter Patient's Username"
          value={username}
          onChange={handleInputChange}
        />
        <button className="button-78" onClick={handleFetchFamilyMembers}>
          View Family Members
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {familyMembers.length > 0 && (
        <div className="user-table">
          <h2>Family Members</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>National ID</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Relation to Patient</th>
                <th>Package Subscribed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {familyMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.nationalID}</td>
                  <td>{member.age}</td>
                  <td>{member.gender}</td>
                  <td>{member.relationToPatient}</td>
                  <td>
                    <div>
                      <h1
                        className={`${
                          member.packageType === "Platinum"
                            ? "text-teal-500"
                            : member.packageType === "Gold"
                            ? "text-yellow-600"
                            : member.packageType === "Silver"
                            ? "text-slate-500"
                            : "text-black"
                        }`}
                      >
                        {member.packageType ? member.packageType : "None"}
                      </h1>
                      {member.packageType ? (
                        <button
                          onClick={() => {
                            handleUnsubscribe(member);
                          }}
                          className="rounded-2xl bg-main hover:bg-main-hover duration-300 p-3 text-white cursor-pointer"
                        >
                          Unsubscribe
                        </button>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div
                      className="rounded-2xl bg-main hover:bg-main-hover duration-300 p-3 text-white cursor-pointer"
                      onClick={() => {
                        if (props.familySelected === member) {
                          props.handleSelect(null);
                          return;
                        }
                        props.handleSelect(member);
                      }}
                    >
                      {props.familySelected === member ? "Unselect" : "Select"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default FamilyMembersTable;
