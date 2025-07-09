'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Download, Eye, Phone, Mail, Shield, Lock } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { toast } from 'react-toastify';

interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  dob: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  subjects: string[];
  attendance: string;
  fees: string;
}

interface VerificationData {
  dob: string;
  name: string;
  fatherName: string;
  motherName: string;
}

export default function StudentSearch() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    dob: '',
    name: '',
    fatherName: '',
    motherName: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const searchFilters = [
    { id: 'all', name: 'All Fields', icon: <Users className="h-4 w-4" /> },
    { id: 'name', name: 'Name', icon: <Users className="h-4 w-4" /> },
    { id: 'class', name: 'Class', icon: <Filter className="h-4 w-4" /> },
    { id: 'id', name: 'Student ID', icon: <Search className="h-4 w-4" /> },
  ];

  const searchStudents = useCallback(async (query: string, filter: string) => {
    setIsLoading(true);
    try {
      // Mock student data for static build
      const mockStudents = [
        {
          id: 'DPS001',
          name: 'Arjun Sharma',
          class: '10',
          section: 'A',
          rollNo: '15',
          dob: '2008-03-15',
          fatherName: 'Rajesh Sharma',
          motherName: 'Priya Sharma',
          phone: '9876543210',
          email: 'arjun.sharma@email.com',
          address: '123 Main St, Mathura',
          subjects: ['Math', 'Science', 'English', 'Hindi', 'Social Science'],
          attendance: '95%',
          fees: 'Paid'
        },
        {
          id: 'DPS002',
          name: 'Priya Gupta',
          class: '10',
          section: 'B',
          rollNo: '12',
          dob: '2008-07-22',
          fatherName: 'Suresh Gupta',
          motherName: 'Meera Gupta',
          phone: '9876543211',
          email: 'priya.gupta@email.com',
          address: '456 Park Ave, Mathura',
          subjects: ['Math', 'Science', 'English', 'Hindi', 'Social Science'],
          attendance: '92%',
          fees: 'Paid'
        }
      ];

      // Filter based on query and filter
      let filtered = mockStudents;
      if (query) {
        const searchQuery = query.toLowerCase();
        filtered = filtered.filter(student => {
          const searchableFields = [
            student.name?.toLowerCase() || '',
            student.id?.toLowerCase() || '',
            student.class?.toLowerCase() || '',
            student.fatherName?.toLowerCase() || '',
            student.motherName?.toLowerCase() || ''
          ];
          return searchableFields.some(field => field.includes(searchQuery));
        });
      }

      setStudents(filtered);
      setFilteredStudents(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchStudents(searchQuery, selectedFilter);
  }, [searchQuery, selectedFilter, searchStudents]);

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowVerificationModal(true);
    setVerificationData({
      dob: '',
      name: '',
      fatherName: '',
      motherName: ''
    });
  };

  const handleVerification = async () => {
    if (!selectedStudent) return;

    setIsVerifying(true);

    // Normalize strings for comparison (remove extra spaces, convert to lowercase)
    const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');

    const isValid = 
      normalize(verificationData.dob) === normalize(selectedStudent.dob) &&
      normalize(verificationData.name) === normalize(selectedStudent.name) &&
      normalize(verificationData.fatherName) === normalize(selectedStudent.fatherName) &&
      normalize(verificationData.motherName) === normalize(selectedStudent.motherName);

    setTimeout(() => {
      if (isValid) {
        setShowVerificationModal(false);
        toast.success('Verification successful! Student details unlocked.');
        // Show the student details modal after verification
        setTimeout(() => {
          setSelectedStudent(selectedStudent);
        }, 500);
      } else {
        toast.error('Verification failed. Please check the information and try again.');
      }
      setIsVerifying(false);
    }, 1500); // Simulate verification delay
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Class', 'Section', 'Roll No', 'Father Name', 'Mother Name', 'Phone', 'Email'],
      ...filteredStudents.map(student => [
        student.id,
        student.name,
        student.class,
        student.section,
        student.rollNo,
        student.fatherName,
        student.motherName,
        student.phone,
        student.email
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_search_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleVerificationChange = (field: keyof VerificationData, value: string) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 glow-border pulse-glow"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Search className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold holographic-text mb-4">
            Student Search
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-exo">
            Search and filter through student records with advanced security verification
          </p>
        </motion.div>

        {/* Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard glow={true}>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students by name, ID, class, or parent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 futuristic-input rounded-lg font-exo"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {searchFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg font-exo font-medium transition-all duration-300 flex items-center space-x-2 ${
                      selectedFilter === filter.id
                        ? 'golden-glow text-black'
                        : 'glow-border text-cyan-300 hover:bg-cyan-400/10'
                    }`}
                  >
                    {filter.icon}
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={filteredStudents.length === 0}
                className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed glow-border font-exo"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 font-exo">
                {isLoading ? 'Searching...' : `Found ${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full" glow={true}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-orbitron font-bold text-cyan-300 mb-1">{student.name}</h3>
                    <p className="text-yellow-400 font-exo font-medium">ID: {student.id}</p>
                    <p className="text-gray-400 font-exo">Class {student.class} - {student.section}</p>
                    <p className="text-gray-400 font-exo">Roll No: {student.rollNo}</p>
                  </div>
                  <motion.button
                    onClick={() => handleViewDetails(student)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500/20 text-blue-400 p-2 rounded-lg hover:bg-blue-500/30 transition-colors glow-border"
                  >
                    <Shield className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-500 font-exo">Father: {student.fatherName}</p>
                    <p className="text-gray-500 font-exo">Mother: {student.motherName}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 text-xs font-exo">{student.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-exo ${
                      student.fees === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {student.fees}
                    </span>
                    <span className="text-yellow-400 text-xs font-exo">
                      {student.attendance} Attendance
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {!isLoading && filteredStudents.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GlassCard glow={true}>
              <div className="text-gray-400">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-orbitron font-semibold mb-2">No students found</h3>
                <p className="font-exo">Try adjusting your search query or filter options</p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Verification Modal */}
        {showVerificationModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowVerificationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card glow-border rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Lock className="h-8 w-8 text-cyan-400" />
                  </motion.div>
                  <h2 className="text-2xl font-orbitron font-bold text-cyan-300 glow-text">Security Verification</h2>
                </div>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 font-exo text-center mb-4">
                  To view detailed information for <span className="text-cyan-300 font-semibold">{selectedStudent.name}</span>, 
                  please verify the following information:
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-exo font-medium text-gray-400 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    placeholder="Enter date of birth (e.g., 2008-03-15)"
                    value={verificationData.dob}
                    onChange={(e) => handleVerificationChange('dob', e.target.value)}
                    className="w-full px-4 py-3 futuristic-input rounded-lg font-exo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-exo font-medium text-gray-400 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full student name"
                    value={verificationData.name}
                    onChange={(e) => handleVerificationChange('name', e.target.value)}
                    className="w-full px-4 py-3 futuristic-input rounded-lg font-exo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-exo font-medium text-gray-400 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter father's full name"
                    value={verificationData.fatherName}
                    onChange={(e) => handleVerificationChange('fatherName', e.target.value)}
                    className="w-full px-4 py-3 futuristic-input rounded-lg font-exo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-exo font-medium text-gray-400 mb-2">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter mother's full name"
                    value={verificationData.motherName}
                    onChange={(e) => handleVerificationChange('motherName', e.target.value)}
                    className="w-full px-4 py-3 futuristic-input rounded-lg font-exo"
                  />
                </div>
              </div>

              <motion.button
                onClick={handleVerification}
                disabled={isVerifying || !verificationData.dob || !verificationData.name || !verificationData.fatherName || !verificationData.motherName}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 golden-glow text-black font-orbitron font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Verify & View Details</span>
                  </>
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 font-exo">
                  All information must match exactly to access student details
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Student Detail Modal (shown after successful verification) */}
        {selectedStudent && !showVerificationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card glow-border rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-300 glow-text">Student Details</h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Name</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Student ID</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Class & Section</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.class} - {selectedStudent.section}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Roll Number</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.rollNo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Date of Birth</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.dob}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Father's Name</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.fatherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Mother's Name</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.motherName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Phone</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Email</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Address</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-exo font-medium text-gray-500">Subjects</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedStudent.subjects?.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-exo"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Attendance</label>
                    <p className="text-cyan-300 font-exo">{selectedStudent.attendance}</p>
                  </div>
                  <div>
                    <label className="text-sm font-exo font-medium text-gray-500">Fee Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-exo ${
                      selectedStudent.fees === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedStudent.fees}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}