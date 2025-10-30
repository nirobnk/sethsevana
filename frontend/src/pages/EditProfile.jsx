// import React from 'react'

// function EditProfile() {
//   return (
//     <div>
//         <button onClick={onEdit}></button>
//     </div>
//   )
// }

// export default EditProfile

import React, { useState } from "react";

export const  EditProfile=({ onCancel, onSave }) =>{
  const [formData, setFormData] = useState({
    fullName: "KVC Niluminda",
    dob: "2002-11-13",
    gender: "Male",
    nic: "20021400234",
    phone: "0743256782",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <div className="space-y-4">
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 w-full"
        />
        {/* add more fields */}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

