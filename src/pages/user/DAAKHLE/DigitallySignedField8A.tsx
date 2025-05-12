import React, { useState, useEffect } from 'react';

// Define district-taluka mapping
interface TalukaMapping {
  [district: string]: string[];
}

interface FormDataType {
  firstName: string;
  middleName: string;
  lastName: string;
  village: string;
  district: string;
  taluka: string;
  accountNumber: string;
  paymentMethod: string;
  utrNumber: string;
  date: string;
  time: string;
}
const requiredNameFields = [
  'firstName', 'lastName'
];
let isValid = true;


const FormComponent: React.FC = () => {
  // Define districts and taluka mapping
  const districts = [
    
  ];

  // Complete taluka mapping with all talukas provided
  const talukaMapping: TalukaMapping = {
    
  };

  // State for form values
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    middleName: '',
    lastName: '',
    village: '',
    district: '',
    taluka: '',
    accountNumber: '',
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: ''
  });

  // State for available talukas based on selected district
  const [availableTalukas, setAvailableTalukas] = useState<string[]>([]);
  const [availableVillages, setAvailableVillages] = useState<string[]>([]);

  // Update available talukas when district changes
  useEffect(() => {
    if (formData.district && talukaMapping[formData.district]) {
      setAvailableTalukas(talukaMapping[formData.district]);
      setFormData(prevState => ({
        ...prevState,
        taluka: '' // Reset taluka when district changes
      }));
    } else {
      setAvailableTalukas([]);
    }
  }, [formData.district]);

  // Handle text input changes with enhanced validation and capitalization
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for name fields and village - capitalize first letter and allow only alphabets
    if (['firstName', 'middleName', 'lastName', 'village'].includes(name)) {
      // For name fields: Allow only alphabets and capitalize first letter
      const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, '');
      const capitalizedValue = alphabeticValue.charAt(0).toUpperCase() + alphabeticValue.slice(1).toLowerCase();
      
      setFormData(prevState => ({
        ...prevState,
        [name]: capitalizedValue
      }));
    }
    // Special handling for account number - allow only numbers with length constraints
    else if (name === 'accountNumber') {
      // Only allow numeric values
      const numericValue = value.replace(/\D/g, '');
      setFormData(prevState => ({
        ...prevState,
        [name]: numericValue
      }));
    }
    // Default handling for other fields
    else {
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Validation
    let isValid = true;
    
    // Validate account number (between 9 and 18 digits)
    if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      alert('Account number must be between 9 and 18 digits');
      isValid = false;
    }
    if (!formData.firstName || !formData.lastName || !formData.district || !formData.taluka || !formData.village || !formData.accountNumber) {
      isValid = false;
    alert('Please fill all required fields.');
    }
    if (isValid) {
      // Submit form data to server
      console.log('Form data is valid and ready to submit');
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-20 h-20 flex items-center justify-center mr-4">
          {/* Ashoka Stambh Logo placeholder */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 font-bold">
          <img src="/images/logo.png" alt="Ashok Stambh" width="500" height="700" />
          </div>
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">DIGITALLY SIGNED FIELD 8A FORM</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1: Owner's Name */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">OWNER'S NAME</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name<span className="text-orange-500">*</span></label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter First Name"
              />
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
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-orange-500">*</span></label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Village */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">ADDRESS AND BANK DETAILS</h2>
  {/* SECTION 3: District */}
  <div className="flex flex-row flex-wrap">
    <div className="w-1/2 mb-6 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select District<span className="text-orange-500">*</span></label>
      <select
        name="district"
        value={formData.district}
        required
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      >
        <option value="">-- Select District --</option>
        {districts.map((district, index) => (
          <option key={index} value={district}>{district}</option>
        ))}
      </select>
    </div>
    {/* SECTION 4: Taluka */}
    <div className="w-1/2 mb-6 pl-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Taluka Name<span className="text-orange-500">*</span></label>
      <select
        name="taluka"
        value={formData.taluka}
        required
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        disabled={!formData.district}
      >
        <option value="">-- Select Taluka --</option>
        {availableTalukas.map((taluka, index) => (
          <option key={index} value={taluka}>{taluka}</option>
        ))}
      </select>
      {!formData.district && (
        <p className="text-xs text-gray-500 mt-1">Please select a district first</p>
      )}
    </div>
  </div>
  
  {/* SECTION 5: Village Name and Account Number in the same row */}
  <div className="flex flex-row flex-wrap">
    <div className="w-1/2 mb-6 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Village Name<span className="text-orange-500">*</span></label>
      <select
        name="village"
        required
        value={formData.village}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        disabled={!formData.taluka && !formData.district}>
        <option value="">-- Select Village --</option>
        {availableVillages.map((village, index) => (
          <option key={index} value={village}>{village}</option>
        ))}
        </select>
        {!formData.district && (
        <p className="text-xs text-gray-500 mt-1">Please select a district first</p>
      )}
      
    </div>
    <div className="w-1/2 mb-6 pl-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number<span className="text-orange-500">*</span></label>
      <input
        type="text"
        name="accountNumber"
        required
        value={formData.accountNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Account Number (9-18 digits)"
      />
      <p className="text-xs text-gray-500 mt-1">
        Account number must be between 9 and 18 digits
      </p>
    </div>
  </div>
</div>
        
        {/* SECTION 6: Payment Section */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-gray-600 mb-4">
            A fee of Rs 15/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method<span className="text-orange-500">*</span></label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code<span className="text-orange-500">*</span></label>
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-2">
                <img src="/api/placeholder/160/160" alt="QR Code" className="w-32 h-32" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">UTR Number<span className="text-orange-500">*</span></label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter UTR Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Proof<span className="text-orange-500">*</span></label>
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