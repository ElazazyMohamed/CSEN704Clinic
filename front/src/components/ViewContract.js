import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewContract({ doctorId, clinicId }) {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/doctor/contract/${doctorId}/${clinicId}`)
      .then((response) => setContract(response.data))
      .catch((error) => console.error("Error fetching contract:", error));
  }, [doctorId, clinicId]);

  if (!contract) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employment Contract</h2>
      <p>{contract.contractText}</p>
      <button>
        Accept Contract
      </button>
    </div>
  );
}

export default ViewContract;
