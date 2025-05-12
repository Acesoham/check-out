import React, { useState } from 'react';

const BirthCertificateForm = () => {
  // State for form values
  const [formData, setFormData] = useState({
    financialYear: '',
    childFirstName: '',
    childMiddleName: '',
    childLastName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    hospitalNameAddress: '',
    applicantFirstNameEng: '',
    applicantMiddleNameEng: '',
    applicantLastNameEng: '',
    applicantFirstNameDev: '',
    applicantMiddleNameDev: '',
    applicantLastNameDev: '',
    applicantMobileNo: '',
    noOfCopies: '',
    paymentMethod: '',
    utrNumber: ''
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle name fields auto-capitalization
    const nameFields = [
      'childFirstName', 'childMiddleName', 'childLastName',
      'fatherFirstName', 'fatherMiddleName', 'fatherLastName',
      'motherFirstName', 'motherMiddleName', 'motherLastName',
      'applicantFirstNameEng', 'applicantMiddleNameEng', 'applicantLastNameEng',
      'applicantFirstNameDev', 'applicantMiddleNameDev', 'applicantLastNameDev',
    ];
    
    if (nameFields.includes(name) && value) {
      // Capitalize first letter, rest lowercase
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle mobile number input to only allow integers
  const handleMobileInput = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // Remove all non-digit characters
    
    setFormData(prevState => ({
      ...prevState,
      applicantMobileNo: numericValue
    }));
  };

  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-10 h-10 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo */}
          <img src="/api/placeholder/40/40" alt="Ashok Stambh" />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">BIRTH CERTIFICATE APPLICATION</h1>
      </div>

      <form className="p-6">
        {/* CHILD DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">CHILD DETAILS</h2>
          
          <div className="mb-4 w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year*</label>
            <select 
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            >
              <option value="">Select Financial Year</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
              <option value="2028-2029">2028-2029</option>
            </select>
          </div>
          
          {/* Child's Name */}
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Child's First Name*</label>
              <input
                type="text"
                name="childFirstName"
                value={formData.childFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Child's Middle Name</label>
              <input
                type="text"
                name="childMiddleName"
                value={formData.childMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Child's Last Name*</label>
              <input
                type="text"
                name="childLastName"
                value={formData.childLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time of Birth*</label>
              <input
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
          </div>
        </div>

        {/* PARENTS DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PARENTS DETAILS</h2>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Father's Information</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                type="text"
                name="fatherFirstName"
                value={formData.fatherFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="fatherMiddleName"
                value={formData.fatherMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                type="text"
                name="fatherLastName"
                value={formData.fatherLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Mother's Information</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                type="text"
                name="motherFirstName"
                value={formData.motherFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="motherMiddleName"
                value={formData.motherMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                type="text"
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name / Address*</label>
            <textarea
              name="hospitalNameAddress"
              value={formData.hospitalNameAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
              placeholder="Enter hospital name and address details"
              required
            ></textarea>
          </div>
        </div>

        {/* APPLICANT DETAILS */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">APPLICANT DETAILS</h2>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Name in English</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                type="text"
                name="applicantFirstNameEng"
                value={formData.applicantFirstNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="applicantMiddleNameEng"
                value={formData.applicantMiddleNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                type="text"
                name="applicantLastNameEng"
                value={formData.applicantLastNameEng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <h3 className="text-md font-medium mb-2 text-gray-700">Name in Devnagari</h3>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="applicantFirstNameDev"
                value={formData.applicantFirstNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="applicantMiddleNameDev"
                value={formData.applicantMiddleNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                type="text"
                name="applicantLastNameDev"
                value={formData.applicantLastNameDev}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
              <input
                type="text"
                name="applicantMobileNo"
                value={formData.applicantMobileNo}
                onChange={handleMobileInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter mobile number"
                required
                maxLength={10}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Copies*</label>
              <select 
                name="noOfCopies"
                value={formData.noOfCopies}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="">Select number of copies</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        {/* PAYMENT SECTION */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-gray-600 mb-4">
            A fee of Rs 20/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={() => handleRadioChange('paymentMethod', 'upi')}
                  className="mr-2 focus:ring-blue-400"
                />
                <label htmlFor="upi">UPI</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="netbanking"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === 'netbanking'}
                  onChange={() => handleRadioChange('paymentMethod', 'netbanking')}
                  className="mr-2 focus:ring-blue-400"
                />
                <label htmlFor="netbanking">Netbanking</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => handleRadioChange('paymentMethod', 'card')}
                  className="mr-2 focus:ring-blue-400"
                />
                <label htmlFor="card">Card</label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code</label>
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-2">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
              <button
                type="button"
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Mark as Scanned
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">UTR Number</label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter UTR Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Proof</label>
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
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, PDF. Max 10 MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
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

export default BirthCertificateForm;