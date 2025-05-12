import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    financialYear: '',
    firstName: '',
    middleName: '',
    lastName: '',
    aadharNumber: '',
    mobileNumber: '',
    applicantFirstName: '',
    applicantmiddleName: '',
    applicantLastName: '',
    devnagiriFirstName: '',
    devnagiriMiddleName: '',
    devnagiriLastName: '',
    applicantaadharNumber: '',
    applicantMobileNumber: '',
    textArea1: '',
    textArea2: '',
    selectOption: '',
    financialYear: '',
    copies: '',
    radioOption: '',
    paymentMethod: '',
    utrNumber: '',
    paymentProof: '',
    date: '',
    time: ''
  });

   // State for form errors
   const [formErrors, setFormErrors] = useState({
    financialYear: '',
    firstName: '',
    middleName: '',
    lastName: '',
    applicantFirstName: '',
    applicantmiddleName: '',
    applicantLastName: '',
    aadharNumber: '',
    applicantaadharNumber: '',
    devnagiriFirstName: '',
    devnagiriMiddleName: '',
    devnagiriLastName: '',
    applicantMobileNumber: '',
    textArea1: '',
    selectOption: '',
    financialYear: '',
    copies: '',
    date: '',
    time: '',
    utrNumber: '',
    paymentProof: ''
  });


   // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Regular expression for Devanagari script
    const devanagariRegex = /^[\u0900-\u097F\s]+$/;

    if (name.startsWith('devnagiri')) {
      if (devanagariRegex.test(value) || value === '') {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));

        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'केवल देवनागरी वर्ण प्रविष्ट करा',
        }));
      }
    } else if (name === 'applicantMobileNumber' || name === 'applicantaadharNumber') {
      if (/^\d*$/.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  
  // Validate form fields
  const validateForm = () => {
    const errors: any = {};

    if (!formData.financialYear.trim()) {
      errors.financialYear = 'Please select a financial year.';
    }
    

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }
    if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
      errors.aadharNumber = 'Aadhaar Card number must be 12 digits.';
    }
    if (!formData.textArea1.trim()) {
      errors.textArea1 = 'Address is required.';
    }
    if (!formData.selectOption.trim()) {
      errors.selectOption = 'Please select a cause of death.';
    }
    if (!formData.date.trim()) {
      errors.date = 'Date of death is required.';
    }
    if (!formData.time.trim()) {
      errors.time = 'Time of death is required.';
    }
    if (!formData.applicantFirstName.trim()) {
      errors.applicantFirstName = 'First Name (English) is required.';
    }
    if (!formData.applicantLastName.trim()) {
      errors.applicantLastName = 'Last Name (English) is required.';
    }
    if (!formData.devnagiriFirstName.trim() || !/^[\u0900-\u097F\s]+$/.test(formData.devnagiriFirstName.trim())) {
      errors.devnagiriFirstName = 'Please enter the name in Marathi (Devanagari script).';
    }
    if (!formData.devnagiriLastName.trim() || !/^[\u0900-\u097F\s]+$/.test(formData.devnagiriLastName.trim())) {
      errors.devnagiriLastName = 'Please enter the name in Marathi (Devanagari script).';
    }
    
    if (!formData.applicantMobileNumber.trim() || formData.applicantMobileNumber.length !== 10) {
      errors.applicantMobileNumber = 'Mobile Number must be 10 digits.';
    }
    if (!formData.applicantaadharNumber.trim() || formData.applicantaadharNumber.length !== 12) {
      errors.applicantaadharNumber = 'Aadhaar Card Number must be 12 digits.';
    }
    if (!formData.copies || parseInt(formData.copies) <= 0) {
      errors.copies = 'Please enter a valid number greater than zero.';
    }
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Please select a payment method.';
    }
    if (!formData.utrNumber.trim()) {
      errors.utrNumber = 'UTR Number is required.';
    }
    
    if (!formData.paymentProof) {
      errors.paymentProof = 'Please upload a valid payment proof.';
    } else if (formData.paymentProof.size > 10 * 1024 * 1024) {
      errors.paymentProof = 'File size must be less than 10 MB.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      setFormErrors({}); // Clear errors on success
    } else {
      console.log('Form validation failed:', formErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo - using image directly */}
          <img src="/images/logo.png" alt="Ashok Stambh" width="500" height="700" />

        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">DEATH CERTIFICATE APPLICATION FORM</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">

      <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
  <label className="block text-sm font-medium text-white-700 mb-1">
    Financial year <span className="text-red-500">*</span>
  </label>
  <select 
    name="financialYear"
    value={formData.financialYear} // Correctly bound to the state
    onChange={handleChange} // Updates state on change
    className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
  >
    <option value="">Select Financial year</option>
    <option value="2023-24">2023-24</option>
    <option value="2024-25">2024-25</option>
    <option value="2025-26">2025-26</option>
    <option value="2026-27">2026-27</option>
    <option value="2027-28">2027-28</option>
    <option value="2028-29">2028-29</option>
    <option value="2029-30">2029-30</option>
    <option value="2030-31">2030-31</option>
    <option value="2031-32">2031-32</option>
    <option value="2032-33">2032-33</option>
  </select>
  {formErrors.financialYear && (
    <span className="text-red-500 text-xs">{formErrors.financialYear}</span>
  )}
</div>

            <div>
            </div>
          </div>
        </div>

        {/* Deceased Person's Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Deceased Person's Details</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={(event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue
          .toLowerCase()
          .replace(/\b\w/g, char => char.toUpperCase());
        setFormData(prevState => ({
          ...prevState,
          firstName: formattedValue
        }));
      }}
      
      className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
        formErrors.firstName ? 'border-red-500' : 'border-white-300'
      }`}
      placeholder="Enter First Name"
    />
    {formErrors.firstName && (
      <span className="text-red-500 text-xs">{formErrors.firstName}</span>
    )}

            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>

              <input
      type="text"
      name="middleName"
      value={formData.middleName}
      onChange={(event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
        setFormData(prevState => ({
          ...prevState,
          middleName: formattedValue
        }));
      }}
      
      
      className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
        formErrors.middleName ? 'border-red-500' : 'border-white-300'
      }`}
      placeholder="Enter Middle Name"
    />
    {formErrors.middleName && (
      <span className="text-red-500 text-xs">{formErrors.middleName}</span>
    )}
            </div>
          </div>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={(event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
        setFormData(prevState => ({
          ...prevState,
          lastName: formattedValue
        }));
      }}
      
      className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
        formErrors.lastName ? 'border-red-500' : 'border-white-300'
      }`}
      placeholder="Enter Last Name"
    />
    {formErrors.lastName && (
      <span className="text-red-500 text-xs">{formErrors.lastName}</span>
    )}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Cause of death <span className="text-red-500">*</span></label>
              <select
            name="selectOption"
            value={formData.selectOption}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              formErrors.selectOption ? 'border-red-500' : 'border-white-300'
            }`}
          >
                <option value="">Select cause of death</option>
                <option value="Natural Cause">Natural Cause</option>
                <option value="Suicide">Suicide</option>
                <option value="COVID-19">COVID-19</option>
                <option value="Accident">Accident</option>
                <option value="Old Age">Old Age</option>
                <option value="Poisoning">Poisoning</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.selectOption && (
            <span className="text-red-500 text-xs">{formErrors.selectOption}</span>
          )}
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
              
            </div>

            
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Aadhaar Card Number <span className="text-red-500">*</span></label>
              <input
  type="text"
  name="aadharNumber"
  value={formData.aadharNumber}
  onChange={(event) => {
    const inputValue = event.target.value;
    // Allow only numeric input and validate length
    if (/^\d*$/.test(inputValue) && inputValue.length <= 12) {
      setFormData(prevState => ({
        ...prevState,
        aadharNumber: inputValue
      }));
    }
  }}
  onBlur={() => {
    // Check if exactly 12 digits are entered
    if (formData.aadharNumber.length !== 12) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        aadharNumber: 'Aadhaar number must be exactly 12 digits.'
      }));
    } else {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        aadharNumber: ''
      }));
    }
  }}
  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
    formErrors.aadharNumber ? 'border-red-500' : 'border-white-300'
  }`}
  placeholder="Enter Aadhaar Card Number"
/>
{formErrors.aadharNumber && (
  <span className="text-red-500 text-xs">{formErrors.aadharNumber}</span>
)}
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
              
            </div>
          </div>

            <div className="flex flex-row flex-wrap mb-4">
              <label className="block text-sm font-medium text-white-700 mb-1">Address <span className="text-red-500">*</span></label>
              <textarea
                name="textArea1"
                value={formData.textArea1}


              onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              formErrors.textArea1 ? 'border-red-500' : 'border-white-300'
            }`}
             placeholder="Enter address "
          ></textarea>
          {formErrors.textArea1 && (
            <span className="text-red-500 text-xs">{formErrors.textArea1}</span>
          )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Date of Death <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                formErrors.time ? 'border-red-500' : 'border-white-300'
              }`}
            />
            {formErrors.time && (
              <span className="text-red-500 text-xs">{formErrors.time}</span>
            )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time of Death <span className="text-red-500">*</span></label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  formErrors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.time && (
                <span className="text-red-500 text-xs">{formErrors.time}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant Details</h2>
          <div className="flex flex-row flex-wrap mb-4">
          <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-white-700 mb-1">
        First Name (English) <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="applicantFirstName"
        value={formData.applicantFirstName}
        onChange={(event) => {
          const inputValue = event.target.value;
          // Ensure first letter is capitalized and remaining letters are lowercase
          const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
          setFormData(prevState => ({
            ...prevState,
            applicantFirstName: formattedValue
          }));
        }}
        
        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
          formErrors.firstName ? 'border-red-500' : 'border-white-300'
        }`}
        placeholder="Enter First Name"
      />
      {formErrors.firstName && (
        <span className="text-red-500 text-xs">{formErrors.firstName}</span>
      )}
    </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name (English)</label>
         <input
      type="text"
      name="applicantmiddleName"
      value={formData.applicantmiddleName}
      onChange={(event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
        setFormData(prevState => ({
          ...prevState,
          applicantmiddleName: formattedValue
        }));
      }}
      
      className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
        formErrors.applicantmiddleName ? 'border-red-500' : 'border-white-300'
      }`}
      placeholder="Enter Middle Name"
    />
    {formErrors.applicantmiddleName && (
      <span className="text-red-500 text-xs">{formErrors.applicantmiddleName}</span>
    )}
            </div>
          </div>
          <div className="flex flex-row flex-wrap mb-4">
          <div className="w-1/2 pr-2">
  <label className="block text-sm font-medium text-white-700 mb-1">
    Last Name (English) <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    name="applicantLastName"
    value={formData.applicantLastName}
    onChange={(event) => {
      const inputValue = event.target.value;
      const formattedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setFormData(prevState => ({
        ...prevState,
        applicantLastName: formattedValue
      }));
    }}
    
    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
      formErrors.applicantLastName ? 'border-red-500' : 'border-white-300'
    }`}
    placeholder="Enter Last Name"
  />
  {formErrors.applicantLastName && (
    <span className="text-red-500 text-xs">{formErrors.applicantLastName}</span>
  )}
</div>

            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
              
            </div>
            
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">First Name (Devanagari)</label>
              <input
    type="text"
    name="devnagiriFirstName"
    value={formData.devnagiriFirstName}
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
      formErrors.devnagiriFirstName ? 'border-red-500' : 'border-white-300'
    }`}
    placeholder="प्रथम नाव प्रविष्ट करा"
  />
  {formErrors.devnagiriFirstName && (
    <span className="text-red-500 text-xs">{formErrors.devnagiriFirstName}</span>
  )}
            </div>
            <div className="w-1/2 pl-2">
  <label className="block text-sm font-medium text-white-700 mb-1">Middle Name (Devanagari)</label>
  <input
    type="text"
    name="devnagiriMiddleName"
    value={formData.devnagiriMiddleName}
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
      formErrors.devnagiriMiddleName ? 'border-red-500' : 'border-white-300'
    }`}
    placeholder="मधले नाव प्रविष्ट करा"
  />
  {formErrors.devnagiriMiddleName && (
    <span className="text-red-500 text-xs">{formErrors.devnagiriMiddleName}</span>
  )}
</div>

          </div>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Last Name (Devanagari)</label>
              <input
    type="text"
    name="devnagiriLastName"
    value={formData.devnagiriLastName}
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
      formErrors.devnagiriLastName ? 'border-red-500' : 'border-white-300'
    }`}
    placeholder="आडनाव प्रविष्ट करा"
  />
  {formErrors.devnagiriLastName && (
    <span className="text-red-500 text-xs">{formErrors.devnagiriLastName}</span>
  )}
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
              
            </div>
            
          </div>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
              <input
  type="text"
  name="applicantMobileNumber"
  value={formData.applicantMobileNumber}
  onChange={(event) => {
    const inputValue = event.target.value;
    // Allow only numeric input and validate length
    if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
      setFormData(prevState => ({
        ...prevState,
        applicantMobileNumber: inputValue
      }));
    }
  }}
  onBlur={() => {
    // Check if exactly 10 digits are entered
    if (formData.applicantMobileNumber.length !== 10) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        applicantMobileNumber: 'Mobile number must be exactly 10 digits.'
      }));
    } else {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        applicantMobileNumber: ''
      }));
    }
  }}
  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
    formErrors.applicantMobileNumber ? 'border-red-500' : 'border-white-300'
  }`}
  placeholder="Enter Mobile Number"
/>
{formErrors.applicantMobileNumber && (
  <span className="text-red-500 text-xs">{formErrors.applicantMobileNumber}</span>
)}

            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Adhaar Card Number <span className="text-red-500">*</span></label>
              <input
  type="text"
  name="applicantaadharNumber"
  value={formData.applicantaadharNumber}
  onChange={(event) => {
    const inputValue = event.target.value;
    // Allow only numeric input and validate length
    if (/^\d*$/.test(inputValue) && inputValue.length <= 12) {
      setFormData(prevState => ({
        ...prevState,
        applicantaadharNumber: inputValue
      }));
    }
  }}
  onBlur={() => {
    // Check if exactly 12 digits are entered
    if (formData.applicantaadharNumber.length !== 12) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        applicantaadharNumber: 'Aadhaar number must be exactly 12 digits.'
      }));
    } else {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        applicantaadharNumber: ''
      }));
    }
  }}
  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
    formErrors.applicantaadharNumber ? 'border-red-500' : 'border-white-300'
  }`}
  placeholder="Enter Aadhaar Card Number"
/>
{formErrors.applicantaadharNumber && (
  <span className="text-red-500 text-xs">{formErrors.applicantaadharNumber}</span>
)}
            </div>
            </div>

            <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Number of copies <span className="text-red-500">*</span></label>
             

<select
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              formErrors.copies ? 'border-red-500' : 'border-white-300'
            }`}
          >
                <option value="">Select number of copies</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {formErrors.copies && (
            <span className="text-red-500 text-xs">{formErrors.copies}</span>
          )}
            </div>
            
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
              
            </div>
          </div>
          </div>
          

        {/* SECTION 4 (PAYMENT SECTION) */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-white-600 mb-4">
            A fee of Rs 15/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-white-700 mb-2">Payment Method <span className="text-red-500">*</span></label>
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
                <label htmlFor="netbanking">Netbanking </label>
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
              <label className="block text-sm font-medium text-white-700 mb-2">Scan QR Code <span className="text-red-500">*</span></label>
              <div className="w-40 h-40 border-2 border-dashed border-white-300 rounded-md flex items-center justify-center mb-2">
                <span className="text-white-400 text-xs">QR Code</span>
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
                <label className="block text-sm font-medium text-white-700 mb-1">UTR Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={(e) => {
                    setFormData(prevState => ({
                      ...prevState,
                      utrNumber: e.target.value
                    }));
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    formErrors.utrNumber ? 'border-red-500' : 'border-white-300'
                  }`}
                  placeholder="Enter UTR Number"
                />
                {formErrors.utrNumber && (
                  <span className="text-red-500 text-xs">{formErrors.utrNumber}</span>
                )}
              </div>
              <div>
  <label className="block text-sm font-medium text-white-700 mb-1">
    Payment Proof <span className="text-red-500">*</span>
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
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
        >
          <span>Upload a file <span className="text-red-500">*</span></span>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.png,.pdf"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                if (file.size > 10 * 1024 * 1024) {
                  setFormErrors(prevErrors => ({
                    ...prevErrors,
                    paymentProof: 'File size must be less than 10 MB.'
                  }));
                } else {
                  setFormData(prevState => ({
                    ...prevState,
                    paymentProof: file
                  }));
                  setFormErrors(prevErrors => ({
                    ...prevErrors,
                    paymentProof: ''
                  }));
                }
              }
            }}
            className="sr-only"
          />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs text-white-500">
        Supported formats: JPG, PNG, PDF. Max 10 MB.
      </p>
      {formErrors.paymentProof && (
        <span className="text-red-500 text-xs">{formErrors.paymentProof}</span>
      )}
    </div>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;