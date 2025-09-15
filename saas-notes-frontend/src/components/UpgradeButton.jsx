import React from "react";
import axiosInstance from "../api/axiosInstance";

function UpgradeButton({ tenant, onUpgrade }) {
  const handleUpgrade = async () => {
    try {
      const res = await axiosInstance.post(`tenants/${tenant.slug}/upgrade/`);
      alert(res.data.message); // success message
      onUpgrade(); // refresh frontend
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data.warning); // show warning to non-admins
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };
  return <button onClick={handleUpgrade}>Upgrade to Pro</button>;
}

export default UpgradeButton;
