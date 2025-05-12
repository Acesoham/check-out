import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  Address: string;
  MobileNumber: string;
  AadhaarCardNumber: string;
  PropertyNumber: string;
  Complaintdetailsincludingservice: string;
}

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    Address: '',
    MobileNumber: '',
    AadhaarCardNumber: '',
    PropertyNumber: '',
    Complaintdetailsincludingservice: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.charAt(0).toUpperCase() + value.slice(1)
    }));
  };
  
  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'Address', 'MobileNumber', 'AadhaarCardNumber', 'PropertyNumber', 'Complaintdetailsincludingservice'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate mobile number
      if (!/^[0-9]{10}$/.test(formData.MobileNumber)) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }

      // Validate Aadhaar number
      if (!/^[0-9]{12}$/.test(formData.AadhaarCardNumber)) {
        throw new Error('Please enter a valid 12-digit Aadhaar number');
      }

      const response = await axios.post('http://localhost:5000/api/cleaning-complaints/submit', formData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: `Complaint submitted successfully! Your complaint ID is: ${response.data.data.complaintId}`
        });
        // Reset form
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          Address: '',
          MobileNumber: '',
          AadhaarCardNumber: '',
          PropertyNumber: '',
          Complaintdetailsincludingservice: '',
        });
      } else {
        throw new Error(response.data.message || 'Failed to submit complaint');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to submit complaint. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
      <div className="w-20 h-20 flex items-center justify-center mr-4">
  {/* Ashoka Stambh Logo - using image directly */}
  <img src="/images/logo.png" alt="Ashok Stambh" className="w-full h-full object-contain" />
</div>

        <h1 className="text-2xl font-bold text-center flex-grow">
      CLEANING SERVICE RELATED COMPLAINT
    </h1>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div className={`p-4 m-4 rounded-md ${
          submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1 */}
       {/* SECTION 1 */}
<div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">Personal Details</h2>
  <div className="flex flex-row flex-wrap mb-4">
    <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
         id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter First Name"
      />
    </div>
    <div className="w-1/2 pl-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Middle Name
      </label>
      <input
        type="text"
         id="middleName"
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Last Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
         id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Last Name"
      />
    </div>

    <div className="w-full pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address
      </label>
      <textarea
        name="Address"
         id="Address"
        value={formData.Address}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
        placeholder="Enter Address here"
      ></textarea>
    </div>

    <div className="w-1/2 pl-2 invisible">
      {/* Empty div to maintain layout */}
    </div>
  </div>
</div>

        
        {/* SECTION 2 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">Contact Details</h2>
  
  <div className="flex flex-row flex-wrap mb-4">
    {/* Mobile Number */}
    <div className="w-1/2 pr-2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
      <input
        type="text"
         id="MobileNumber"
        name="MobileNumber"
        value={formData.MobileNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Mobile Number"
        maxLength={10}
        pattern="[0-9]{10}"
        required
      />
    </div>

    {/* Aadhaar Card Number */}
    <div className="w-1/2 pl-2 mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Number</label>
      <input
        type="text"
         id="AadhaarCardNumber"
        name="AadhaarCardNumber"
        value={formData.AadhaarCardNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Aadhaar Card Number"
        maxLength={12}
        pattern="[0-9]{12}"
        required
      />
    </div>

    {/* Property Number */}
    <div className="w-1/2 pr-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Property Number</label>
      <input
        type="text"
         id="PropertyNumber"
        name="PropertyNumber"
        value={formData.PropertyNumber}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter Property Number"
        required
      />
    </div>
  </div>

  <div className="flex flex-row flex-wrap">
    <div className="w-1/2 pl-2 invisible">
      {/* Empty div to maintain layout */}
    </div>
  </div>
</div>

        {/* SECTION 3 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Complaint Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="w-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Complaint details including service
  </label>
  <textarea
     id="Complaintdetailsincludingservice"
    name="Complaintdetailsincludingservice"
    value={formData.Complaintdetailsincludingservice}
    onChange={handleChange}
    className="w-full  px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
    placeholder="Enter Complaint here"
  ></textarea>
</div>
            
          </div>
        </div>


        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-orange-500 text-white rounded-md font-medium 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;