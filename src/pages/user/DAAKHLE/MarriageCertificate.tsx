import React, { useState } from 'react';

interface FormData {
  // Details of Marriage
  financialYear: string;
  dateOfMarriage: string;
  marriagePlace: string;

  // Husband's Details
  husbandFirstName: string;
  husbandMiddleName: string;
  husbandLastName: string;
  husbandAadhaarCardNumber: string;

  // Wife's Details
  wifeFirstName: string;
  wifeMiddleName: string;
  wifeLastName: string;
  wifeAadhaarCardNumber: string;

  // Applicant's Details (English)
  applicantFirstNameEng: string;
  applicantMiddleNameEng: string;
  applicantLastNameEng: string;

  // Applicant's Details (Devanagari)
  applicantFirstNameDev: string;
  applicantMiddleNameDev: string;
  applicantLastNameDev: string;

  // Contact Details
  mobileNo: string;
  noOfCopies: string;

  // Payment Details
  paymentMethod: string;
  utrNumber: string;
  paymentProof: File | null;
}

interface Errors {
  [key: string]: string;
}

const MarriageCertificateApplication: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState<FormData>({
    // Details of Marriage
    financialYear: '',
    dateOfMarriage: '',
    marriagePlace: '',

    // Husband's Details
    husbandFirstName: '',
    husbandMiddleName: '',
    husbandLastName: '',
    husbandAadhaarCardNumber: '',

    // Wife's Details
    wifeFirstName: '',
    wifeMiddleName: '',
    wifeLastName: '',
    wifeAadhaarCardNumber: '',

    // Applicant's Details (English)
    applicantFirstNameEng: '',
    applicantMiddleNameEng: '',
    applicantLastNameEng: '',

    // Applicant's Details (Devanagari)
    applicantFirstNameDev: '',
    applicantMiddleNameDev: '',
    applicantLastNameDev: '',

    // Contact Details
    mobileNo: '',
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
    } else if (
      name === 'husbandFirstName' || name === 'husbandMiddleName' || name === 'husbandLastName' ||
      name === 'wifeFirstName' || name === 'wifeMiddleName' || name === 'wifeLastName' ||
      name === 'applicantFirstNameEng' || name === 'applicantMiddleNameEng' || name === 'applicantLastNameEng'
    ) {
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

    // Details of Marriage
    if (!formData.financialYear) {
      newErrors.financialYear = 'Financial Year is required';
      isValid = false;
    }
    if (!formData.dateOfMarriage) {
      newErrors.dateOfMarriage = 'Date of Marriage is required';
      isValid = false;
    }
    if (!formData.marriagePlace) {
      newErrors.marriagePlace = 'Marriage Place is required';
      isValid = false;
    }

    // Husband's Details
    if (!formData.husbandFirstName) {
      newErrors.husbandFirstName = 'Husband\'s First Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.husbandFirstName)) {
      newErrors.husbandFirstName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (formData.husbandMiddleName && !/^[A-Z][a-z]*$/.test(formData.husbandMiddleName)) {
      newErrors.husbandMiddleName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (!formData.husbandLastName) {
      newErrors.husbandLastName = 'Husband\'s Last Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.husbandLastName)) {
      newErrors.husbandLastName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (!formData.husbandAadhaarCardNumber) {
      newErrors.husbandAadhaarCardNumber = 'Husband\'s Aadhaar Card Number is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.husbandAadhaarCardNumber)) {
      newErrors.husbandAadhaarCardNumber = 'Only 12 digits allowed';
      isValid = false;
    }

    // Wife's Details
    if (!formData.wifeFirstName) {
      newErrors.wifeFirstName = 'Wife\'s First Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.wifeFirstName)) {
      newErrors.wifeFirstName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (formData.wifeMiddleName && !/^[A-Z][a-z]*$/.test(formData.wifeMiddleName)) {
      newErrors.wifeMiddleName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (!formData.wifeLastName) {
      newErrors.wifeLastName = 'Wife\'s Last Name is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.wifeLastName)) {
      newErrors.wifeLastName = 'Only char; First char should be capital, other small';
      isValid = false;
    }
    if (!formData.wifeAadhaarCardNumber) {
      newErrors.wifeAadhaarCardNumber = 'Wife\'s Aadhaar Card Number is required';
      isValid = false;
    } else if (!/^\d{12}$/.test(formData.wifeAadhaarCardNumber)) {
      newErrors.wifeAadhaarCardNumber = 'Only 12 digits allowed';
      isValid = false;
    }

    // Applicant's Details (English)
    if (!formData.applicantFirstNameEng) {
      newErrors.applicantFirstNameEng = 'Applicant\'s First Name (English) is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.applicantFirstNameEng)) {
      newErrors.applicantFirstNameEng = 'Must be in English, Only char, First char should be capital, other small';
      isValid = false;
    }
    if (formData.applicantMiddleNameEng && !/^[A-Z][a-z]*$/.test(formData.applicantMiddleNameEng)) {
      newErrors.applicantMiddleNameEng = 'Must be in English, Only char, First char should be capital, other small';
      isValid = false;
    }
    if (!formData.applicantLastNameEng) {
      newErrors.applicantLastNameEng = 'Applicant\'s Last Name (English) is required';
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(formData.applicantLastNameEng)) {
      newErrors.applicantLastNameEng = 'Must be in English, Only char, First char should be capital, other small';
      isValid = false;
    }

    // Applicant's Details (Devanagari)
    if (!formData.applicantFirstNameDev) {
      newErrors.applicantFirstNameDev = 'Applicant\'s First Name (Devanagari) is required';
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
      newErrors.applicantLastNameDev = 'Applicant\'s Last Name (Devanagari) is required';
      isValid = false;
    } else if (!/^[\u0900-\u097F\s]+$/.test(formData.applicantLastNameDev)) {
      newErrors.applicantLastNameDev = 'Must be in Devnagari';
      isValid = false;
    }

    // Contact Details
       if (!formData.mobileNo) {
          newErrors.mobileNo = 'Mobile no. is required';
            isValid = false;
           } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Only 10 digits allowed';
            isValid = false;
             }
            if (!formData.noOfCopies) {
             newErrors.noOfCopies = 'Number of Copies is required';
             isValid = false;
            } else if (!/^[1-5]$/.test(formData.noOfCopies)) {
            newErrors.noOfCopies = 'Please select a valid number of copies (1-5)';
            isValid = false;
           }

    // Payment Section
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment Method is required';
      isValid = false;
    }
    if (!formData.utrNumber) {
      newErrors.utrNumber = 'UTR Number is required';
      isValid = false;
    }
    if (!formData.paymentProof) {
      newErrors.paymentProof = 'Payment Proof is required';
      isValid = false;
    } else if (formData.paymentProof && formData.paymentProof.size > 10 * 1024 * 1024) {
      newErrors.paymentProof = 'Upload file size should be less than 10MB';
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
          <img src="/images/logo.png" alt="Ashok Stambh" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">APPLICATION FOR MARRIAGE CERTIFICATE</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1 - Details of Marriage */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Details of Marriage</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Marriage <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="dateOfMarriage"
                value={formData.dateOfMarriage}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.dateOfMarriage ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
              />
              {errors.dateOfMarriage && <p className="text-red-500 text-xs italic">{errors.dateOfMarriage}</p>}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Place <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="marriagePlace"
                value={formData.marriagePlace}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.marriagePlace ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Marriage place"
              />
              {errors.marriagePlace && <p className="text-red-500 text-xs italic">{errors.marriagePlace}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2 - Husband's Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Husband's Details</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="husbandFirstName"
                value={formData.husbandFirstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.husbandFirstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Husband's First Name"
              />
              {errors.husbandFirstName && <p className="text-red-500 text-xs italic">{errors.husbandFirstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="husbandMiddleName"
                value={formData.husbandMiddleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.husbandMiddleName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Husband's Middle Name"
              />
              {errors.husbandMiddleName && <p className="text-red-500 text-xs italic">{errors.husbandMiddleName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="husbandLastName"
                value={formData.husbandLastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.husbandLastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Husband's Last Name"
              />
              {errors.husbandLastName && <p className="text-red-500 text-xs italic">{errors.husbandLastName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="husbandAadhaarCardNumber"
                value={formData.husbandAadhaarCardNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.husbandAadhaarCardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Husband's Aadhaar Card Number"
                maxLength={12}
              />
              {errors.husbandAadhaarCardNumber && <p className="text-red-500 text-xs italic">{errors.husbandAadhaarCardNumber}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 3 - Wife's Details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Wife's Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="wifeFirstName"
                value={formData.wifeFirstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.wifeFirstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Wife's First Name"
              />
              {errors.wifeFirstName && <p className="text-red-500 text-xs italic">{errors.wifeFirstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="wifeMiddleName"
                value={formData.wifeMiddleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.wifeMiddleName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Wife's Middle Name"
              />
              {errors.wifeMiddleName && <p className="text-red-500 text-xs italic">{errors.wifeMiddleName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="wifeLastName"
                value={formData.wifeLastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.wifeLastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Wife's Last Name"
              />
              {errors.wifeLastName && <p className="text-red-500 text-xs italic">{errors.wifeLastName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="wifeAadhaarCardNumber"
                value={formData.wifeAadhaarCardNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.wifeAadhaarCardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Wife's Aadhaar Card Number"
                maxLength={12}
              />
              {errors.wifeAadhaarCardNumber && <p className="text-red-500 text-xs italic">{errors.wifeAadhaarCardNumber}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 4 - Applicant's Details (English) */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant's Details (English)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="applicantFirstNameEng"
                value={formData.applicantFirstNameEng}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantFirstNameEng ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's First Name (English)"
              />
              {errors.applicantFirstNameEng && <p className="text-red-500 text-xs italic">{errors.applicantFirstNameEng}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="applicantMiddleNameEng"
                value={formData.applicantMiddleNameEng}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantMiddleNameEng ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's Middle Name (English)"
              />
              {errors.applicantMiddleNameEng && <p className="text-red-500 text-xs italic">{errors.applicantMiddleNameEng}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="applicantLastNameEng"
                value={formData.applicantLastNameEng}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantLastNameEng ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's Last Name (English)"
              />
              {errors.applicantLastNameEng && <p className="text-red-500 text-xs italic">{errors.applicantLastNameEng}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 5 - Applicant's Details (Devanagari) */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant's Details (Devanagari)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="applicantFirstNameDev"
                value={formData.applicantFirstNameDev}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantFirstNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's First Name (Devanagari)"
              />
              {errors.applicantFirstNameDev && <p className="text-red-500 text-xs italic">{errors.applicantFirstNameDev}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="applicantMiddleNameDev"
                value={formData.applicantMiddleNameDev}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantMiddleNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's Middle Name (Devanagari)"
              />
              {errors.applicantMiddleNameDev && <p className="text-red-500 text-xs italic">{errors.applicantMiddleNameDev}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="applicantLastNameDev"
                value={formData.applicantLastNameDev}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.applicantLastNameDev ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter Applicant's Last Name (Devanagari)"
              />
              {errors.applicantLastNameDev && <p className="text-red-500 text-xs italic">{errors.applicantLastNameDev}</p>}
            </div>
          </div>
        </div>

      {/* SECTION 6 - Contact Details */}
       <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No. <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                 placeholder="Enter Mobile Number"
                maxLength={10} // Corrected attribute name
                />
              {errors.mobileNo && <p className="text-red-500 text-xs italic">{errors.mobileNo}</p>}
            </div>
            <div>
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

        {/* SECTION 7 - Payment Section */}
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
                        <input
                          id="file-upload"
                          name="paymentProof"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
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
        <div className="flex justify-center mt-6">
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

export default MarriageCertificateApplication;