import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonSm from "../components/ButtonSm";
import Modal from "../components/Modal";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editable, setEditable] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const seller_id = localStorage.getItem("seller_id"); // Retrieve seller_id from localStorage
    if (!seller_id) {
      setError("Seller ID not found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:4000/account", { params: { seller_id } })
      .then((response) => {
        setProfile(response.data.profile);
        setOriginalProfile(response.data.profile);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching account data:", err);
        setError("Failed to load account data.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setChangesMade(true);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditable(false);
    setChangesMade(false);
  };

  const handleSave = () => {
    const seller_id = localStorage.getItem("seller_id"); // Ensure seller_id is included in the update payload
    const formattedDate = new Date(profile.date_of_birth)
      .toISOString()
      .split("T")[0];
    const updatedProfile = {
      ...profile,
      date_of_birth: formattedDate,
      seller_id,
    };

    axios
      .post("http://localhost:4000/update-profile", updatedProfile)
      .then(() => {
        setEditable(false);
        setChangesMade(false);
        setOriginalProfile(profile);
        setShowModal(true);
      })
      .catch((err) => {
        console.error("Error saving profile:", err);
        alert("Failed to save changes.");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {profile.name}
        </h1>
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleInputChange}
              disabled={!editable}
              className="w-full rounded-md p-3 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleInputChange}
              disabled={!editable}
              className="w-full rounded-md p-3 border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Phone</label>
            <input
              type="text"
              name="phone_number"
              value={profile.phone_number || ""}
              onChange={handleInputChange}
              disabled={!editable}
              className="w-full rounded-md p-3 border border-gray-300"
            />
          </div>
          {editable ? (
            <div className="flex space-x-2 mt-4">
              <ButtonSm buttonText="Cancel" onClick={handleCancel} />
              <ButtonSm buttonText="Save" onClick={handleSave} />
            </div>
          ) : (
            <ButtonSm buttonText="Edit Profile" onClick={handleEdit} />
          )}
        </div>
        {showModal && (
          <Modal
            message="Profile updated successfully!"
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
  
}
