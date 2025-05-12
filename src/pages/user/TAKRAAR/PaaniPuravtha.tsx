import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    textArea1: '',
    textArea2: '',
    selectOption: '',
    radioOption: '',
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: ''
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    const capitalizeFirstLetter = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
  
    setFormData({
      ...formData,
      [name]: capitalizeFirstLetter(value)
    });
  };
  
  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo - using image directly */}
          <img src="/images/logo.png" alt="Ashok Stambh" width="500" height="700" />

        </div>
        <h1 className="text-2xl font-bold text-center flex-grow">
      WATER SUPPLY RELATED COMPLAINT
    </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1 */}
       {/* SECTION 1 */}
<div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">Personal Details</h2>
  <div className="flex flex-row flex-wrap mb-4">
    <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter First Name"
      />
    </div>
    <div className="w-1/2 pl-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Middle Name
      </label>
      <input
        type="text"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Middle Name"
      />
    </div>
  </div>

  <div className="flex flex-row flex-wrap">
    <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Last Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Last Name"
      />
    </div>

    <div className="w-full pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address<span className="text-red-500">*</span>
      </label>
      <textarea
        name="Address"
        value={formData.Address}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
        placeholder="Enter Address"
      ></textarea>
    </div>

    <div className="w-1/2 pl-2 invisible">
      {/* Empty div to maintain layout */}
    </div>
  </div>
</div>

        
        {/* SECTION 2 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">Contact Details</h2>
  
  <div className="flex flex-row flex-wrap mb-4">
    {/* Mobile Number */}
    <div className="w-1/2 pr-2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
      <input
        type="text"
        name="MobileNumber"
        value={formData.MobileNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Mobile Number"
        maxLength={10}
        pattern="[0-9]{10}"
        required
      />
    </div>

    {/* Aadhaar Card Number */}
    <div className="w-1/2 pl-2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number<span className="text-red-500">*</span></label>
      <input
        type="text"
        name="AadhaarCardNumber"
        value={formData.AadhaarCardNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Aadhaar Card Number"
        maxLength={12}
        pattern="[0-9]{12}"
        required
      />
    </div>

    {/* Property Number */}
    <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Property Number<span className="text-red-500">*</span></label>
      <input
        type="text"
        name="PropertyNumber"
        value={formData.PropertyNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Property Number"
        required
      />
    </div>
  </div>

  <div className="flex flex-row flex-wrap">
    <div className="w-1/2 pl-2 invisible">
      {/* Empty div to maintain layout */}
    </div>
  </div>
</div>

        {/* SECTION 3 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Complaint Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="w-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Complaint details including service<span className="text-red-500">*</span>
  </label>
  <textarea
    name="textArea1"
    value={formData.Complaintdetailsincludingservice}
    onChange={handleChange}
    className="w-full  px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
    placeholder="Enter Complaint here"
  ></textarea>
</div>
            
          </div>
        </div>


        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;