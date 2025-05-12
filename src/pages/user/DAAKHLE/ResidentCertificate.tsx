import React, { useState, useEffect } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    address: '',
    mobileNo: '',
    whatsappMobileNo: '',
    aadhaarCardNumber: '',
    business: '',
    fileUpload: null,
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply first letter capitalization for text inputs
    let transformedValue = value;
    if (typeof value === 'string' && 
        ['firstName', 'middleName', 'lastName', 'fatherFirstName', 'fatherMiddleName', 'fatherLastName'].includes(name)) {
      transformedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    // For mobile numbers (digits only, exactly 10 digits)
  if (name === 'mobileNo' || name === 'whatsappMobileNo') {
    // Allow only digits and limit to 10 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: digitsOnly
    }));
    
    // Validation
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Only digits are allowed'
      }));
    } else if (value.length > 0 && value.length !== 10) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Mobile number must be exactly 10 digits'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    return;
  }
  
  // For Aadhaar number (digits only, exactly 12 digits)
  if (name === 'aadhaarCardNumber') {
    // Allow only digits and limit to 12 characters
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: digitsOnly
    }));
    
    // Validation
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Only digits are allowed'
      }));
    } else if (value.length > 0 && value.length !== 12) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Aadhaar number must be exactly 12 digits'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    return;
  }
  
    
    setFormData(prevState => ({
      ...prevState,
      [name]: transformedValue
    }));
  };
  

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        [fieldName]: e.target.files ? e.target.files[0] : null
      }));
    }
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
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">RESIDENT CERTIFICATE APPLICATION</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1: APPLICANT DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">APPLICANT DETAILS</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last name"
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
            <div className="w-1/2 pl-2">
              {/* Empty div to maintain layout */}
            </div>
          </div>
        </div>

        {/* SECTION 2: FATHER'S/HUSBAND'S DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">FATHER'S/HUSBAND'S DETAILS</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Father's/Husband's First Name"
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fatherMiddleName"
                value={formData.fatherMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Father's/Husband's Middle Name"
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="fatherLastName"
                value={formData.fatherLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Father's/Husband's Last name"
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">First char should be capital</p> */}
            </div>
            <div className="w-1/2 pl-2">
              {/* Empty div to maintain layout */}
            </div>
          </div>
        </div>

        {/* SECTION 3: CONTACT DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">CONTACT DETAILS</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Address"
                rows={3}
                required
              />
            </div>
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No. <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Mobile Number"
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Only 10 digits allowed</p>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Mobile No. <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="whatsappMobileNo"
                value={formData.whatsappMobileNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter WhatsApp Number"
                maxLength={10}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Only 10 digits allowed</p>
            </div>
          </div>
        </div>

        {/* SECTION 4: IDENTIFICATION AND BUSINESS DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">IDENTIFICATION AND BUSINESS DETAILS</h2>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="aadhaarCardNumber"
                value={formData.aadhaarCardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Aadhaar Number"
                maxLength={12}
                required
                
              />
              <p className="text-xs text-gray-500 mt-1">Only 12 digits allowed</p>
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Business <span className="text-red-500">*</span></label>
              <select 
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Select Business</option>
                <option value="1">Retail/Wholesale Store</option>
                <option value="2">IT Service</option>
                <option value="3">Agriculture</option>
                <option value="4">Manufacturing</option>
                <option value="5">Real estate</option>
                <option value="6">Transport/Logistics</option>
                <option value="7">Tailoring</option>
                <option value="8">Saloon/ Beauty parlour</option>
                <option value="9">Medical Store/ Clinic</option>
                <option value="10">Tution</option>
                <option value="11">Dairy/ Poultry</option>
                <option value="12">Travel Agency</option>
                <option value="13">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 5: FILE UPLOAD */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">FILE UPLOAD</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Applicant's Aadhar Card or Voter Card <span className="text-red-500">*</span></label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={(e) => handleFileUpload(e, 'fileUpload')}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload 1 supported file. Max 5MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setErrors(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}
