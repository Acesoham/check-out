import React, { useState } from 'react';

const PROPERTY_CERTIFICATE_FORM: React.FC = () => {
  const [formData, setFormData] = useState({
    districtName: '',
    talukaName: '',
    villageName: '',
    financialYear: '',
    propertyOwnerFirstName: '',
    propertyOwnerMiddleName: '',
    propertyOwnerLastName: '',
    applicantFirstNameEng: '',
    applicantMiddleNameEng: '',
    applicantLastNameEng: '',
    applicantFirstNameDev: '',
    applicantMiddleNameDev: '',
    applicantLastNameDev: '',
    mobileNo: '',
    applicantAadhaar: '',
    numCopies: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMarathiInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^[\u0900-\u097F\s]*$/.test(value) && value !== '') {
      setErrors(prev => ({ ...prev, [name]: 'केवल देवनागरी वर्ण प्रविष्ट करा' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let validatedValue = value;
    let fieldError = '';
    
    const nameFields = [
      'propertyOwnerFirstName', 'propertyOwnerMiddleName', 'propertyOwnerLastName',
      'applicantFirstNameEng', 'applicantMiddleNameEng', 'applicantLastNameEng'
    ];
    
    if (nameFields.includes(name)) {
      if (!/^[A-Za-z]*$/.test(value)) {
        fieldError = 'Only characters allowed';
      } else if (value) {
        validatedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
    } else if (name === 'villageName') {
      if (value) {
        validatedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
    }
  
    if (name === 'applicantAadhaar') {
      if (!/^\d*$/.test(value)) {
        fieldError = 'Only digits allowed';
      } else if (value.length > 12) {
        validatedValue = value.slice(0, 12);
      } else if (value.length < 12 && value.length > 0) {
        fieldError = 'Aadhaar must be 12 digits';
      }
    }

    if (name === 'mobileNo') {
      if (!/^\d*$/.test(value)) {
        fieldError = 'Only digits allowed';
      } else if (value.length > 10) {
        validatedValue = value.slice(0, 10);
      } else if (value.length < 10 && value.length > 0) {
        fieldError = 'Mobile number must be 10 digits';
      }
    }

    setFormData(prev => ({ ...prev, [name]: validatedValue }));
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      'districtName', 'talukaName', 'villageName', 'financialYear',
      'propertyOwnerFirstName', 'propertyOwnerLastName',
      'applicantFirstNameEng', 'applicantLastNameEng',
      'applicantFirstNameDev', 'applicantLastNameDev',
      'mobileNo', 'applicantAadhaar', 'numCopies'
    ];

    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.applicantAadhaar?.length !== 12) newErrors.applicantAadhaar = 'Aadhaar must be 12 digits';
    if (formData.mobileNo?.length !== 10) newErrors.mobileNo = 'Mobile number must be 10 digits';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  const districts = [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ];
  
  const talukasByDistrict: Record<string, string[]> = {
    "Ahmednagar": [
      "Ahmednagar", 
      "Shevgaon", 
      "Pathardi", 
      "Parner", 
      "Shrigonda", 
      "Rahata", 
      "Rahuri", 
      "Karjat", 
      "Jamkhed", 
      "Sangamner", 
      "Kopargaon", 
      "Akole"
    ],
    "Akola": [
      "Akola", 
      "Balapur", 
      "Patur", 
      "Barshitakli", 
      "Murtizapur"
    ],
    "Amravati": [
      "Amravati", 
      "Chandur Railway",
       "Daryapur", 
       "Morshi", 
       "Warud", 
       "Achalpur", 
       "Chikhaldara", 
      "Nandgaon Khandeshwar",
      "Anjangaon Surji"
    ],
    "Aurangabad": [
      "Aurangabad", 
      "Kannad", 
      "Soegaon", 
      "Sillod", 
      "Paithan", 
      "Vaijapur", 
      "Gangapur", 
      "Khuldabad"
    ],
    "Beed": [
      "Beed",
       "Georai",
       "Ashti", 
       "Patoda",
        "Shirur (Kasar)", 
        "Ambajogai", 
        "Kaij", 
        "Parli"
    ],
    "Buldhana": [
      "Buldhana", 
      "Chikhli", 
      "Deulgaon Raja", 
      "Jalgaon Jamod", 
      "Khamgaon", "Lonar", 
      "Malkapur", "Mehkar", 
      "Motala",
       "Nandura", 
       "Sangrampur", 
       "Shegaon"
    ],
    "Chandrapur": [
      "Chandrapur", 
      "Bhadravati", 
      "Warora", 
      "Chimur", 
      "Nagbhid", 
      "Bramhapuri", 
      "Mul", 
      "Saoli", 
      "Sindewahi", 
      "Ballarpur",
       "Rajura", 
       "Korpana",
        "Pombhurna",
         "Gondpipri"
    ],
    "Dhule": [
      "Dhule", 
      "Sakri", 
      "Shirpur", 
      "Sindkheda"
    ],
    "Gadchiroli": [
      "Gadchiroli", 
      "Aheri", 
      "Armori", 
      "Chamorshi", 
      "Desaiganj (Vadasa)", 
      "Dhanora", 
      "Etapalli", 
      "Kurkheda", 
      "Mulchera", 
      "Sironcha"
    ],
    "Gondia": [
      "Gondia", 
      "Amgaon", 
      "Arjuni Morgaon",
       "Deori", 
       "Goregaon", 
       "Sadak Arjuni", 
       "Salekasa",
        "Tirora"
    ],
    "Hingoli": [
      "Hingoli", 
      "Sengaon", 
      "Kalamnuri", 
      "Basmath", 
      "Aundha Nagnath"
    ],
    "Jalgaon": [
      "Jalgaon", 
      "Amalner", 
      "Bhadgaon", 
      "Bhusawal", 
      "Chalisgaon", 
      "Chopda", 
      "Dharangaon", 
      "Erandol", 
      "Jamner", 
      "Pachora", 
      "Parola", 
      "Raver", 
      "Yawal"
    ],
    "Jalna": [
      "Jalna", 
      "Ambad", 
      "Badnapur", 
      "Bhokardan", 
      "Ghansawangi", 
      "Mantha", 
      "Partur"
    ],
    "Kolhapur": [
      "Kolhapur", 
      "Panhala", 
      "Hatkanangle", 
      "Shirol", "Kagal", "Gadhinglaj", "Chandgad", "Ajra", "Bhudargad", 
      "Radhanagari", "Karvir"
    ],
    "Latur": [
      "Latur", 
      "Ausa", 
      "Chakur", 
      "Ahmedpur", 
      "Nilanga",
       "Renapur", 
       "Shirur Anantpal", 
       "Udgir", 
       "Deoni"
      
    ],
    "Mumbai City": [
      "Mumbai City",
       "South Mumbai",
        "Central Mumbai"
    ],
    "Mumbai Suburban": [
      "Andheri", 
      "Bandra", 
      "Borivali",
       "Dahisar", 
       "Jogeshwari", 
       "Kurla", 
       "Malad"
    ],
    "Nagpur": [
      "Nagpur City", 
      "Katol", 
      "Narkhed", 
      "Kalmeshwar", 
      "Umred", 
      "Hingna", 
      "Kamptee", 
      "Parseoni", 
      "Ramtek", 
      "Savner"
    ],
    "Nanded": [
      "Nanded", 
      "Hadgaon", 
      "Kinwat", 
      "Kandhar", 
      "Loha", 
      "Mudkhed", 
      "Deglur", 
      "Bhokar", 
      "Ardhapur", 
      "Naigaon", 
      "Biloli", 
      "Mahur"
    ],
    "Nandurbar": [
      "Nandurbar", 
      "Akkalkuwa", 
      "Shahada", 
      "Taloda", 
      "Akrani", 
      "Navapur"
    ],
    "Nashik": [
      "Baglan", 
      "Chandwad", 
      "Deola", 
      "Dindori", 
      "Igatpuri", 
      "Kalwan", 
      "Malegaon", 
      "Nandgaon", 
      "Nashik", 
      "Peint", 
      "Sinnar", 
      "Surgana", 
      "Trimbakeshwar", 
      "Yeola"
    ],
    "Osmanabad": [
      "Osmanabad", 
      "Paranda", 
      "Kallamb", 
      "Tuljapur", 
      "Washi", 
      "Bhum", 
      "Lohara"
    ],
    "Palghar": [
      "Palghar", 
      "Vasai", 
      "Dahanu", 
      "Vikramgad", 
      "Jawhar", 
      "Mokhada", 
      "Talasari", 
      "Wada"
    ],
    "Parbhani": [
      "Parbhani", 
      "Gangakhed", 
      "Pathri", 
      "Sonpeth", 
      "Jintur", 
      "Manwath", 
      "Palam", 
      "Purna", 
      "Sailu"
    ],
    "Pune": [
      "Pune City", 
      "Haveli", 
      "Mulshi", 
      "Maval", 
      "Bhor", 
      "Velhe", 
      "Junnar", 
      "Ambegaon", 
      "Baramati", 
      "Daund", 
      "Indapur", 
      "Shirur", 
      "Purandar", 
      "Khed"
    ],
    "Raigad": [
      "Alibag", 
      "Karjat", 
      "Khalapur", 
      "Mahad", 
      "Mangaon", 
      "Mhasla", 
      "Murud", 
      "Panvel", 
      "Pen", 
      "Poladpur", 
      "Roha", 
      "Shrivardhan", 
      "Sudhagad", 
      "Tala", 
      "Uran"
    ],
    "Ratnagiri": [
      "Ratnagiri", 
      "Chiplun", 
      "Dapoli", 
      "Guhagar", 
      "Khed", 
      "Lanja", 
      "Mandangad", 
      "Rajapur", 
      "Sangameshwar"
    ],
    "Sangli": [
      "Sangli", 
      "Miraj", 
      "Tasgaon", 
      "Kavathe Mahankal", 
      "Jat", 
      "Khanapur (Vita)", 
      "Atpadi", 
      "Walwa", 
      "Shirala"
    ],
    "Satara": [
      "Satara", 
      "Karad", 
      "Wai", 
      "Mahabaleshwar", 
      "Patan", 
      "Jaoli", 
      "Khandala", 
      "Phaltan", 
      "Man"
    ],
    "Sindhudurg": [
      "Kankavli", 
      "Kudal", 
      "Vengurla", 
      "Sawantwadi", 
      "Devgad", 
      "Malvan", 
      "Vaibhavwadi", 
      "Dodamarg"
    ],
    "Solapur": [
      "Solapur North", 
      "Solapur South", 
      "Akkalkot",
       "Barshi", 
       "Karmala", 
       "Madha", 
       "Mangalwedha", 
       "Malshiras", 
      "Pandharpur", 
      "Sangole"
    ],
    "Thane": [
      "Thane", 
      "Kalyan", 
      "Bhiwandi",
       "Murbad", 
       "Shahapur", 
       "Ulhasnagar", 
       "Ambernath"
    ],
    "Wardha": [

      "Wardha", 
      "Hinganghat", 
      "Deoli", 
      "Arvi", 
      "Seloo", 
      "Samudrapur"
    ],
    "Washim": [
      "Washim", 
      "Karanja", 
      "Malegaon", 
      "Mangrulpir", 
      "Risod"
    ],
    "Yavatmal": [
      "Yavatmal", 
      "Darwha", 
      "Digras", 
      "Ghatanji", 
      "Kalamb", 
      "Kelapur", 
      "Mahagaon", 
      "Ner", 
      "Pusad", 
      "Ralegaon", 
      "Umarkhed", 
      "Wani", 
      "Arni"
    ]
  };

  const villages = ["Nashik", "Dhule"];

  const requiredAsterisk = <span className="text-orange-500">*</span>;

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center p-4 bg-orange-500 text-white rounded-t-lg">
        <img src="/images/logo.png" alt="Ashok Stambh" className="w-20 h-20 mr-4" />
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">PROPERTY CERTIFICATE (ASSESSMENT EXTRACT)</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">BASIC DETAILS</h2>
          <div className="flex flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year {requiredAsterisk}</label>
              <select
                name="financialYear"
                value={formData.financialYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Year</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
              {errors.financialYear && <p className="text-red-500 text-xs mt-1">{errors.financialYear}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">District Name {requiredAsterisk}</label>
              <select
                name="districtName"
                value={formData.districtName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select District"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
              {errors.districtName && <p className="text-red-500 text-xs mt-1">{errors.districtName}</p>}
            </div>
          </div>

          <div className="flex flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Taluka Name {requiredAsterisk}</label>
              <select
                name="talukaName"
                value={formData.talukaName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={!formData.districtName}
                placeholder="Select Taluka"
              >
                <option value="">Select Taluka</option>
                {talukasByDistrict[formData.districtName]?.map((taluka, index) => (
                  <option key={index} value={taluka}>{taluka}</option>
                ))}
              </select>
              {errors.talukaName && <p className="text-red-500 text-xs mt-1">{errors.talukaName}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Village Name {requiredAsterisk}</label>
              <select
                name="villageName"
                value={formData.villageName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select Village"
              >
                <option value="">Select Village</option>
                {villages.map((village, index) => (
                  <option key={index} value={village}>{village}</option>
                ))}
              </select>
              {errors.villageName && <p className="text-red-500 text-xs mt-1">{errors.villageName}</p>}
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">PROPERTY OWNER DETAILS</h2>
          <div className="flex flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name {requiredAsterisk}</label>
              <input
                type="text"
                name="propertyOwnerFirstName"
                value={formData.propertyOwnerFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter First Name"
              />
              {errors.propertyOwnerFirstName && <p className="text-red-500 text-xs mt-1">{errors.propertyOwnerFirstName}</p>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="propertyOwnerMiddleName"
                value={formData.propertyOwnerMiddleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name {requiredAsterisk}</label>
              <input
                type="text"
                name="propertyOwnerLastName"
                value={formData.propertyOwnerLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Last Name"
              />
              {errors.propertyOwnerLastName && <p className="text-red-500 text-xs mt-1">{errors.propertyOwnerLastName}</p>}
            </div>
            <div className="w-1/2 pl-2"></div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">APPLICANT DETAILS</h2>
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2 text-gray-700">English</h3>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name(English) {requiredAsterisk}</label>
                <input
                  type="text"
                  name="applicantFirstNameEng"
                  value={formData.applicantFirstNameEng}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter First Name"
                />
                {errors.applicantFirstNameEng && <p className="text-red-500 text-xs mt-1">{errors.applicantFirstNameEng}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name(English)</label>
                <input
                  type="text"
                  name="applicantMiddleNameEng"
                  value={formData.applicantMiddleNameEng}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Middle Name"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name(English) {requiredAsterisk}</label>
                <input
                  type="text"
                  name="applicantLastNameEng"
                  value={formData.applicantLastNameEng}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Last Name"
                />
                {errors.applicantLastNameEng && <p className="text-red-500 text-xs mt-1">{errors.applicantLastNameEng}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No {requiredAsterisk}</label>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                />
                {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number {requiredAsterisk}</label>
                <input
                  type="text"
                  name="applicantAadhaar"
                  value={formData.applicantAadhaar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={12}
                  placeholder="Enter Aadhaar Number"
                />
                {errors.applicantAadhaar && <p className="text-red-500 text-xs mt-1">{errors.applicantAadhaar}</p>}
              </div>
              <div className="w-1/2 pl-2"></div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-md font-medium mb-2 text-gray-700">Devanagari</h3>
            <div className="flex flex-wrap mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name(Devanagari) {requiredAsterisk}</label>
                <input
                  type="text"
                  name="applicantFirstNameDev"
                  value={formData.applicantFirstNameDev}
                  onChange={handleMarathiInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="प्रथम नाव प्रविष्ट करा"
                />
                {errors.applicantFirstNameDev && <p className="text-red-500 text-xs mt-1">{errors.applicantFirstNameDev}</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name(Devanagari)</label>
                <input
                  type="text"
                  name="applicantMiddleNameDev"
                  value={formData.applicantMiddleNameDev}
                  onChange={handleMarathiInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="मध्य नाव प्रविष्ट करा"
                />
                {errors.applicantMiddleNameDev && <p className="text-red-500 text-xs mt-1">{errors.applicantMiddleNameDev}</p>}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name(Devanagari) {requiredAsterisk}</label>
                <input
                  type="text"
                  name="applicantLastNameDev"
                  value={formData.applicantLastNameDev}
                  onChange={handleMarathiInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="आडनाव प्रविष्ट करा"
                />
                {errors.applicantLastNameDev && <p className="text-red-500 text-xs mt-1">{errors.applicantLastNameDev}</p>}
              </div>
              <div className="w-1/2 pl-2"></div>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">CERTIFICATION DETAILS</h2>
          <div className="flex flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">No. of Copies {requiredAsterisk}</label>
              <select
                name="numCopies"
                value={formData.numCopies}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Select Number of Copies"
              >
                <option value="">Select Copies</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors.numCopies && <p className="text-red-500 text-xs mt-1">{errors.numCopies}</p>}
            </div>
            <div className="w-1/2 pl-2"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
};

export default PROPERTY_CERTIFICATE_FORM;