import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    business: '',
    propertyNumber: '',
    propertySizeSqFt: '',
    propertySizeSqM: '',
    constructionSizeSqFt: '',
    constructionSizeSqM: '',
    numberOfFloors: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '', // Added address field
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Capitalize the first letter for specific fields
    const capitalizedValue =
      name === "firstName" || name === "middleName" || name === "lastName" || name === "address"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    // Convert the value to a number for calculations
    const numericValue = parseFloat(value);

    setFormData(prevState => {
      let updatedValues = { ...prevState, [name]: capitalizedValue };

      // Conversion logic for Property Size
      if (name === "propertySizeSqFt" && !isNaN(numericValue)) {
        updatedValues.propertySizeSqM = (numericValue * 0.092903).toFixed(2); // Convert sq.ft to sq.m
      } else if (name === "propertySizeSqM" && !isNaN(numericValue)) {
        updatedValues.propertySizeSqFt = (numericValue * 10.7639).toFixed(2); // Convert sq.m to sq.ft
      }

      // Conversion logic for Construction Size
      if (name === "constructionSizeSqFt" && !isNaN(numericValue)) {
        updatedValues.constructionSizeSqM = (numericValue * 0.092903).toFixed(2); // Convert sq.ft to sq.m
      } else if (name === "constructionSizeSqM" && !isNaN(numericValue)) {
        updatedValues.constructionSizeSqFt = (numericValue * 10.7639).toFixed(2); // Convert sq.m to sq.ft
      }

      return updatedValues;
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
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">BUILDING PERMIT</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Personal Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Personal Details</h2>
          <div className="flex flex-row flex-wrap mb-4">
            {/* First Name */}
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            {/* Middle Name */}
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            {/* Last Name */}
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>
          {/* Address */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-white-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
              placeholder="Enter Address"
              required
            ></textarea>
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Business Dropdown */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Business <span className="text-red-500">*</span>
              </label>
              <select
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="More-than-3">More than 3</option>
              </select>
            </div>

            {/* Property Number */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Property Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="propertyNumber"
                value={formData.propertyNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Property Number"
                required
              />
            </div>

            {/* Property Size (sq.ft) */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Property Size (sq.ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="propertySizeSqFt"
                value={formData.propertySizeSqFt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Property Size (sq.ft)"
                required
              />
            </div>

            {/* Property Size (sq.m) */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Property Size (sq.m) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="propertySizeSqM"
                value={formData.propertySizeSqM}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Property Size (sq.m)"
                required
              />
            </div>

            {/* Construction Size (sq.ft) */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Construction Size (sq.ft) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="constructionSizeSqFt"
                value={formData.constructionSizeSqFt}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Construction Size (sq.ft)"
                required
              />
            </div>

            {/* Construction Size (sq.m) */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Construction Size (sq.m) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="constructionSizeSqM"
                value={formData.constructionSizeSqM}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Construction Size (sq.m)"
                required
              />
            </div>

            {/* Number of Floors Dropdown */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                No. of Floors <span className="text-red-500">*</span>
              </label>
              <select
                name="numberOfFloors"
                value={formData.numberOfFloors}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="more-than-3">More than 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Upload */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Documents Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Property Documents */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Property Documents <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white-400"
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
                  <div className="flex text-sm text-white-600">
                    <label
                      htmlFor="property-documents"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="property-documents"
                        name="propertyDocuments"
                        type="file"
                        multiple
                        accept=".jpg,.png,.pdf"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">Up to 5 files, max 10 MB each</p>
                </div>
              </div>
            </div>

            {/* Plan Layout */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Plan Layout <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white-400"
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
                  <div className="flex text-sm text-white-600">
                    <label
                      htmlFor="plan-layout"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload file</span>
                      <input
                        id="plan-layout"
                        name="planLayout"
                        type="file"
                        accept=".jpg,.png,.pdf"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">1 file, max 10 MB</p>
                </div>
              </div>
            </div>

            {/* Building Plan (P-Line Site) */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Building Plan (P-Line Site) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white-400"
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
                  <div className="flex text-sm text-white-600">
                    <label
                      htmlFor="building-plan"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload file</span>
                      <input
                        id="building-plan"
                        name="buildingPlan"
                        type="file"
                        accept=".jpg,.png,.pdf"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">1 file, max 10 MB</p>
                </div>
              </div>
            </div>

            {/* Receipt of Payment of Development Fee and Labour Cess */}
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">
                Receipt of Payment of Development Fee and Labour Cess <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white-400"
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
                  <div className="flex text-sm text-white-600">
                    <label
                      htmlFor="receipt-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload file</span>
                      <input
                        id="receipt-upload"
                        name="receiptUpload"
                        type="file"
                        accept=".jpg,.png,.pdf"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">Supported formats: JPG, PNG, PDF. Max 10 MB.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
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
