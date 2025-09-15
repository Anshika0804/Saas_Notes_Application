import React from "react";
import axiosInstance from "../api/axiosInstance";

function UpgradeButton({ tenant, onUpgrade }) {
  const handleUpgrade = async () => {
    await axiosInstance.post(`tenants/${tenant.slug}/upgrade/`);
    alert("Tenant upgraded to Pro!");
    onUpgrade(); // refresh frontend
  };

  return <button onClick={handleUpgrade}>Upgrade to Pro</button>;
}

export default UpgradeButton;
