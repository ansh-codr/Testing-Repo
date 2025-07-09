'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSpreadsheet, Check, AlertCircle, Download } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { toast } from 'react-toastify';

export default function ExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
        setUploadStatus('idle');
      } else {
        toast.error('Please select a valid Excel file (.xlsx)');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Simulate upload for static build
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus('success');
      toast.success('Excel file uploaded and processed successfully! (Demo mode)');
    } catch (error) {
      setUploadStatus('error');
      toast.error('Upload feature not available in static build');
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      ['id', 'name', 'class', 'section', 'rollNo', 'dob', 'fatherName', 'motherName', 'phone', 'email', 'address', 'subjects', 'attendance', 'fees', 'passcode'],
      ['DPS001', 'John Doe', '10', 'A', '15', '2008-03-15', 'Robert Doe', 'Jane Doe', '9876543210', 'john.doe@email.com', '123 Main St, Mathura', 'Math,Science,English,Hindi,Social Science', '95%', 'Paid', '1234']
    ];

    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6">
            <FileSpreadsheet className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Upload Student Data
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload Excel files containing student information for the portal system
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Template Download */}
          <GlassCard>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Download Template</h3>
              <p className="text-gray-300 mb-4">
                Download the Excel template with the correct format for student data
              </p>
              <button
                onClick={downloadTemplate}
                className="bg-blue-500/20 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Download className="h-5 w-5" />
                <span>Download Template</span>
              </button>
            </div>
          </GlassCard>

          {/* File Upload */}
          <GlassCard>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-6">Upload Excel File</h3>
              
              {/* File Input */}
              <div className="mb-6">
                <label className="block">
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 hover:border-yellow-400/50 transition-colors cursor-pointer">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Click to select Excel file</p>
                    <p className="text-gray-400 text-sm">Only .xlsx files are supported</p>
                  </div>
                </label>
              </div>

              {/* Selected File */}
              {file && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-green-400" />
                    <span className="text-white">{file.name}</span>
                    <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 px-8 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload File</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {uploadStatus === 'success' && (
                <div className="mt-6 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Check className="h-5 w-5" />
                    <span>File uploaded successfully!</span>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span>Upload failed. Please try again.</span>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Instructions */}
          <GlassCard>
            <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">1.</span>
                <p>Download the template file to see the required format</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">2.</span>
                <p>Fill in your student data following the exact column structure</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">3.</span>
                <p>Save the file as .xlsx format</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">4.</span>
                <p>Upload the file using the form above</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 font-bold">5.</span>
                <p>Students can then login using their ID and passcode</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}