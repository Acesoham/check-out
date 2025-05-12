import React, { useState, useEffect } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    textArea1: '',
    district: '',
    taluka: '',
    radioOption: '',
    ownership: '',
    natureOfBusiness: '',
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    textArea1: '',
    district: '',
    taluka: '',
    ownership: '',
    natureOfBusiness: '',
    fileAadhaar: '',
    fileExcerpt: '',
    fileAgreement: '',
    fileTax: ''
  });

  // State for file storage
  const [files, setFiles] = useState({
    fileAadhaar: null,
    fileExcerpt: null,
    fileAgreement: null,
    fileTax: null
  });

  // District data
  const districts = [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 
    'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 
    'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 
    'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 
    'Washim', 'Yavatmal'
  ];

  // Taluka data mapping to districts
  const talukasByDistrict: { [key: string]: string[] } = {
    'Ahmednagar': ['Akole', 'Jamkhed', 'Karjat', 'Nagar', 'Nevasa', 'Parner', 'Pathardi', 'Rahata', 'Rahuri', 'Shevgaon', 'Shrigonda', 'Shrirampur'],
    'Akola': ['Akola', 'Akot', 'Balapur', 'Barshitakli', 'Murtijapur', 'Patur', 'Telhara'],
    'Amravati': ['Achalpur', 'Amravati', 'Anjangaon-Surji', 'Bhatkuli', 'Chandurbazar', 'Chikhaldara', 'Daryapur', 'Dharni', 'Morshi', 'Nandgaon Khandeshwar', 'Warud'],
    'Aurangabad': ['Aurangabad', 'Gangapur', 'Kannad', 'Khuldabad', 'Paithan', 'Phulambri', 'Sillod', 'Vaijapur'],
    'Beed': ['Ambajogai', 'Ashti', 'Beed', 'Georai', 'Kaij', 'Majalgaon', 'Parli', 'Patoda', 'Shirur-Kasar', 'Wadwani'],
    'Bhandara': ['Bhandara', 'Lakhandur', 'Mohadi', 'Tumsar'],
    'Buldhana': ['Buldhana', 'Chikhli', 'Khamgaon', 'Malkapur', 'Nandura', 'Pimpalgaon', 'Sindkhed Raja'],
    'Chandrapur': ['Chandrapur', 'Ballarpur', 'Brahmapuri', 'Rajura', 'Sindewahi', 'Warora'],
    'Dhule': ['Dhule', 'Shirpur', 'Nandurbar', 'Sakri', 'Sindkheda'],
    'Gadchiroli': ['Gadchiroli', 'Adyal', 'Bhamragad', 'Dhanora', 'Ghot', 'Korchi'],
    'Gondia': ['Gondia', 'Deori', 'Tirora', 'Amgaon'],
    'Hingoli': ['Hingoli', 'Kalamnuri', 'Jalna', 'Sengaon', 'Anwa'],
    'Jalgaon': ['Jalgaon', 'Chopda', 'Yaval', 'Raver', 'Bhadgaon'],
    'Jalna': ['Jalna', 'Ambad', 'Badnapur', 'Ghansawangi', 'Partur'],
    'Kolhapur': ['Kolhapur', 'Hatkanangale', 'Kagal', 'Karvir', 'Shahuwadi', 'Radhanagari', 'Gargoti'],
    'Latur': ['Latur', 'Ausa', 'Deoni', 'Hingoli', 'Jalna'],
    'Mumbai City': ['Mumbai City'],
    'Mumbai Suburban': ['Bandra', 'Boregaon', 'Goregaon', 'Jogeshwari', 'Kandivali', 'Malad', 'Mulund'],
    'Nagpur': ['Nagpur City', 'Hingna', 'Kamptee', 'Mouda', 'Ramtek', 'Saoner', 'Umred'],
    'Nanded': ['Babhulgaon', 'Bhainsa', 'Biloli', 'Hingoli', 'Nanded City', 'Naigaon', 'Mundgaon', 'Purna', 'Wadgaon'],
    'Nandurbar': ['Nandurbar', 'Dhadgaon', 'Shahada'],
    'Nashik': ['Baglan', 'Chandwad', 'Deola', 'Dindori', 'Igatpuri', 'Kalwan', 'Malegaon', 'Nashik', 'Niphad', 'Peth', 'Sinnar', 'Surgana', 'Trimbakeshwar', 'Yeola'],
    'Osmanabad': ['Osmanabad', 'Tuljapur', 'Paranda', 'Baranjala'],
    'Palghar': ['Palghar', 'Boisar', 'Vada'],
    'Parbhani': ['Parbhani', 'Jintur', 'Palam', 'Mantha', 'Sailu'],
    'Pune': ['Ambegaon', 'Baramati', 'Bhor', 'Daund', 'Haveli', 'Indapur', 'Junnar', 'Khed', 'Maval', 'Mulshi', 'Pune City', 'Purandhar (Saswad)', 'Shirur', 'Velhe'],
    'Raigad': ['Alibag', 'Khopoli', 'Mangaon', 'Murud', 'Pen', 'Roha', 'Uran', 'Karjat'],
    'Ratnagiri': ['Guhagar', 'Chiplun', 'Ratnagiri', 'Dapoli', 'Rajapur', 'Khed'],
    'Sangli': ['Atpadi', 'Jat', 'Kadegaon', 'Khanapur', 'Miraj', 'Sangli', 'Tasgaon', 'Walwa'],
    'Satara': ['Koregaon', 'Karad', 'Satara', 'Phaltan', 'Wai', 'Mahabaleshwar'],
    'Sindhudurg': ['Sindhudurg', 'Malwan', 'Vengurla', 'Kankavli', 'Sankhali'],
    'Solapur': ['Akkalkot', 'Baranjala', 'Karmala', 'Mangalwedha', 'Pandharpur', 'Solapur City', 'South Solapur'],
    'Thane': ['Ambarnath', 'Bhiwandi', 'Kalyan', 'Murbad', 'Shahapur', 'Thane', 'Ulhasnagar'],
    'Wardha': ['Wardha', 'Arvi', 'Khamgaon'],
    'Washim': ['Washim', 'Malegaon'],
    'Yavatmal': ['Yavatmal', 'Wani', 'Ralegaon', 'Malkapur', 'Ghatanji']
  };

  // Initialize taluka options with an empty array
  const [talukaOptions, setTalukaOptions] = useState<string[]>([]);

  // Updated Validation functions
  const validateNameField = (value: string, fieldName: string) => {
    if (!value) {
      return `${fieldName} is required`;
    }
    
    // No regex validation here - we'll format it automatically
    return '';
  };

  const validateRequiredField = (value: string, fieldName: string) => {
    if (!value) {
      return `${fieldName} is required`;
    }
    return '';
  };

  const validatePhoneNumber = (value: string) => {
    if (!value) {
      return 'Phone number is required';
    }
    
    // We'll only check if it's a number and exactly 10 digits
    // The input will be restricted by the input handler
    if (!/^\d{10}$/.test(value)) {
      return 'Phone number must be exactly 10 digits';
    }
    
    return '';
  };

  const validateFile = (file: File | null, fieldName: string) => {
    if (!file) {
      return `${fieldName} is required`;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      return `${fieldName} size should not exceed 10MB`;
    }
    
    return '';
  };

  // Format name with first capital letter and rest lowercase
  const formatName = (value: string): string => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply special formatting for different field types
    let formattedValue = value;
    
    // Handle name fields (first letter capital, rest lowercase)
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      formattedValue = formatName(value);
    }
    
    // Handle phone number (only digits, max 10)
    if (name === 'phoneNumber') {
      // Remove any non-digit characters and limit to 10 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));

    // Validate field based on input
    let errorMessage = '';
    
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      errorMessage = validateNameField(formattedValue, name.charAt(0).toUpperCase() + name.slice(1));
    } else if (name === 'phoneNumber') {
      errorMessage = validatePhoneNumber(formattedValue);
    } else if (name === 'district' || name === 'taluka' || name === 'textArea1' || name === 'ownership' || name === 'natureOfBusiness') {
      errorMessage = validateRequiredField(formattedValue, name.charAt(0).toUpperCase() + name.slice(1));
    }
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

    // If district is changed, update taluka options
    if (name === 'district') {
      setFormData(prevState => ({
        ...prevState,
        taluka: '' // Reset taluka when district changes
      }));
      setTalukaOptions(talukasByDistrict[formattedValue] || []);
      
      // Clear taluka error
      setErrors(prevErrors => ({
        ...prevErrors,
        taluka: ''
      }));
    }
  };

  // Updated input handler for name fields to enforce first capital, rest lowercase
  const handleNameInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // This function is just for additional control if needed
    // The actual formatting happens in handleChange
  };
  
  // Updated input handler for phone number to only allow digits
  const handlePhoneInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only digits, backspace, delete, tab, arrows
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Update files state
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: file
      }));
      
      // Validate file
      const errorMessage = validateFile(file, name.charAt(0).toUpperCase() + name.slice(1));
      
      // Update errors state
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: errorMessage
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

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {
      firstName: validateNameField(formData.firstName, 'First Name'),
      middleName: formData.middleName ? validateNameField(formData.middleName, 'Middle Name') : '',
      lastName: validateNameField(formData.lastName, 'Last Name'),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
      textArea1: validateRequiredField(formData.textArea1, 'Address'),
      district: validateRequiredField(formData.district, 'District'),
      taluka: validateRequiredField(formData.taluka, 'Taluka'),
      ownership: validateRequiredField(formData.ownership, 'Ownership'),
      natureOfBusiness: validateRequiredField(formData.natureOfBusiness, 'Nature of Business'),
      fileAadhaar: validateFile(files.fileAadhaar, 'Aadhaar Card'),
      fileExcerpt: validateFile(files.fileExcerpt, 'Excerpt of space'),
      fileAgreement: validateFile(files.fileAgreement, 'Landlord\'s agreement'),
      fileTax: validateFile(files.fileTax, 'Tax payment receipt')
    };
    
    setErrors(newErrors);
    
    // Check if any errors exist
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      console.log('Files:', files);
      // Submit form data to backend
    } else {
      console.log('Form has errors, please fix them before submitting');
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
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">BUSINESS NON-EXEMPTION CERTIFICATE</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
          {/* Applicant Details */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant Details</h2>
            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-white-700 mb-1">First Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onKeyDown={handleNameInput}
                  className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter First Name*"
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  onKeyDown={handleNameInput}
                  className={`w-full px-3 py-2 border ${errors.middleName ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Middle Name"
                />
                {errors.middleName && <p className="mt-1 text-xs text-red-500">{errors.middleName}</p>}
              </div>
            </div>
            <div className="flex flex-row flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-white-700 mb-1">Last Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onKeyDown={handleNameInput}
                  className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Last Name*"
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-white-700 mb-1">Phone Number<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onKeyDown={handlePhoneInput}
                  maxLength={10} // Ensures user cannot enter more than 10 digits
                  className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Enter Phone Number*"
                />
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
              </div>
            </div>
          </div>


          {/* Applicant Address */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Applicant Address</h2>

            {/* Address field now spans two rows */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-white-700 mb-1">Address<span className="text-red-500">*</span></label>
                <textarea
                  name="textArea1"
                  value={formData.textArea1}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.textArea1 ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-16`}
                  placeholder="Enter Address*"
                  required
                ></textarea>
                {errors.textArea1 && <p className="mt-1 text-xs text-red-500">{errors.textArea1}</p>}
              </div>
            </div>

            {/* District and Taluka in a single row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white-700 mb-1">District<span className="text-red-500">*</span></label>
                <select 
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.district ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  required
                >
                  <option value="">Select a district</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white-700 mb-1">Taluka<span className="text-red-500">*</span></label>
                <select 
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className={`w-full px-3 py-2 border ${errors.taluka ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  required
                >
                  <option value="">Select a taluka</option>
                  {talukaOptions.map((taluka, index) => (
                    <option key={index} value={taluka}>{taluka}</option>
                  ))}
                </select>
                {errors.taluka && <p className="mt-1 text-xs text-red-500">{errors.taluka}</p>}
              </div>
            </div>
          </div>


          {/* Property Details */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Details</h2>
            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-white-700 mb-1">Ownership<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.ownership ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Ownership/Rental Agreement Min. No./Group No.*"
                  required
                />
                {errors.ownership && <p className="mt-1 text-xs text-red-500">{errors.ownership}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-white-700 mb-1">Nature of Business<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="natureOfBusiness"
                  value={formData.natureOfBusiness}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.natureOfBusiness ? 'border-red-500' : 'border-white-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
                  placeholder="Nature of Business*"
                  required
                />
                {errors.natureOfBusiness && <p className="mt-1 text-xs text-red-500">{errors.natureOfBusiness}</p>}
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Supporting Documents</h2>

                    {/* First row: Aadhaar Card & Excerpt of Space */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white-700 mb-1">
                          Aadhaar Card <span className="text-red-500">*</span>
                        </label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.fileAadhaar ? 'border-red-500' : 'border-white-300'} border-dashed rounded-md`}>
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-white-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"/>
                            </svg>
                            <div className="flex text-sm text-white-600">
                              <label htmlFor="file-upload-aadhaar" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload-aadhaar" name="fileAadhaar" type="file" className="sr-only" onChange={handleFileChange} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white-500">Upload 1 supported file. Max 10 MB.</p>
                          </div>
                        </div>
                        {errors.fileAadhaar && <p className="mt-1 text-xs text-red-500">{errors.fileAadhaar}</p>}
                        {files.fileAadhaar && <p className="mt-1 text-xs text-green-600">File selected: {files.fileAadhaar.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white-700 mb-1">
                          Excerpt of space <span className="text-red-500">*</span>
                        </label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.fileExcerpt ? 'border-red-500' : 'border-white-300'} border-dashed rounded-md`}>
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-white-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"/>
                            </svg>
                            <div className="flex text-sm text-white-600">
                              <label htmlFor="file-upload-excerpt" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload-excerpt" name="fileExcerpt" type="file" className="sr-only" onChange={handleFileChange} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white-500">Upload 1 supported file. Max 10 MB.</p>
                          </div>
                        </div>
                        {errors.fileExcerpt && <p className="mt-1 text-xs text-red-500">{errors.fileExcerpt}</p>}
                        {files.fileExcerpt && <p className="mt-1 text-xs text-green-600">File selected: {files.fileExcerpt.name}</p>}
                      </div>
                    </div>

                    {/* Second row: Landlord's Agreement & Tax Payment Receipt */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-white-700 mb-1">
                          Landlord's agreement if the land is not owned by the owner <span className="text-red-500">*</span>
                        </label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.fileAgreement ? 'border-red-500' : 'border-white-300'} border-dashed rounded-md`}>
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-white-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"/>
                            </svg>
                            <div className="flex text-sm text-white-600">
                              <label htmlFor="file-upload-agreement" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload-agreement" name="fileAgreement" type="file" className="sr-only" onChange={handleFileChange} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white-500">Upload 1 supported file. Max 10 MB.</p>
                          </div>
                        </div>
                        {errors.fileAgreement && <p className="mt-1 text-xs text-red-500">{errors.fileAgreement}</p>}
                        {files.fileAgreement && <p className="mt-1 text-xs text-green-600">File selected: {files.fileAgreement.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white-700 mb-1">
                          Tax payment receipt regarding the land being zero due <span className="text-red-500">*</span>
                        </label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.fileTax ? 'border-red-500' : 'border-white-300'} border-dashed rounded-md`}>
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-white-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"/>
                            </svg>
                            <div className="flex text-sm text-white-600">
                              <label htmlFor="file-upload-tax" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload-tax" name="fileTax" type="file" className="sr-only" onChange={handleFileChange} />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-white-500">Upload 1 supported file. Max 10 MB.</p>
                          </div>
                        </div>
                        {errors.fileTax && <p className="mt-1 text-xs text-red-500">{errors.fileTax}</p>}
                        {files.fileTax && <p className="mt-1 text-xs text-green-600">File selected: {files.fileTax.name}</p>}
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