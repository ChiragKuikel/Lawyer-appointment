import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { specialityData } from '../assets/assets';

const Lawyers = () => {
  const navigate = useNavigate();
  const { lawyers } = useContext(AppContext);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const lawyersPerPage = 9;

  // Experience filter options
  const experienceOptions = ['All', '0-3 Years', '3-5 Years', '5-10 Years', '10+ Years'];

  useEffect(() => {
    filterAndSortLawyers();
  }, [searchTerm, selectedSpeciality, selectedExperience, sortBy, lawyers]);

  const filterAndSortLawyers = () => {
    let filtered = [...lawyers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lawyer.degree && lawyer.degree.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply speciality filter
    if (selectedSpeciality !== 'All') {
      filtered = filtered.filter(lawyer => lawyer.speciality === selectedSpeciality);
    }

    // Apply experience filter
    if (selectedExperience !== 'All') {
      filtered = filtered.filter(lawyer => {
        const years = parseInt(lawyer.experience);
        switch(selectedExperience) {
          case '0-3 Years':
            return years <= 3;
          case '3-5 Years':
            return years > 3 && years <= 5;
          case '5-10 Years':
            return years > 5 && years <= 10;
          case '10+ Years':
            return years > 10;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience-desc':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'experience-asc':
          return parseInt(a.experience) - parseInt(b.experience);
        case 'fees-low':
          return a.fees - b.fees;
        case 'fees-high':
          return b.fees - a.fees;
        default:
          return 0;
      }
    });

    setFilteredLawyers(filtered);
    setCurrentPage(1);
  };

  // Get current lawyers for pagination
  const indexOfLastLawyer = currentPage * lawyersPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - lawyersPerPage;
  const currentLawyers = filteredLawyers.slice(indexOfFirstLawyer, indexOfLastLawyer);
  const totalPages = Math.ceil(filteredLawyers.length / lawyersPerPage);

  const handleSpecialityClick = (speciality) => {
    setSelectedSpeciality(speciality);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpeciality('All');
    setSelectedExperience('All');
    setSortBy('name');
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Lawyers</h1>
        <p className="text-gray-600 text-lg">
          Find and book appointments with experienced lawyers specializing in various legal fields
        </p>
        <p className="text-primary font-semibold mt-2">
          {filteredLawyers.length} lawyers available
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, speciality, or degree..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3">
          {/* Speciality Filter */}
          <select
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="All">All Specialities</option>
            {specialityData.map((item) => (
              <option key={item.speciality} value={item.speciality}>
                {item.speciality}
              </option>
            ))}
          </select>

          {/* Experience Filter */}
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="name">Sort by: Name</option>
            <option value="experience-desc">Sort by: Experience (High to Low)</option>
            <option value="experience-asc">Sort by: Experience (Low to High)</option>
            <option value="fees-low">Sort by: Fees (Low to High)</option>
            <option value="fees-high">Sort by: Fees (High to Low)</option>
          </select>

          {/* Clear Filters Button */}
          {(searchTerm || selectedSpeciality !== 'All' || selectedExperience !== 'All') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">🔲</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">📋</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedSpeciality !== 'All' || selectedExperience !== 'All') && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900">✕</button>
            </span>
          )}
          {selectedSpeciality !== 'All' && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {selectedSpeciality}
              <button onClick={() => setSelectedSpeciality('All')} className="ml-1 hover:text-green-900">✕</button>
            </span>
          )}
          {selectedExperience !== 'All' && (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {selectedExperience}
              <button onClick={() => setSelectedExperience('All')} className="ml-1 hover:text-purple-900">✕</button>
            </span>
          )}
        </div>
      )}

      {/* Lawyers Display */}
      {currentLawyers.length > 0 ? (
        viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLawyers.map((lawyer) => (
              <LawyerCard 
                key={lawyer._id} 
                lawyer={lawyer} 
                onClick={() => navigate(`/appointment/${lawyer._id}`)}
              />
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {currentLawyers.map((lawyer) => (
              <LawyerListItem 
                key={lawyer._id} 
                lawyer={lawyer} 
                onClick={() => navigate(`/appointment/${lawyer._id}`)}
              />
            ))}
          </div>
        )
      ) : (
        // No Results
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No lawyers found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredLawyers.length > lawyersPerPage && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            Previous
          </button>
          
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-opacity-90'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Grid View Card Component
const LawyerCard = ({ lawyer, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
          Available
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{lawyer.name}</h3>
        <p className="text-primary font-medium mb-2">{lawyer.speciality}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded">⭐ {lawyer.experience}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{lawyer.degree}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">${lawyer.fees}</span>
            <span className="text-gray-500 text-sm">/hour</span>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// List View Component
const LawyerListItem = ({ lawyer, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
    >
      <div className="md:w-48 h-48">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
            <p className="text-primary font-medium">{lawyer.speciality}</p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Available
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-gray-500 text-sm">Experience</p>
            <p className="font-medium">{lawyer.experience}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Degree</p>
            <p className="font-medium">{lawyer.degree}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Fees</p>
            <p className="font-medium text-primary">${lawyer.fees}/hour</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm line-clamp-2">{lawyer.about}</p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap ml-4">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;