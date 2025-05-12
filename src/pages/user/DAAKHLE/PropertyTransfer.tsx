import React, { useState } from 'react';

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    prescriberAddress: '',
    noteTakerFirstName: '',
    noteTakerMiddleName: '',
    noteTakerLastName: '',
    noteTakerAddress: '',
    propertyNumber: '',
    description: '',
    areaOfProperty: '',
    listNumberOrConsentLetter: null,
    extractOfPremises: null,
    deathCertificate: null,
    heirCertificate: null,
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: ''
  });
  

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">PROPERTY TRANSFER APPLICATION</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">


         {/* SECTION 1 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Prescriber's Details</h2>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, firstName: value });
                }}
                required
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
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, middleName: value });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                  setFormData({ ...formData, lastName: value });
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>

          <div className="flex flex-row flex-wrap">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prescriber's Address<span className="text-red-500">*</span></label>
              <textarea
                name="prescriberAddress"
                value={formData.prescriberAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Address"
                rows={2}
              ></textarea>
            </div>
          </div>
        </div>


          {/* SECTION 2: Person Taking the Note */}
          <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">Note Taker's Details</h2>

            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="noteTakerFirstName"
                  value={formData.noteTakerFirstName}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                    setFormData({ ...formData, noteTakerFirstName: value });
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="noteTakerMiddleName"
                  value={formData.noteTakerMiddleName}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                    setFormData({ ...formData, noteTakerMiddleName: value });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter Middle Name"
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="noteTakerLastName"
                  value={formData.noteTakerLastName}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Auto-capitalize first letter
                    setFormData({ ...formData, noteTakerLastName: value });
                  }}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="w-1/2 pl-2 invisible">
                {/* Empty div to maintain layout */}
              </div>
            </div>

            <div className="flex flex-row flex-wrap">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address<span className="text-red-500">*</span></label>
                <textarea
                  name="noteTakerAddress"
                  value={formData.noteTakerAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter Address"
                  rows={2}
                ></textarea>
              </div>
            </div>
          </div>


            {/* SECTION 3: Property Details */}
            <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
              <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Details</h2>

              <div className="grid grid-cols-1 gap-4 mt-4">
                {/* Property Number to be Transferred */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="propertyNumber"
                      value={formData.propertyNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                        setFormData({ ...formData, propertyNumber: value }); // Always update input value
                      }}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      placeholder="Enter Property Number (6-10 digits)"
                    />
                    {/* Show an error message if length is invalid */}
                    {formData.propertyNumber && (formData.propertyNumber.length < 6 || formData.propertyNumber.length > 10) && (
                      <p className="text-sm text-red-500 mt-1">Property number must be between 6 and 10 digits.</p>
                    )}
                  </div>
              </div>

              {/* Description - Radio Button */}
              <div className="grid grid-cols-1 gap-4">
                <label className="block text-sm font-medium text-gray-900 mb-1">Description<span className="text-red-500">*</span></label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="residential"
                      name="description"
                      value="Residential Property"
                      checked={formData.description === 'Residential Property'}
                      onChange={() => handleRadioChange('description', 'Residential Property')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="residential">Residential Property</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="commercial"
                      name="description"
                      value="Commercial Property"
                      checked={formData.description === 'Commercial Property'}
                      onChange={() => handleRadioChange('description', 'Commercial Property')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="commercial">Commercial Property</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="agricultural"
                      name="description"
                      value="Agricultural Land"
                      checked={formData.description === 'Agricultural Land'}
                      onChange={() => handleRadioChange('description', 'Agricultural Land')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="agricultural">Agricultural Land</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="vacant"
                      name="description"
                      value="Vacant Plot"
                      checked={formData.description === 'Vacant Plot'}
                      onChange={() => handleRadioChange('description', 'Vacant Plot')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="vacant">Vacant Plot</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="industrial"
                      name="description"
                      value="Industrial Space"
                      checked={formData.description === 'Industrial Space'}
                      onChange={() => handleRadioChange('description', 'Industrial Space')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="industrial">Industrial Space</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="other"
                      name="description"
                      value="Other"
                      checked={formData.description === 'Other'}
                      onChange={() => handleRadioChange('description', 'Other')}
                      className="mr-2 focus:ring-blue-400"
                    />
                    <label htmlFor="other">Other (Specify)</label>
                  </div>
                </div>
              </div>

              {/* Area of Property to be Transferred */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Area of Property (Length x Width in sq. ft.)<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="areaOfProperty"
                  value={formData.areaOfProperty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter Area (sq. ft.)"
                />
              </div>
            </div>


 {/* SECTION 3 */}
 <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
  <h2 className="text-lg font-semibold mb-4 text-blue-600">Supporting Documents</h2>
  <div className="grid grid-cols-2 gap-4"> {/* Two columns layout */}
    
    {/* File 1 */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">List number | or consent letter<span className="text-red-500">*</span></label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload-1" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input id="file-upload-1" name="file-upload-1" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Any file type allowed</p>
        </div>
      </div>
    </div>

    {/* File 2 */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Extract of the premises (Sample No. 08)<span className="text-red-500">*</span></label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload-2" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input id="file-upload-2" name="file-upload-2" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Any file type allowed</p>
        </div>
      </div>
    </div>

    {/* File 3 */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Death certificate (if applicable)</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload-3" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input id="file-upload-3" name="file-upload-3" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Any file type allowed</p>
        </div>
      </div>
    </div>

    {/* File 4 */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Heir certificate</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload-4" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input id="file-upload-4" name="file-upload-4" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Any file type allowed</p>
        </div>
      </div>
    </div>

  </div>
</div>



        {/* SECTION 4 (PAYMENT SECTION) */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PAYMENT SECTION</h2>
          <p className="text-sm text-gray-600 mb-4">
            A fee of Rs 15/- is required and the receipt of payment of fees should be uploaded and the UTR no should be entered in the column given below.
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