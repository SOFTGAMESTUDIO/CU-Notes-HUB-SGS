import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase';
import Layout from '../../components/Layout';
import { 
  FaFilePdf, 
  FaSearch, 
  FaCalendarAlt, 
  FaFilter, 
  FaSortAmountDownAlt,
  FaUniversity,
  FaGraduationCap,
  FaBook
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    semester: '',
    branch: '',
    course: '',
    category: '',
    sort: 'newest'
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(
          collection(db, 'notes'),
          where('published', '==', true)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate() || new Date(),
          };
        });

        // Initial sort by createdAt
        data.sort((a, b) => b.createdAt - a.createdAt);
        setNotes(data);
        setFilteredNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    let result = [...notes];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(note => 
        note.subject?.toLowerCase().includes(term) ||
        note.category?.toLowerCase().includes(term) ||
        note.semester?.toString().includes(term) ||
        note.branch?.toLowerCase().includes(term) ||
        note.course?.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'sort') {
        result = result.filter(note => 
          String(note[key] || '').toLowerCase() === value.toLowerCase()
        );
      }
    });
    
    // Apply sorting
    if (filters.sort === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (filters.sort === 'oldest') {
      result.sort((a, b) => a.createdAt - b.createdAt);
    } else if (filters.sort === 'size') {
      result.sort((a, b) => b.originalSize - a.originalSize);
    }
    
    setFilteredNotes(result);
  }, [searchTerm, filters, notes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFilterOptions = (field) => {
    const values = [...new Set(notes.map(note => note[field]))]
      .filter(Boolean)
      .sort();
    return values;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Mobile filter drawer
  const MobileFilterDrawer = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <motion.div 
        className="bg-white w-4/5 max-w-sm h-full overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Filter Options</h3>
          <button 
            onClick={() => setShowMobileFilters(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch
            </label>
            <div className="flex items-center">
              <FaUniversity className="text-gray-500 mr-2" />
              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Branches</option>
                {getFilterOptions('branch').map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <div className="flex items-center">
              <FaGraduationCap className="text-gray-500 mr-2" />
              <select
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Courses</option>
                {getFilterOptions('course').map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Semesters</option>
                {getFilterOptions('semester').map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="flex items-center">
              <FaBook className="text-gray-500 mr-2" />
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {getFilterOptions('category').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <div className="flex items-center">
              <FaSortAmountDownAlt className="text-gray-500 mr-2" />
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="size">Largest Files</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <button
              onClick={() => {
                setFilters({
                  semester: '',
                  branch: '',
                  course: '',
                  category: '',
                  sort: 'newest'
                });
                setSearchTerm('');
              }}
              className="flex-1 py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-xl p-6 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (notes.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
            <div className="text-5xl mb-4 text-gray-300">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Notes Available</h2>
            <p className="text-gray-600 mb-6">
              It looks like no notes have been published yet. Check back later or upload your own notes!
            </p>
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              onClick={() => window.location.href = '/upload'}
            >
              Upload Notes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
         <Helmet>
          {/* Primary Meta Tags */}
          <title>
            Notes -  CU STUDY HUB | Soft Game Studio
          </title>
        
          <meta
            name="title"
            content=" Notes -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            name="description"
            content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
          />

          
          <meta
            property="og:title"
            content=" Notes -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            property="og:description"
            content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:image:alt"
            content="Notes -  CU STUDY HUB | Soft Game Studio"
          />
          <meta property="og:locale" content="en_US" />

        
        </Helmet>
      {showMobileFilters && <MobileFilterDrawer />}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Explore Study Materials
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Access a curated collection of study notes, lecture materials, and exam resources
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by subject, branch, course..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Mobile Filter Button */}
            <div className="sm:hidden">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                <FaFilter className="text-gray-600" />
                <span>Filter Notes</span>
              </button>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="flex items-center">
                <FaUniversity className="text-gray-500 mr-2 min-w-[16px]" />
                <select
                  name="branch"
                  value={filters.branch}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">All Branches</option>
                  {getFilterOptions('branch').map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <FaGraduationCap className="text-gray-500 mr-2 min-w-[16px]" />
                <select
                  name="course"
                  value={filters.course}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">All Courses</option>
                  {getFilterOptions('course').map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2 min-w-[16px]" />
                <select
                  name="semester"
                  value={filters.semester}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">All Semesters</option>
                  {getFilterOptions('semester').map(sem => (
                    <option key={sem} value={sem}>Sem {sem}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <FaBook className="text-gray-500 mr-2 min-w-[16px]" />
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">All Categories</option>
                  {getFilterOptions('category').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <FaSortAmountDownAlt className="text-gray-500 mr-2 min-w-[16px]" />
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="size">Largest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.semester || filters.branch || filters.course || filters.category || searchTerm) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.branch && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                  Branch: {filters.branch}
                  <button 
                    className="ml-1.5 text-blue-800 hover:text-blue-600"
                    onClick={() => setFilters(prev => ({ ...prev, branch: '' }))}
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.course && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
                  Course: {filters.course}
                  <button 
                    className="ml-1.5 text-green-800 hover:text-green-600"
                    onClick={() => setFilters(prev => ({ ...prev, course: '' }))}
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.semester && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
                  Semester: {filters.semester}
                  <button 
                    className="ml-1.5 text-purple-800 hover:text-purple-600"
                    onClick={() => setFilters(prev => ({ ...prev, semester: '' }))}
                  >
                    ×
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-800">
                  Search: "{searchTerm}"
                  <button 
                    className="ml-1.5 text-orange-800 hover:text-orange-600"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </button>
                </span>
              )}
              
              <button 
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 underline"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    semester: '',
                    branch: '',
                    course: '',
                    category: '',
                    sort: 'newest'
                  });
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-medium">{filteredNotes.length}</span> of{' '}
            <span className="font-medium">{notes.length}</span> notes
          </p>
          
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <FaCalendarAlt className="mr-1.5" />
            <span>Sorted: {filters.sort === 'newest' ? 'Newest' : filters.sort === 'oldest' ? 'Oldest' : 'Largest'}</span>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4 text-gray-300">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes match your filters</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  semester: '',
                  branch: '',
                  course: '',
                  category: '',
                  sort: 'newest'
                });
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredNotes.map((note) => (
              <motion.div 
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="pr-2">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                        {note.subject || 'Untitled Subject'}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1.5 flex-shrink-0" />
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 flex-shrink-0">
                      {note.category || 'General'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 sm:mb-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium text-right">{note.branch || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium">{note.course || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Semester:</span>
                      <span className="font-medium">Sem {note.semester || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File Size:</span>
                      <span className="font-medium">{formatFileSize(note.originalSize)}</span>
                    </div>
                  </div>

                  

                  {/* <button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
                    onClick={() => window.open(note.fileUrl, '_blank')}
                  >
                    <FaFilePdf />
                    <span>View Notes</span>
                  </button> */}
                   <button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
                    onClick={() =>navigate(`/Notes/${note.id}`)}
                  >
                    <FaFilePdf />
                    <span>View Notes</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upload CTA */}
        {filteredNotes.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-1 w-full max-w-2xl">
              <div className="bg-white rounded-lg py-5 px-4 sm:px-6 shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Have notes to share?</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Contribute to the community by uploading your study materials
                </p>
                <button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
                  onClick={() => window.location.href = '/upload'}
                >
                  Upload Your Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}