import React, { useState } from 'react';

interface FormData {
  // Basic Details
  financialYear: string;
  firstName: string;
  middleName: string;
  lastName: string;
  aadhaarNumber: string;

  // Property Details
  villageName: string;
  wardNo: string;
  streetName: string;
  propertyNo: string;

  // Applicant Details (English)
  applicantFirstName: string;
  applicantMiddleName: string;
  applicantLastName: string;

  // Applicant Details (Devnagari)
  applicantFirstNameDev: string;
  applicantMiddleNameDev: string;
  applicantLastNameDev: string;

  // Contact Details
  phoneNumber: string;
  aadhaarCardNoContact: string;
  noOfCopies: string;

  // Payment Details
  paymentMethod: string;
  utrNumber: string;
  paymentProof: File | null;
}

interface Errors {
  [key: string]: string;
}

const CertificateofNoPendingDues: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState<FormData>({
    // Basic Details
    financialYear: '',
    firstName: '',
    middleName: '',
    lastName: '',
    aadhaarNumber: '',

    // Property Details
    villageName: '',
    wardNo: '',
    streetName: '',
    propertyNo: '',

    // Applicant Details (English)
    applicantFirstName: '',
    applicantMiddleName: '',
    applicantLastName: '',

    // Applicant Details (Devnagari)
    applicantFirstNameDev: '',
    applicantMiddleNameDev: '',
    applicantLastNameDev: '',

    // Contact Details
    phoneNumber: '',
    aadhaarCardNoContact: '',
    noOfCopies: '',

    // Payment Details
    paymentMethod: '',
    utrNumber: '',
    paymentProof: null,
  });

  // State for tracking validation errors
  const [errors, setErrors] = useState<Errors>({});

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (value: string): string => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  // Function to allow only Devnagari characters
  const allowOnlyDevnagari = (value: string): string => {
    return value.replace(/[^ऀ-ॿ\s]/g, ''); // Regex for Devanagari script (Marathi uses Devanagari)
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'applicantFirstNameDev' || name === 'applicantMiddleNameDev' || name === 'applicantLastNameDev') {
      setFormData(prevState => ({
        ...prevState,
        [name]: allowOnlyDevnagari(value)
      }));
    } else if (name === 'firstName' || name === 'middleName' || name === 'lastName' || name === 'applicantFirstName' || name === 'applicantMiddleName' || name === 'applicantLastName') {
      setFormData(prevState => ({
        ...prevState,
        [name]: capitalizeFirstLetter(value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    // Clear any existing error for this field
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  // Handle radio button changes
  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear any existing error for this field
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        paymentProof: e.target.files[0],
      }));
      setErrors(prevErrors => ({ ...prevErrors, 'paymentProof': '' }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Errors = {};

    // Basic Details
    if (!formData.financialYear) {
      newErrors.financialYear = 'Financial Year is required';
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = 'Property owner\'s First Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.firstName)) {
      newErrors.firstName = 'Only char, First char should be capital, other small';
      isValid = false;
    }
    if (formData.middleName && !/^[A-Z][a-z]*$/.test(formData.middleName)) {
      newErrors.middleName = 'Only char, First char should be capital, other small';
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Property owner\'s Last Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.lastName)) {
      newErrors.lastName = 'Only char, First char should be capital, other small';
      isValid = false;
    }
    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar Card No is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Only 12 digits allowed';
      isValid = false;
    }

    // Property Details
    if (!formData.villageName) {
      newErrors.villageName = 'Village Name is required';
      isValid = false;
    }
    if (!formData.wardNo) {
      newErrors.wardNo = 'Ward No is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.wardNo)) {
      newErrors.wardNo = 'Ward No should be a number';
      isValid = false;
    }
    if (!formData.streetName) {
      newErrors.streetName = 'Street Name/Street No. is required';
      isValid = false;
    }
    if (!formData.propertyNo) {
      newErrors.propertyNo = 'Property No is required';
      isValid = false;
    }

    // Applicant Details (English)
    if (!formData.applicantFirstName) {
      newErrors.applicantFirstName = 'Applicant First Name (English) is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.applicantFirstName)) {
      newErrors.applicantFirstName = 'Only char, First char should be capital, other small';
      isValid = false;
    }
    if (formData.applicantMiddleName && !/^[A-Z][a-z]*$/.test(formData.applicantMiddleName)) {
      newErrors.applicantMiddleName = 'Only char, First char should be capital, other small';
      isValid = false;
    }
    if (!formData.applicantLastName) {
      newErrors.applicantLastName = 'Applicant Last Name (English) is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.applicantLastName)) {
      newErrors.applicantLastName = 'Only char, First char should be capital, other small';
      isValid = false;
    }

    // Applicant Details (Devnagari)
    if (!formData.applicantFirstNameDev) {
      newErrors.applicantFirstNameDev = 'Applicant First Name (Devnagiri) is required';
      isValid = false;
    } else if (!/^[\u0900-\u097F\s]+$/.test(formData.applicantFirstNameDev)) {
      newErrors.applicantFirstNameDev = 'Must be in Devnagari';
      isValid = false;
    }
    if (formData.applicantMiddleNameDev && !/^[\u0900-\u097F\s]+$/.test(formData.applicantMiddleNameDev)) {
      newErrors.applicantMiddleNameDev = 'Must be in Devnagari';
      isValid = false;
    }
    if (!formData.applicantLastNameDev) {
      newErrors.applicantLastNameDev = 'Applicant Last Name (Devnagiri) is required';
      isValid = false;
    } else if (!/^[\u0900-\u097F\s]+$/.test(formData.applicantLastNameDev)) {
      newErrors.applicantLastNameDev = 'Must be in Devnagari';
      isValid = false;
    }

    // Contact Details
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Mobile no. is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Should be 10 digit no';
      isValid = false;
    }
    if (!formData.aadhaarCardNoContact) {
      newErrors.aadhaarCardNoContact = 'Aadhaar Card no. is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.aadhaarCardNoContact)) {
      newErrors.aadhaarCardNoContact = 'Should be 12 digits';
      isValid = false;
    }

    // Certificate Details
    if (!formData.noOfCopies) {
      newErrors.noOfCopies = 'Number of Copies is required';
      isValid = false;
    } else if (!/^\d+$/.test(formData.noOfCopies) || parseInt(formData.noOfCopies) < 1) {
      newErrors.noOfCopies = 'Please select a valid number of copies';
      isValid = false;
    }

    // Payment Section
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment Method is required';
      isValid = false;
    }
    if (!formData.utrNumber) {
      newErrors.utrNumber = 'UTR no of the payment made is required';
      isValid = false;
    }
    if (!formData.paymentProof) {
      newErrors.paymentProof = 'Payment proof is required';
      isValid = false;
    } else if (formData.paymentProof && formData.paymentProof.size > 10 * 1024 * 1024) {
      newErrors.paymentProof = 'Upload 1 supported file. Max 10 MB.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add your submission logic here
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo */}
          <img src="/images/logo.png" alt="Ashok Stambh" width={500} height={700} />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">CERTIFICATE OF NO PENDING DUES</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1 - Basic Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Basic Details</h2>

          {/* Financial Year Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year <span className="text-red-500">*</span></label>
              <select
                name="financialYear"
                value={formData.financialYear}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.financialYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
              >
                <option value="">Select Financial Year</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
              {errors.financialYear && <p className="text-red-500 text-xs italic">{errors.financialYear}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2 - Property Owner's Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Owner's Details</h2>

          {/* First Name and Middle Name on the first row */}
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter First Name"
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.middleName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Middle Name"
              />
              {errors.middleName && <p className="text-red-500 text-xs italic">{errors.middleName}</p>}
            </div>
          </div>

          {/* Last Name and Aadhaar Card Number on the second row */}
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="aadhaarNumber"
                maxLength={12}
                value={formData.aadhaarNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}placeholder="Enter Aadhaar Card Number"
                />
                {errors.aadhaarNumber && <p className="text-red-500 text-xs italic">{errors.aadhaarNumber}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 3 - Property Details */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Details</h2>
  
            {/* Village Name, Ward No, Street Name/Street No, Property No */}
            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Village Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="villageName"
                  value={formData.villageName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.villageName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Village Name"
                />
                {errors.villageName && <p className="text-red-500 text-xs italic">{errors.villageName}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ward No <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.wardNo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Ward No"
                />
                {errors.wardNo && <p className="text-red-500 text-xs italic">{errors.wardNo}</p>}
              </div>
            </div>
  
            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Name/Street No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.streetName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Street Name/Street No."
                />
                {errors.streetName && <p className="text-red-500 text-xs italic">{errors.streetName}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property No <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="propertyNo"
                  value={formData.propertyNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.propertyNo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Property No"
                />
                {errors.propertyNo && <p className="text-red-500 text-xs italic">{errors.propertyNo}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 4 - Applicant Details (English) */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant Details (English)</h2>
  
            {/* Applicant's First Name and Middle Name in the first row */}
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="applicantFirstName"
                  value={formData.applicantFirstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantFirstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter First Name"
                />
                {errors.applicantFirstName && <p className="text-red-500 text-xs italic">{errors.applicantFirstName}</p>}
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="applicantMiddleName"
                  value={formData.applicantMiddleName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantMiddleName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Middle Name"
                />
                {errors.applicantMiddleName && <p className="text-red-500 text-xs italic">{errors.applicantMiddleName}</p>}
              </div>
            </div>
  
            {/* Applicant's Last Name */}
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="applicantLastName"
                  value={formData.applicantLastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantLastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Last Name"
                />
                {errors.applicantLastName && <p className="text-red-500 text-xs italic">{errors.applicantLastName}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 5 - Applicant Details (Devnagiri) */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant Details (Devnagiri)</h2>
  
            {/* Applicant's First Name and Middle Name in the first row */}
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="applicantFirstNameDev"
                  value={formData.applicantFirstNameDev}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantFirstNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter First Name"
                />
                {errors.applicantFirstNameDev && <p className="text-red-500 text-xs italic">{errors.applicantFirstNameDev}</p>}
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle name</label>
                <input
                  type="text"
                  name="applicantMiddleNameDev"
                  value={formData.applicantMiddleNameDev}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantMiddleNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Middle Name"
                />
                {errors.applicantMiddleNameDev && <p className="text-red-500 text-xs italic">{errors.applicantMiddleNameDev}</p>}
              </div>
            </div>
  
            {/* Applicant's Last Name  */}
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="applicantLastNameDev"
                  value={formData.applicantLastNameDev}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.applicantLastNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Last Name"
                />
                {errors.applicantLastNameDev && <p className="text-red-500 text-xs italic">{errors.applicantLastNameDev}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 6 - Contact Details*/}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Contact Details</h2>
  
            {/* Applicant's First Name and Middle Name in the first row */}
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Mobile no."
                  maxLength={10}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Details <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="aadhaarCardNoContact"
                  value={formData.aadhaarCardNoContact}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.aadhaarCardNoContact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Aadhaar Card no."
                  maxLength={12}
                />
                {errors.aadhaarCardNoContact && <p className="text-red-500 text-xs italic">{errors.aadhaarCardNoContact}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 7 - Copies and Payment */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Certificate Details</h2>
  
            <div className="flex flex-row flex-wrap mb-4">
              {/* Number of Copies */}
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Copies <span className="text-red-500">*</span></label>
                <select
                  name="noOfCopies"
                  value={formData.noOfCopies}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.noOfCopies ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                >
                  <option value="">Select</option>
                  <option value="1">1 </option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                  <option value="5">5 </option>
                </select>
                {errors.noOfCopies && <p className="text-red-500 text-xs italic">{errors.noOfCopies}</p>}
              </div>
            </div>
          </div>
  
          {/* SECTION 8 (PAYMENT SECTION) */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
            <p className="text-sm text-gray-600 mb-4">
              A fee of Rs 15/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
            </p>
  
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method <span className="text-red-500">*</span></label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={() => handleRadioChange('paymentMethod', 'upi')}
                    className={`mr-2 focus:ring-blue-400 ${errors.paymentMethod ? 'border-red-500' : ''}`}
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
                    className={`mr-2 focus:ring-blue-400 ${errors.paymentMethod ? 'border-red-500' : ''}`}
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
                    className={`mr-2 focus:ring-blue-400 ${errors.paymentMethod ? 'border-red-500' : ''}`}
                  />
                  <label htmlFor="card">Card</label>
                </div>
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-xs italic">{errors.paymentMethod}</p>}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">UTR Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.utrNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter UTR Number"
                />
                {errors.utrNumber && <p className="text-red-500 text-xs italic">{errors.utrNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Proof <span className="text-red-500">*</span></label>
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
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, PDF. Max 10 MB.
                    </p>
                  </div>
                </div>
                {errors.paymentProof && <p className="text-red-500 text-xs italic">{errors.paymentProof}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateofNoPendingDues;