import React, { useState, useEffect } from "react";

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    whatsappNo: "",
    address: "",
    textArea1: "",
    textArea2: "",
    selectOption: "",
    radioOption: "",
    paymentMethod: "",
    utrNumber: "",
    date: "",
    time: "",

    // New fields
    casteCategory: "",
    minority: "",
    farmer: "",
    landReformBeneficiary: "",
    indiraAwasYojanaBeneficiary: "",
    aamAadmiBimaYojanaBeneficiary: "",
    nationalHealthInsuranceSchemeBeneficiary: "",
    nhisNumber: "",
    belowPovertyLine: "",
    forestRightsRecognitionAct: "",

    // First working person
    firstWorkerName: "",
    firstApplicantFirstName: "",
    firstApplicantMiddleName: "",
    firstApplicantLastName: "",
    firstApplicantRelationship: "",
    firstApplicantGender: "",
    firstApplicantAge: "",
    firstApplicantDisabled: "",

    // Second working person
    secondWorkerName: "",
    secondApplicantFirstName: "",
    secondApplicantMiddleName: "",
    secondApplicantLastName: "",

    // Third working person
    thirdWorkerName: "",
    thirdApplicantFirstName: "",
    thirdApplicantMiddleName: "",
    thirdApplicantLastName: "",
  });

  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  // List of name fields that require capitalization validation
  const nameFields = [
    "firstName",
    "middleName",
    "lastName",
    "firstWorkerName",
    "firstApplicantFirstName",
    "firstApplicantMiddleName",
    "firstApplicantLastName",
    "secondWorkerName",
    "secondApplicantFirstName",
    "secondApplicantMiddleName",
    "secondApplicantLastName",
    "thirdWorkerName",
    "thirdApplicantFirstName",
    "thirdApplicantMiddleName",
    "thirdApplicantLastName",
    "firstApplicantRelationship",
  ];

  // List of phone number fields
  const phoneFields = ["mobileNo", "whatsappNo"];

  // Validation rules
  const validateName = (name: string): boolean => {
    // Must be only characters, first character capital, rest small
    return /^[A-Z][a-z]*$/.test(name) || name === "";
  };

  const validatePhone = (phone: string): boolean => {
    // Must be exactly 10 digits
    return /^\d{10}$/.test(phone) || phone === "";
  };

  const validateFileSize = (file: File): boolean => {
    // Max file size is 10MB
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    return file.size <= maxSize;
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // For debug - log select field changes
    if (e.target.tagName === 'SELECT') {
      console.log(`Select field ${name} changed to: ${value}`);
    }

    // Apply validation based on field type
    if (nameFields.includes(name)) {
      // For name fields, we'll enforce proper capitalization on input
      let validValue = value;
      if (value.length === 1) {
        validValue = value.toUpperCase(); // Capitalize first letter
      } else if (value.length > 1) {
        validValue =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }

      setFormData((prevState) => ({
        ...prevState,
        [name]: validValue,
      }));

      // Validate the name format
      if (value && !validateName(validValue)) {
        setErrors((prev) => ({
          ...prev,
          [name]:
            "Only characters allowed. First letter should be capital, others lowercase.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else if (phoneFields.includes(name)) {
      // Allow only digits in phone fields
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prevState) => ({
        ...prevState,
        [name]: sanitizedValue,
      }));

      // Validate phone number
      if (sanitizedValue && !validatePhone(sanitizedValue)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Phone number must be exactly 10 digits.",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    } else {
      // For other fields, no special validation
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Validate file size
      if (!validateFileSize(file)) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "File size should not exceed 10MB.",
        }));
      } else {
        setFileErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required name fields
    nameFields.forEach((field) => {
      if (
        formData[field as keyof typeof formData] &&
        !validateName(formData[field as keyof typeof formData] as string)
      ) {
        newErrors[field] =
          "Only characters allowed. First letter should be capital, others lowercase.";
      }
    });

    // Validate required phone fields
    phoneFields.forEach((field) => {
      if (
        formData[field as keyof typeof formData] &&
        !validatePhone(formData[field as keyof typeof formData] as string)
      ) {
        newErrors[field] = "Phone number must be exactly 10 digits.";
      }
    });

    setErrors(newErrors);

    // Check if we have any errors
    return (
      Object.keys(newErrors).length === 0 &&
      Object.keys(fileErrors).length === 0
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Submit the form data to your backend here
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting the form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo - using image directly */}
          <img
            src="/images/logo.png"
            alt="Ashok Stambh"
            width="500"
            height="700"
          />
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">
          JOB CARD MAAGNI ARJ
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Applicant details */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Applicant Details
          </h2>

          {/* Basic Details */}
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Head of the family first Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.middleName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Head of the family Middle Name"
              />
              {errors.middleName && (
                <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>
              )}
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Head of the family Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            {/* Mobile and WhatsApp in a single row with exact 50-50% split */}
            <div className="flex w-full mb-3">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.mobileNo ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Number"
                  maxLength={10}
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                )}
              </div>

              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="whatsappNo"
                  value={formData.whatsappNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.whatsappNo ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Number"
                  maxLength={10}
                />
                {errors.whatsappNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.whatsappNo}
                  </p>
                )}
              </div>
            </div>

            {/* Address in a full row */}
            <div className="w-full mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
                placeholder="Enter address here"
              ></textarea>
            </div>

            {/* Empty div to maintain the layout grid */}
            <div className="w-1/2 pl-2 mb-3">
              {/* This space intentionally left empty to maintain the grid layout */}
            </div>
          </div>
        </div>

        {/* Demographics and Scheme Details Section */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Demographics & Scheme Details
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste Category <span className="text-red-500">*</span>
              </label>
              <select
                name="casteCategory"
                value={formData.casteCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Category</option>
                <option value="General">General(GEN)</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="SC">Schedule Caste(SC)</option>
                <option value="ST">Schedule Tribe(ST)</option>
                <option value="EWS">Economically Weaker Section(EWS)</option>
                <option value="NA">Not Applicable</option>
              </select>
              {formData.casteCategory && (
                <p className="text-green-600 text-xs mt-1">
                  Selected: {formData.casteCategory}
                </p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minority <span className="text-red-500">*</span>
              </label>
              <select
                name="minority"
                value={formData.minority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="Sikh">Sikh</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Jain">Jain</option>
                <option value="Parsi">Parsi</option>
                <option value="NA">Not Applicable</option>
              </select>
              {formData.minority && (
                <p className="text-green-600 text-xs mt-1">
                  Selected: {formData.minority}
                </p>
              )}
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farmer <span className="text-red-500">*</span>
              </label>
              <select
                name="farmer"
                value={formData.farmer}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="Small">Small Holder</option>
                <option value="Marginal">Marginal</option>
                <option value="NA">Not Applicable</option>
              </select>
              {formData.farmer && (
                <p className="text-green-600 text-xs mt-1">
                  Selected: {formData.farmer}
                </p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Reform Beneficiaries <span className="text-red-500">*</span>
              </label>
              <select
                name="landReformBeneficiary"
                value={formData.landReformBeneficiary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Indira Awas Yojana Beneficiaries <span className="text-red-500">*</span>
              </label>
              <select
                name="indiraAwasYojanaBeneficiary"
                value={formData.indiraAwasYojanaBeneficiary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aam Aadmi Bima Yojana Beneficiary <span className="text-red-500">*</span>
              </label>
              <select
                name="aamAadmiBimaYojanaBeneficiary"
                value={formData.aamAadmiBimaYojanaBeneficiary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                National Health Insurance Scheme Beneficiary <span className="text-red-500">*</span>
              </label>
              <select
                name="nationalHealthInsuranceSchemeBeneficiary"
                value={formData.nationalHealthInsuranceSchemeBeneficiary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                If yes, number:
              </label>
              <input
                type="text"
                name="nhisNumber"
                value={formData.nhisNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter NHIS number"
              ></input>
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Below Poverty Line Family <span className="text-red-500">*</span>
              </label>
              <select
                name="belowPovertyLine"
                value={formData.belowPovertyLine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Forest Rights Recognition Act, 2006 Land Recipient? 
              </label>
              <input
                type="text"
                name="forestRightsRecognitionAct"
                value={formData.forestRightsRecognitionAct}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.forestRightsRecognitionAct
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter details"
              />
              {errors.forestRightsRecognitionAct && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.forestRightsRecognitionAct}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* First Working Person Section */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            First Working Person Details 
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of the first working person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstWorkerName"
                value={formData.firstWorkerName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstWorkerName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter full name"
              />
              {errors.firstWorkerName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstWorkerName}
                </p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship with Head of Family <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstApplicantRelationship"
                value={formData.firstApplicantRelationship}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstApplicantRelationship
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="e.g., Son, Daughter, etc."
              />
              {errors.firstApplicantRelationship && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstApplicantRelationship}
                </p>
              )}
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstApplicantFirstName"
                value={formData.firstApplicantFirstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstApplicantFirstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter first name"
                required
              />
              {errors.firstApplicantFirstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstApplicantFirstName}
                </p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="firstApplicantMiddleName"
                value={formData.firstApplicantMiddleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstApplicantMiddleName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter middle name"
              />
              {errors.firstApplicantMiddleName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstApplicantMiddleName}
                </p>
              )}
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstApplicantLastName"
                value={formData.firstApplicantLastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.firstApplicantLastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                placeholder="Enter last name"
                required
              />
              {errors.firstApplicantLastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstApplicantLastName}
                </p>
              )}
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="firstApplicantGender"
                value={formData.firstApplicantGender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.mobileNo ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Number"
                  maxLength={10}
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                )}
              </div>

            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disabled <span className="text-red-500">*</span>
              </label>
              <select
                name="firstApplicantDisabled"
                value={formData.firstApplicantDisabled}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select</option>
                <option value="less-than-40">
                  Less than 40% (Not Eligible)
                </option>
                <option value="40-59">49% - 59% (Eligible - Moderate)</option>
                <option value="60-79">60% - 79% (Eligible - Server)</option>
                <option value="80-99">80% - 99% (Eligible - High)</option>
                <option value="100">100%(Complete Disability)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second Working Person Section */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Second Working Person Details
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of the second working person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="secondWorkerName"
                value={formData.secondWorkerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter full name"
              />
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship with Head of Family <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="secondApplicantRelationship"
                value={formData.secondApplicantRelationship}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., Son, Daughter, etc."
              />
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="secondApplicantFirstName"
                value={formData.secondApplicantFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="secondApplicantMiddleName"
                value={formData.secondApplicantMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter middle name"
              />
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="secondApplicantLastName"
                value={formData.secondApplicantLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
        </div>
        {/* Third Working Person Section */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Third Working Person Details
          </h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of the third working person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="thirdWorkerName"
                value={formData.thirdWorkerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter full name"
              />
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship with Head of Family <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="thirdApplicantRelationship"
                value={formData.thirdApplicantRelationship}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., Son, Daughter, etc."
              />
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="thirdApplicantFirstName"
                value={formData.thirdApplicantFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="w-1/2 pl-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="thirdApplicantMiddleName"
                value={formData.thirdApplicantMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter middle name"
              />
            </div>
            <div className="w-1/2 pr-2 mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="thirdApplicantLastName"
                value={formData.thirdApplicantLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
        </div>

        {/*Documents*/}
        <div className="mb-6 p-4 bg--50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Documents Upload
          </h2>

          {/* Row 1 - Group Photo and Head of Family ID */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                A postcard-sized, colored, group photo of the applicant adult
                members of the family. <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-group-photo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-group-photo"
                        name="file-upload-group-photo"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Aadhar card or voting card of the head of the family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-head-id"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-head-id"
                        name="file-upload-head-id"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 - Bank Passbook and First Working Person ID */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Bank passbook of the head of the family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-head-passbook"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-head-passbook"
                        name="file-upload-head-passbook"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Aadhar card or voting card of the first working person in the
                applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-first-person-id"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-first-person-id"
                        name="file-upload-first-person-id"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 - First Laborer Passbook and Second Working Person ID */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Bank passbook of the first laborer in the applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-first-laborer-passbook"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-first-laborer-passbook"
                        name="file-upload-first-laborer-passbook"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Aadhar card or voting card of the second working person in the
                applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-second-person-id"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-second-person-id"
                        name="file-upload-second-person-id"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 - Second Laborer Passbook and Third Working Person ID */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Bank passbook of the second laborer in the applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-second-laborer-passbook"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-second-laborer-passbook"
                        name="file-upload-second-laborer-passbook"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Aadhar card or voting card of the third working person in the
                applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-third-person-id"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-third-person-id"
                        name="file-upload-third-person-id"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 5 - Third Laborer Passbook */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 h-12 md:h-16">
                Bank passbook of the third laborer in the applicant's family <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md flex-grow">
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
                      htmlFor="file-upload-third-laborer-passbook"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload-third-laborer-passbook"
                        name="file-upload-third-laborer-passbook"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any file type allowed</p>
                </div>
              </div>
            </div>

            {/* Empty column for alignment - keeps consistent layout */}
            <div className="flex-1"></div>
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
