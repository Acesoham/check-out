import React, { useState } from 'react';

// Sample Caste data for demonstration
const initialCastes = [
  {
    id: 1,
    isActive: true,
    shortName: 'NYC',
    longName: 'New York City',
    printName: 'New York',
    description: 'The most populous city in the United States'
  },
  {
    id: 2,
    isActive: true,
    shortName: 'LA',
    longName: 'Los Angeles',
    printName: 'Los Angeles',
    description: 'The largest city in California'
  },
  {
    id: 3,
    isActive: false, 
    shortName: 'CHI',
    longName: 'Chicago',
    printName: 'Chicago',
    description: 'The third-most populous city in the United States'
  }
];

// Castes Management Dashboard for Zila Parishad / Gramin Vibhag
const Dashboard = () => {
  const [showCasteForm, setShowCasteForm] = useState(false);
  const [Castes, setCastes] = useState(initialCastes);
  const [editingCaste, setEditingCaste] = useState(null);
  const [viewingCaste, setViewingCaste] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', or 'inactive'

  const toggleCasteForm = () => {
    setShowCasteForm(!showCasteForm);
    if (!showCasteForm) {
      setEditingCaste(null); // Reset editing Caste when opening form for new Caste
    }
  };

  const handleEdit = (Caste) => {
    setEditingCaste(Caste);
    setShowCasteForm(true);
  };

  const handleView = (Caste) => {
    setViewingCaste(Caste);
  };

  const handleSaveCaste = (CasteData) => {
    if (editingCaste) {
      // Update existing Caste
      setCastes(Castes.map(Caste => 
        Caste.id === editingCaste.id ? { ...CasteData, id: Caste.id } : Caste
      ));
    } else {
      // Add new Caste
      const newCaste = {
        ...CasteData,
        id: Castes.length > 0 ? Math.max(...Castes.map(d => d.id)) + 1 : 1
      };
      setCastes([...Castes, newCaste]);
    }

    setShowCasteForm(false);
    setEditingCaste(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeViewModal = () => {
    setViewingCaste(null);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter Castes based on search term and active filter
  const filteredCastes = Castes.filter(Caste => {
    // First apply status filter
    if (activeFilter === 'active' && !Caste.isActive) return false;
    if (activeFilter === 'inactive' && Caste.isActive) return false;
    
    // Then apply search term filter
    return (
      Caste.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Caste.longName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Caste.printName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Caste.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header section with search bar and Add Caste button */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Castes Management</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Search bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500" 
              placeholder="Search Castes..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Add Caste button */}
          <button
            onClick={toggleCasteForm}
            className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center w-full md:w-auto justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Caste
          </button>
        </div>

        {/* Filter tabs section */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg ${
                    activeFilter === 'all'
                      ? 'text-orange-600 border-orange-600 active'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  All Castes
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => handleFilterChange('active')}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg ${
                    activeFilter === 'active'
                      ? 'text-green-600 border-green-600 active'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Active
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange('inactive')}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 rounded-t-lg ${
                    activeFilter === 'inactive'
                      ? 'text-red-600 border-red-600 active'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Inactive
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {showCasteForm ? (
          <CasteMasterForm 
            onClose={toggleCasteForm} 
            onSave={handleSaveCaste} 
            initialData={editingCaste} 
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-collapse">
                <thead className="bg-orange-500">
                  <tr className="border border-orange-600">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Is Active
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Short Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Long Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Print Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-orange-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCastes.length > 0 ? (
                    filteredCastes.map((Caste) => (
                      <tr 
                        key={Caste.id} 
                        className={Caste.isActive ? "bg-[#D1FFBD]" : "bg-[#f3c2c2]"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {Caste.isActive ? 
                            <span className="text-green-600">Y</span> : 
                            <span className="text-red-600">N</span>
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Caste.shortName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Caste.longName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Caste.printName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {Caste.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleView(Caste)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-100 px-2 py-1 rounded"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handleEdit(Caste)}
                              className="text-amber-600 hover:text-amber-900 bg-amber-100 px-2 py-1 rounded"
                            >
                              Update
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm 
                          ? `No Castes found matching "${searchTerm}"${activeFilter !== 'all' ? ` with '${activeFilter}' status` : ''}`
                          : `No ${activeFilter !== 'all' ? activeFilter : ''} Castes found`
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* View Caste Modal */}
      {viewingCaste && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-4 bg-orange-500 text-white rounded-t-lg">
              <h2 className="text-xl font-bold">Caste Details</h2>
              <button onClick={closeViewModal} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-black-500">Is Active</p>
                  <p className="mt-1 text-sm">
                    {viewingCaste.isActive ? 
                      <span className="font-medium text-green-600">Y</span> : 
                      <span className="font-medium text-red-600">N</span>
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-500">Short Name</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingCaste.shortName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-500">Long Name</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingCaste.longName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-500">Print Name</p>
                  <p className="mt-1 text-sm text-gray-900">{viewingCaste.printName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-orange-500">Description</p>
                  <p className="mt-1 text-sm text-gray-900 max-h-16 overflow-y-auto">{viewingCaste.description}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Caste Master Form component with edit capabilities
const CasteMasterForm = ({ onClose, onSave, initialData }) => {
  // State for form values
  const [formData, setFormData] = useState({
    isActive: initialData?.isActive ?? true,
    shortName: initialData?.shortName || '',
    longName: initialData?.longName || '',
    printName: initialData?.printName || '',
    description: initialData?.description || ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    shortName: '',
    longName: '',
    printName: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isActive: e.target.checked
    });
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.shortName.trim()) {
      newErrors.shortName = 'Short Name is required';
      valid = false;
    }

    if (!formData.longName.trim()) {
      newErrors.longName = 'Long Name is required';
      valid = false;
    }

    if (!formData.printName.trim()) {
      newErrors.printName = 'Print Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onSave(formData);
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      {/* Header with close button */}
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <div className="w-16 h-16 flex items-center justify-center mr-4">
          {/* Logo */}
          <svg viewBox="0 0 500 700" className="w-full h-full">
            <image href="/api/placeholder/150/200" width="500" height="700" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold flex-grow text-center">
          {initialData ? 'UPDATE Caste' : 'ADD Caste'}
        </h1>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Blue border box for form content */}
      <div className="border-2 border-blue-500 rounded-lg m-6 p-6">
        {/* Caste Details Section */}
        <div className="relative mb-6 bg-white rounded-lg">
          <h2 className="text-lg font-semibold mb-6 px-4 py-2 bg-orange-500 text-white rounded">Caste DETAILS</h2>
          
          {/* Is Active - Now a checkbox */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-black-500 rounded focus:ring-orange-500 mr-2"
              />
              <label htmlFor="isActive" className="block text-sm font-medium text-black-500">Is Active</label>
            </div>
            <p className={`mt-1 text-sm ${formData.isActive ? "text-green-600" : "text-red-600"}`}>
              {formData.isActive ? "Y - Caste is active" : "N - Caste is inactive"}
            </p>
          </div>
          
          {/* Short Name & Long Name in one row */}
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-black-500 mb-2">Short Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.shortName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Enter Short Name"
              />
              {errors.shortName && <p className="mt-1 text-sm text-red-500">{errors.shortName}</p>}
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <label className="block text-sm font-medium text-black-500 mb-2">Long Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="longName"
                value={formData.longName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.longName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Enter Long Name"
              />
              {errors.longName && <p className="mt-1 text-sm text-red-500">{errors.longName}</p>}
            </div>
          </div>
          
          {/* Print Name (full row) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-black-500 mb-2">Print Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="printName"
              value={formData.printName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.printName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Enter Print Name"
            />
            {errors.printName && <p className="mt-1 text-sm text-red-500">{errors.printName}</p>}
          </div>
          
          {/* Description (full row but with smaller height) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black-500 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="Enter Description"
              rows={4}
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                console.log('Form submitted:', formData);
                onSave(formData);
              } else {
                console.log('Form validation failed');
              }
            }}
            className="px-8 py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {initialData ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;