import React, { useState } from 'react';

// Add this helper function at the top of your component
const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const FormComponent: React.FC = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    textbox1: '',
    textbox2: '',
    selectOption: '',
    radioOption: '',
    paymentMethod: '',
    utrNumber: '',
    date: '',
    time: ''
  });

  // Modify the handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply capitalization only for name fields in Section 1
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
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
        <h1 className="text-2xl font-bold flex-grow text-center pr-16">DIGITALLY SIGNED 7/12</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* SECTION 1 */}
        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Owner's Details</h2>
          <div className="flex flex-row flex-wrap mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 capitalize"
                placeholder="Enter First Name"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-sm font-medium text-white-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 capitalize"
                placeholder="Enter Middle Name"
              />
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-sm font-medium text-white-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 capitalize"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="w-1/2 pl-2 invisible">
              {/* Empty div to maintain layout */}
            </div>
          </div>
        </div>

        {/* SECTION 2 */}

        <div className="mb-6 p-4 bg-white-50 rounded-lg border border-blue-400 border-l-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-600">Property Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-white-700 mb-1">District</label>
              <select 
                name="selectOption"
                value={formData.selectOption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select District</option>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Akola">Akola</option>
                <option value="Amravati">Amravati</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Beed">Beed</option>
                <option value="Bhandara">Bhandara</option>
                <option value="Buldhana">Buldhana</option>
                <option value="Chandrapur">Chandrapur</option>
                <option value="Dhule">Dhule</option>
                <option value="Gadchiroli">Gadchiroli</option>
                <option value="Gondia">Gondia</option>
                <option value="Hingoli">Hingoli</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Jalna">Jalna</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Latur">Latur</option>
                <option value="Mumbai City">Mumbai City</option>
                <option value="Mumbai Suburban">Mumbai Suburban</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nanded">Nanded</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Nashik">Nashik</option>
                <option value="Osmanabad">Osmanabad</option>
                <option value="Palghar">Palghar</option>
                <option value="Parbhani">Parbhani</option>
                <option value="Pune">Pune</option>
                <option value="Raigad">Raigad</option>
                <option value="Ratnagiri">Ratnagiri</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Sindhudurg">Sindhudurg</option>
                <option value="Solapur">Solapur</option>
                <option value="Thane">Thane</option>
                <option value="Wardha">Wardha</option>
                <option value="Washim">Washim</option>
                <option value="Yavatmal">Yavatmal</option>
              </select>
            </div>
          <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Taluka</label>
              <select 
                name="selectOption"
                value={formData.selectOption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Taluka</option>
                <option value="Achalpur">Achalpur</option>
                <option value="Aheri">Aheri</option>
                <option value="Ahmedpur">Ahmedpur</option>
                <option value="Ajra">Ajra</option>
                <option value="Akkalkot">Akkalkot</option>
                <option value="Akkalkuwa">Akkalkuwa</option>
                <option value="Akola">Akola</option>
                <option value="Akole">Akole</option>
                <option value="Akot">Akot</option>
                <option value="Alibag">Alibag</option>
                <option value="Amalner">Amalner</option>
                <option value="Ambad">Ambad</option>
                <option value="Ambajogai">Ambajogai</option>
                <option value="Ambarnath">Ambarnath</option>
                <option value="Ambegaon">Ambegaon</option>
                <option value="Amgaon">Amgaon</option>
                <option value="Amravati">Amravati</option>
                <option value="Andheri">Andheri</option>
                <option value="Anjangaon-Surji">Anjangaon-Surji</option>
                <option value="Ardhapur">Ardhapur</option>
                <option value="Arjuni Morgaon">Arjuni Morgaon</option>
                <option value="Armori">Armori</option>
                <option value="Arni">Arni</option>
                <option value="Arvi">Arvi</option>
                <option value="Ashti">Ashti</option>
                <option value="Atpadi">Atpadi</option>
                <option value="Aundha Nagnath">Aundha Nagnath</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Ausa">Ausa</option>
                <option value="Babhulgaon">Babhulgaon</option>
                <option value="Badnapur">Badnapur</option>
                <option value="Baglan">Baglan</option>
                <option value="Balapur">Balapur</option>
                <option value="Ballarpur">Ballarpur</option>
                <option value="Baramati">Baramati</option>
                <option value="Barshi">Barshi</option>
                <option value="Barshitakli">Barshitakli</option>
                <option value="Basmath">Basmath</option>
                <option value="Beed">Beed</option>
                <option value="Bhadgaon">Bhadgaon</option>
                <option value="Bhadravati">Bhadravati</option>
                <option value="Bhamragad">Bhamragad</option>
                <option value="Bhandara">Bhandara</option>
                <option value="Bhatkuli">Bhatkuli</option>
                <option value="Bhiwandi">Bhiwandi</option>
                <option value="Bhiwapur">Bhiwapur</option>
                <option value="Bhokar">Bhokar</option>
                <option value="Bhokardan">Bhokardan</option>
                <option value="Bhor">Bhor</option>
                <option value="Bhudargad">Bhudargad</option>
                <option value="Bhum">Bhum</option>
                <option value="Bhusawal">Bhusawal</option>
                <option value="Biloli">Biloli</option>
                <option value="Bodwad">Bodwad</option>
                <option value="Borivali">Borivali</option>
                <option value="Bramhapuri">Bramhapuri</option>
                <option value="Buldhana">Buldhana</option>
                <option value="Chakur">Chakur</option>
                <option value="Chalisgaon">Chalisgaon</option>
                <option value="Chamorshi">Chamorshi</option>
                <option value="Chandgad">Chandgad</option>
                <option value="Chandrapur">Chandrapur</option>
                <option value="Chandur">Chandur</option>
                <option value="Chandurbazar">Chandurbazar</option>
                <option value="Chandwad">Chandwad</option>
                <option value="Chikhaldara">Chikhaldara</option>
                <option value="Chikhli">Chikhli</option>
                <option value="Chimur">Chimur</option>
                <option value="Chiplun">Chiplun</option>
                <option value="Chopda">Chopda</option>
                <option value="Dahanu">Dahanu</option>
                <option value="Dapoli">Dapoli</option>
                <option value="Darwha">Darwha</option>
                <option value="Daryapur">Daryapur</option>
                <option value="Daund">Daund</option>
                <option value="Deglur">Deglur</option>
                <option value="Deol">Deol</option>
                <option value="Deoli">Deoli</option>
                <option value="Deoni">Deoni</option>
                <option value="Deori">Deori</option>
                <option value="Desaiganj">Desaiganj</option>
                <option value="Deulgaon Raja">Deulgaon Raja</option>
                <option value="Devgad">Devgad</option>
                <option value="Dhadgaon">Dhadgaon</option>
                <option value="Dhamangaon">Dhamangaon</option>
                <option value="Dhanora">Dhanora</option>
                <option value="Dharangaon">Dharangaon</option>
                <option value="Dharmabad">Dharmabad</option>
                <option value="Dharni">Dharni</option>
                <option value="Dharur">Dharur</option>
                <option value="Dhule">Dhule</option>
                <option value="Digras">Digras</option>
                <option value="Dindori">Dindori</option>
                <option value="Dodamarg">Dodamarg</option>
                <option value="Erandol">Erandol</option>
                <option value="Etapalli">Etapalli</option>
                <option value="Gadchiroli">Gadchiroli</option>
                <option value="Gadhinglaj">Gadhinglaj</option>
                <option value="Gaganbawada">Gaganbawada</option>
                <option value="Gangakhed">Gangakhed</option>
                <option value="Gangapur">Gangapur</option>
                <option value="Georai">Georai</option>
                <option value="Ghansawangi">Ghansawangi</option>
                <option value="Ghatanji">Ghatanji</option>
                <option value="Gondia">Gondia</option>
                <option value="Gondpimpri">Gondpimpri</option>
                <option value="Goregaon">Goregaon</option>
                <option value="Guhagar">Guhagar</option>
                <option value="Hadgaon">Hadgaon</option>
                <option value="Hatkanangale">Hatkanangale</option>
                <option value="Haveli">Haveli</option>
                <option value="Himayatnagar">Himayatnagar</option>
                <option value="Hinganghat">Hinganghat</option>
                <option value="Hingna">Hingna</option>
                <option value="Hingoli">Hingoli</option>
                <option value="Igatpuri">Igatpuri</option>
                <option value="Indapur">Indapur</option>
                <option value="Jafrabad">Jafrabad</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Jalgaon Jamod">Jalgaon Jamod</option>
                <option value="Jalkot">Jalkot</option>
                <option value="Jalna">Jalna</option>
                <option value="Jamkhed">Jamkhed</option>
                <option value="Jamner">Jamner</option>
                <option value="Jaoli">Jaoli</option>
                <option value="Jat">Jat</option>
                <option value="Jawhar">Jawhar</option>
                <option value="Jintur">Jintur</option>
                <option value="Jiwati">Jiwati</option>
                <option value="Junnar">Junnar</option>
                <option value="Kadegaon">Kadegaon</option>
                <option value="Kagal">Kagal</option>
                <option value="Kaij">Kaij</option>
                <option value="Kalamb">Kalamb</option>
                <option value="Kalameshwar">Kalameshwar</option>
                <option value="Kalamnuri">Kalamnuri</option>
                <option value="Kalwan">Kalwan</option>
                <option value="Kalyan">Kalyan</option>
                <option value="Kamptee">Kamptee</option>
                <option value="Kandhar">Kandhar</option>
                <option value="Kankavli">Kankavli</option>
                <option value="Kannad">Kannad</option>
                <option value="Karad">Karad</option>
                <option value="Karanja">Karanja</option>
                <option value="Karjat">Karjat</option>
                <option value="Karmala">Karmala</option>
                <option value="Karvir">Karvir</option>
                <option value="Katol">Katol</option>
                <option value="Kavathemahankal">Kavathemahankal</option>
                <option value="Kelapur">Kelapur</option>
                <option value="Khalapur">Khalapur</option>
                <option value="Khamgaon">Khamgaon</option>
                <option value="Khanapur (Vita)">Khanapur (Vita)</option>
                <option value="Khandala">Khandala</option>
                <option value="Khatav">Khatav</option>
                <option value="Khed">Khed</option>
                <option value="Khuldabad">Khuldabad</option>
                <option value="Kinwat">Kinwat</option>
                <option value="Kopargaon">Kopargaon</option>
                <option value="Korchi">Korchi</option>
                <option value="Koregaon">Koregaon</option>
                <option value="Korpana">Korpana</option>
                <option value="Kudal">Kudal</option>
                <option value="Kuhi">Kuhi</option>
                <option value="Kurkheda">Kurkheda</option>
                <option value="Kurla">Kurla</option>
                <option value="Lakhandur">Lakhandur</option>
                <option value="Lakhani">Lakhani</option>
                <option value="Lanja">Lanja</option>
                <option value="Latur">Latur</option>
                <option value="Loha">Loha</option>
                <option value="Lohara">Lohara</option>
                <option value="Lonar">Lonar</option>
                <option value="Maan">Maan</option>
                <option value="Madha">Madha</option>
                <option value="Mahabaleshwar">Mahabaleshwar</option>
                <option value="Mahad">Mahad</option>
                <option value="Mahagaon">Mahagaon</option>
                <option value="Mahur">Mahur</option>
                <option value="Majalgaon">Majalgaon</option>
                <option value="Malegaon">Malegaon</option>
                <option value="Malkapur">Malkapur</option>
                <option value="Malshiras">Malshiras</option>
                <option value="Malwan">Malwan</option>
                <option value="Mandangad">Mandangad</option>
                <option value="Mangalvedhe">Mangalvedhe</option>
                <option value="Mangaon">Mangaon</option>
                <option value="Mangrulpir">Mangrulpir</option>
                <option value="Manora">Manora</option>
                <option value="Mantha">Mantha</option>
                <option value="Manwath">Manwath</option>
                <option value="Maregaon">Maregaon</option>
                <option value="Maval">Maval</option>
                <option value="Mehkar">Mehkar</option>
                <option value="Mhasala">Mhasala</option>
                <option value="Miraj">Miraj</option>
                <option value="Mohol">Mohol</option>
                <option value="Mokhada">Mokhada</option>
                <option value="Morshi">Morshi</option>
                <option value="Motala">Motala</option>
                <option value="Mouda">Mouda</option>
                <option value="Mudkhed">Mudkhed</option>
                <option value="Mukhed">Mukhed</option>
                <option value="Muktainagar">Muktainagar</option>
                <option value="Mul">Mul</option>
                <option value="Mulchera">Mulchera</option>
                <option value="Mulshi">Mulshi</option>
                <option value="Murbad">Murbad</option>
                <option value="Murtajapur">Murtajapur</option>
                <option value="Murud">Murud</option>
                <option value="Nagar">Nagar</option>
                <option value="Nagbhid">Nagbhid</option>
                <option value="Nagpur Rural">Nagpur Rural</option>
                <option value="Nagpur Urban">Nagpur Urban</option>
                <option value="Naigaon">Naigaon</option>
                <option value="Nanded">Nanded</option>
                <option value="Nandgaon">Nandgaon</option>
                <option value="Nandgaon Khandeshwar">Nandgaon Khandeshwar</option>
                <option value="Nandura">Nandura</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Narkhed">Narkhed</option>
                <option value="Nashik">Nashik</option>
                <option value="Navapur">Navapur</option>
                <option value="Ner">Ner</option>
                <option value="Nevasa">Nevasa</option>
                <option value="Nilanga">Nilanga</option>
                <option value="Niphad">Niphad</option>
                <option value="Osmanabad">Osmanabad</option>
                <option value="Pachora">Pachora</option>
                <option value="Paithan">Paithan</option>
                <option value="Palam">Palam</option>
                <option value="Palghar">Palghar</option>
                <option value="Palus">Palus</option>
                <option value="Pandharpur">Pandharpur</option>
                <option value="Panhala">Panhala</option>
                <option value="Panvel">Panvel</option>
                <option value="Paranda">Paranda</option>
                <option value="Parbhani">Parbhani</option>
                <option value="Parli">Parli</option>
                <option value="Parner">Parner</option>
                <option value="Parola">Parola</option>
                <option value="Parseoni">Parseoni</option>
                <option value="Partur">Partur</option>
                <option value="Patan">Patan</option>
                <option value="Pathardi">Pathardi</option>
                <option value="Pathri">Pathri</option>
                <option value="Patoda">Patoda</option>
                <option value="Patur">Patur</option>
                <option value="Pauni">Pauni</option>
                <option value="Pen">Pen</option>
                <option value="Peth">Peth</option>
                <option value="Phaltan">Phaltan</option>
                <option value="Phulambri">Phulambri</option>
                <option value="Poladpur">Poladpur</option>
                <option value="Pombhurna">Pombhurna</option>
                <option value="Pune City">Pune City</option>
                <option value="Purandhar (Saswad)">Purandhar (Saswad)</option>
                <option value="Purna">Purna</option>
                <option value="Pusad">Pusad</option>
                <option value="Radhanagari">Radhanagari</option>
                <option value="Rahata">Rahata</option>
                <option value="Rahuri">Rahuri</option>
                <option value="Rajapur">Rajapur</option>
                <option value="Rajura">Rajura</option>
                <option value="Ralegaon">Ralegaon</option>
                <option value="Ramtek">Ramtek</option>
                <option value="Ratnagiri">Ratnagiri</option>
                <option value="Raver">Raver</option>
                <option value="Renapur">Renapur</option>
                <option value="Risod">Risod</option>
                <option value="Roha">Roha</option>
                <option value="Sadak-Arjuni">Sadak-Arjuni</option>
                <option value="Sailu">Sailu</option>
                <option value="Sakoli">Sakoli</option>
                <option value="Sakri">Sakri</option>
                <option value="Salekasa">Salekasa</option>
                <option value="Samudrapur">Samudrapur</option>
                <option value="Sangameshwar">Sangameshwar</option>
                <option value="Sangamner">Sangamner</option>
                <option value="Sangole">Sangole</option>
                <option value="Sangrampur">Sangrampur</option>
                <option value="Saoli">Saoli</option>
                <option value="Satara">Satara</option>
                <option value="Savner">Savner</option>
                <option value="Sawantwadi">Sawantwadi</option>
                <option value="Seloo">Seloo</option>
                <option value="Sengaon">Sengaon</option>
                <option value="Shahada">Shahada</option>
                <option value="Shahapur">Shahapur</option>
                <option value="Shahuwadi">Shahuwadi</option>
                <option value="Shegaon">Shegaon</option>
                <option value="Shevgaon">Shevgaon</option>
                <option value="Shirala">Shirala</option>
                <option value="Shirol">Shirol</option>
                <option value="Shirpur">Shirpur</option>
                <option value="Shirur">Shirur</option>
                <option value="Shirur Anantpal">Shirur Anantpal</option>
                <option value="Shirur-Kasar">Shirur-Kasar</option>
                <option value="Shrigonda">Shrigonda</option>
                <option value="Shrirampur">Shrirampur</option>
                <option value="Shrivardhan">Shrivardhan</option>
                <option value="Sillod">Sillod</option>
                <option value="Sindewahi">Sindewahi</option>
                <option value="Sindkhed Raja">Sindkhed Raja</option>
                <option value="Sindkheda">Sindkheda</option>
                <option value="Sinnar">Sinnar</option>
                <option value="Sironcha">Sironcha</option>
                <option value="Soegaon">Soegaon</option>
                <option value="Solapur North">Solapur North</option>
                <option value="Solapur South">Solapur South</option>
                <option value="Sonpeth">Sonpeth</option>
                <option value="Sudhagad-Pali">Sudhagad-Pali</option>
                <option value="Surgana">Surgana</option>
                <option value="Tala">Tala</option>
                <option value="Talasari">Talasari</option>
                <option value="Talode">Talode</option>
                <option value="Tasgaon">Tasgaon</option>
                <option value="Telhara">Telhara</option>
                <option value="Thane">Thane</option>
                <option value="Tiosa">Tiosa</option>
                <option value="Tiroda">Tiroda</option>
                <option value="Trimbakeshwar">Trimbakeshwar</option>
                <option value="Tuljapur">Tuljapur</option>
                <option value="Tumsar">Tumsar</option>
                <option value="Udgir">Udgir</option>
                <option value="Ulhasnagar">Ulhasnagar</option>
                <option value="Umarga">Umarga</option>
                <option value="Umarkhed">Umarkhed</option>
                <option value="Umred">Umred</option>
                <option value="Umri">Umri</option>
                <option value="Uran">Uran</option>
                <option value="Vada">Vada</option>
                <option value="Vaibhavwadi">Vaibhavwadi</option>
                <option value="Vaijapur">Vaijapur</option>
                <option value="Vasai">Vasai</option>
                <option value="Velhe">Velhe</option>
                <option value="Vengurla">Vengurla</option>
                <option value="Vikramgad">Vikramgad</option>
                <option value="Wadwani">Wadwani</option>
                <option value="Wai">Wai</option>
                <option value="Walwa">Walwa</option>
                <option value="Wani">Wani</option>
                <option value="Wardha">Wardha</option>
                <option value="Warora">Warora</option>
                <option value="Warud">Warud</option>
                <option value="Washi">Washi</option>
                <option value="Washim">Washim</option>
                <option value="Yavatmal">Yavatmal</option>
                <option value="Yawal">Yawal</option>
                <option value="Yeola">Yeola</option>
                <option value="Zari Jamani">Zari Jamani</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Village</label>
              <select 
                name="selectOption"
                value={formData.selectOption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Village</option>
                <option value="Ahmednagar">Nashik</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700 mb-1">Survey Number</label>
              <input
                type="text"
                name="textBox2"
                value={formData.textbox2}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter Survey Number"
              />
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
            <label className="block text-sm font-medium text-white-700 mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>
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
              <label className="block text-sm font-medium text-white-700 mb-2">Scan QR Code</label>
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
                <label className="block text-sm font-medium text-white-700 mb-1">UTR Number</label>
                <input
                  type="text"
                  name="utrNumber"
                  value={formData.utrNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-white-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter UTR Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white-700 mb-1">Payment Proof</label>
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
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white-500">
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