import React, { useState } from 'react';

const KaamMaagniArjForm: React.FC = () => {
  // State for form values based on the spreadsheet fields
  const [formData, setFormData] = useState({
    address: '',
    mobileNo: '',
    whatsappNo: '',
    workDemandDay: '',
    workRequisitionDateFrom: '',
    workRequisitionDateTo: '',
    jobCardNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    familyNumberOnJobCard: '',
    bankAccountNo: '',
    isCrecheNeeded: '',
    secondApplicantFullName: '',
    secondApplicantFirstName: '',
    secondApplicantMiddleName: '',
    secondApplicantLastName: '',
    thirdApplicantFullName: '',
    thirdApplicantFirstName: '',
    thirdApplicantMiddleName: '',
    thirdApplicantLastName: '',
    thirdLaborerBankPassbook: null,
    paymentProof: null
  });
  
  // State for validation errors
  const [errors, setErrors] = useState({
    mobileNo: '',
    whatsappNo: '',
    bankAccountNo: ''
  });

  // Helper function to capitalize first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fields that need first letter capitalization
  const fieldsToCapitalize = [
    'firstName', 
    'middleName', 
    'lastName',
    'address',
    'secondApplicantFullName',
    'secondApplicantFirstName',
    'secondApplicantMiddleName',
    'secondApplicantLastName',
    'thirdApplicantFullName',
    'thirdApplicantFirstName',
    'thirdApplicantMiddleName',
    'thirdApplicantLastName',
    'workDemandDay'
  ];

  // Validate phone number - must be exactly 10 digits
  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\d{10}$/;
    return value === '' || phoneRegex.test(value);
  };

  // Validate bank account number - must be exactly 12 digits
  const validateBankAccount = (value: string) => {
    const bankAccountRegex = /^\d{12}$/;
    return value === '' || bankAccountRegex.test(value);
  };

  // Handle form changes with validation and auto-capitalization for specified fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply validations
    if (name === 'mobileNo' || name === 'whatsappNo') {
      // Only allow digits for phone numbers
      const digitsOnly = value.replace(/\D/g, '');
      
      // Update form data with digits only
      setFormData(prevState => ({
        ...prevState,
        [name]: digitsOnly
      }));
      
      // Validate phone number and set error if invalid
      if (digitsOnly && !validatePhoneNumber(digitsOnly)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Phone number must be exactly 10 digits'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    } else if (name === 'bankAccountNo') {
      // Only allow digits for bank account
      const digitsOnly = value.replace(/\D/g, '');
      
      // Update form data with digits only
      setFormData(prevState => ({
        ...prevState,
        [name]: digitsOnly
      }));
      
      // Validate bank account number and set error if invalid
      if (digitsOnly && !validateBankAccount(digitsOnly)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Bank account number must be exactly 12 digits'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    } else if (fieldsToCapitalize.includes(name)) {
      // If this field should be capitalized, do it
      setFormData(prevState => ({
        ...prevState,
        [name]: capitalizeFirstLetter(value)
      }));
    } else {
      // Otherwise, just set the value normally
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        [name]: e.target.files ? e.target.files[0] : null
      }));
    }
  };

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for any validation errors before submission
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    // Check if required fields with validations have proper values
    const isMobileValid = formData.mobileNo && validatePhoneNumber(formData.mobileNo);
    const isBankAccountValid = formData.bankAccountNo && validateBankAccount(formData.bankAccountNo);
    
    if (hasErrors || !isMobileValid || !isBankAccountValid) {
      // Update errors for required fields
      if (!isMobileValid) {
        setErrors(prev => ({
          ...prev,
          mobileNo: 'Valid 10-digit mobile number is required'
        }));
      }
      
      if (!isBankAccountValid) {
        setErrors(prev => ({
          ...prev,
          bankAccountNo: 'Valid 12-digit bank account number is required'
        }));
      }
      
      alert('Please fix the form errors before submitting');
      return;
    }
    
    console.log('Form submitted:', formData);
    // Form submission logic would go here
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          <img src="/images/logo.png" alt="Ashok Stambh" width="500" height="700" />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">JOB REQUEST APPLICATION</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* PERSONAL DETAILS SECTION */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Personal Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Family Number on Job Card*</label>
              <input
                type="text"
                name="familyNumberOnJobCard"
                value={formData.familyNumberOnJobCard}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Last 4 digits"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Address (Including House No.)*</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter full address with house number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Mobile No.* (10 digits)</label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.mobileNo ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter your 10-digit mobile number"
                maxLength={10}
                required
              />
              {errors.mobileNo && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNo}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">WhatsApp Mobile No. (10 digits)</label>
              <input
                type="text"
                name="whatsappNo"
                value={formData.whatsappNo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.whatsappNo ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter WhatsApp number (if different)"
                maxLength={10}
              />
              {errors.whatsappNo && (
                <p className="mt-1 text-sm text-red-600">{errors.whatsappNo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Work Demand Day*</label>
              <input
                type="text"
                name="workDemandDay"
                value={formData.workDemandDay}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Specify the work demand day"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Work Requisition Date (From-To)*</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="workRequisitionDateFrom"
                  value={formData.workRequisitionDateFrom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
                <input
                  type="date"
                  name="workRequisitionDateTo"
                  value={formData.workRequisitionDateTo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Job Card Number*</label>
              <input
                type="text"
                name="jobCardNumber"
                value={formData.jobCardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="State-District-Taluka-Gram Panchayat-Village-Family"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Bank Account No.* (12 digits)</label>
              <input
                type="text"
                name="bankAccountNo"
                value={formData.bankAccountNo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.bankAccountNo ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter 12-digit bank account number"
                maxLength={12}
                required
              />
              {errors.bankAccountNo && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccountNo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Is a crèche needed at work?</label>
              <div className="space-x-4 flex items-center mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="crecheYes"
                    name="isCrecheNeeded"
                    value="yes"
                    checked={formData.isCrecheNeeded === 'yes'}
                    onChange={() => handleRadioChange('isCrecheNeeded', 'yes')}
                    className="mr-2 focus:ring-blue-400"
                  />
                  <label htmlFor="crecheYes">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="crecheNo"
                    name="isCrecheNeeded"
                    value="no"
                    checked={formData.isCrecheNeeded === 'no'}
                    onChange={() => handleRadioChange('isCrecheNeeded', 'no')}
                    className="mr-2 focus:ring-blue-400"
                  />
                  <label htmlFor="crecheNo">No</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND APPLICANT DETAILS */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Second Applicant Details</h2>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">First Name</label>
              <input
                type="text"
                name="secondApplicantFirstName"
                value={formData.secondApplicantFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="secondApplicantMiddleName"
                value={formData.secondApplicantMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Last Name</label>
              <input
                type="text"
                name="secondApplicantLastName"
                value={formData.secondApplicantLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
            <div className="invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>
        </div>

        {/* THIRD APPLICANT DETAILS */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Third Applicant Details</h2>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">First Name</label>
              <input
                type="text"
                name="thirdApplicantFirstName"
                value={formData.thirdApplicantFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="thirdApplicantMiddleName"
                value={formData.thirdApplicantMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Last Name</label>
              <input
                type="text"
                name="thirdApplicantLastName"
                value={formData.thirdApplicantLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="First character will be capitalized"
              />
            </div>
            <div className="invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>
        </div>

        {/* DOCUMENT UPLOAD SECTION */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Document Upload</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Bank Passbook of the Third Laborer</label>
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
                      htmlFor="third-laborer-passbook"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="third-laborer-passbook" 
                        name="thirdLaborerBankPassbook" 
                        type="file" 
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, 'thirdLaborerBankPassbook')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">
                    Upload 1 supported file. Max 10 MB.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Payment Proof</label>
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
                      htmlFor="payment-proof"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="payment-proof" 
                        name="paymentProof" 
                        type="file" 
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, 'paymentProof')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white-500">
                    Upload 1 supported file. Max 10 MB.
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

export default KaamMaagniArjForm;