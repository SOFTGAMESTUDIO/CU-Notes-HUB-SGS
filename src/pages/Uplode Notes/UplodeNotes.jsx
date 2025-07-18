// src/pages/UploadNotes.js
import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../database/firebase';
import Layout from '../../components/Layout';
import { PDFDocument } from 'pdf-lib';
import { FaFilePdf, FaCompressArrowsAlt, FaCloudUploadAlt, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

export default function UploadNotes() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: '',
    branch: '',
    subject: '',
    semester: '',
    category: 'Basic'
  });
  const [file, setFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [compressionRatio, setCompressionRatio] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf') {
      setMessage({ text: '❌ Only PDF files are allowed', type: 'error' });
      return;
    }

    setOriginalFile(selectedFile);
    setFileName(selectedFile.name);
    setCompressionRatio(null);
    setMessage({ text: '⏳ Compressing PDF...', type: 'info' });
    
    // Create preview URL
    setPreviewUrl(URL.createObjectURL(selectedFile));
    
    // Auto-compress the file
    try {
      setCompressionProgress(0);
      setUploading(true);
      
      // Load the PDF
      setCompressionProgress(20);
      const existingPdfBytes = await selectedFile.arrayBuffer();
      
      // Create a new PDF document
      setCompressionProgress(40);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Optimize PDF
      setCompressionProgress(60);
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        compress: true,
        removeUnusedObjects: true,
        objectStreams: true,
      });
      
      setCompressionProgress(80);
      
      // Calculate compression ratio
      const originalSize = selectedFile.size;
      const compressedSize = compressedPdfBytes.byteLength;
      const ratio = Math.round((1 - (compressedSize / originalSize)) * 100);
      
      // Create new blob
      const compressedBlob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      const compressedFile = new File([compressedBlob], selectedFile.name, {
        type: 'application/pdf',
        lastModified: Date.now()
      });
      
      setFile(compressedFile);
      setCompressionRatio(ratio);
      setMessage({ 
        text: `✅ PDF compressed! Size reduced by ${ratio}%`, 
        type: 'success' 
      });
      
      setCompressionProgress(100);
      
      // Reset progress after a delay
      setTimeout(() => setCompressionProgress(0), 2000);
    } catch (err) {
      console.error('Compression error:', err);
      setFile(selectedFile);
      setMessage({ 
        text: '❌ Compression failed. Using original file.', 
        type: 'error' 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!file || !formData.subject || !formData.semester) {
      setMessage({ 
        text: '⚠️ Please fill all required fields', 
        type: 'warning' 
      });
      return;
    }

    setUploading(true);
    setMessage({ text: '📤 Uploading your notes...', type: 'info' });

    try {
      const timestamp = Date.now();
      const fileExtension = fileName.split('.').pop();
      const finalFileName = `${formData.subject}-${formData.semester}-${timestamp}.${fileExtension}`;

      // Upload to Firebase Storage
      const fileRef = ref(storage, `notes/${finalFileName}`);
      await uploadBytes(fileRef, file);

      // Get download URL
      const fileUrl = await getDownloadURL(fileRef);

      // Save metadata in Firestore
      await addDoc(collection(db, 'notes'), {
        Name: formData.name,
        RollNo: formData.rollNo,
        course: formData.course,
        branch: formData.branch,
        subject: formData.subject,
        semester: formData.semester,
        category: formData.category,
        fileUrl,
        fileName: finalFileName,
        published: false,
        createdAt: serverTimestamp(),
        originalSize: originalFile?.size || 0,
        compressedSize: file.size,
        compressionRatio: compressionRatio || 0
      });

      setMessage({ 
        text: '🎉 Notes uploaded successfully!', 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        name: '',
        rollNo: '',
        course: '',
        branch: '',
        subject: '',
        semester: '',
        category: 'Basic'
      });
      setFile(null);
      setOriginalFile(null);
      setFileName('');
      setCompressionRatio(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clear success message after delay
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ 
        text: '❌ Failed to upload notes. Please try again.', 
        type: 'error' 
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Layout>
         <Helmet>
          {/* Primary Meta Tags */}
          <title>
           Uplode Notes -  CU STUDY HUB | Soft Game Studio
          </title>
        
          <meta
            name="title"
            content=" Uplode Notes -  CU STUDY HUB | Soft Game Studio"
          />
          <meta
            name="description"
            content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
          />

          
          <meta
            property="og:title"
            content=" Uplode Notes -  CU STUDY HUB | Soft Game Studio"
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
            content="Uplode Notes -  CU STUDY HUB | Soft Game Studio"
          />
          <meta property="og:locale" content="en_US" />

        
        </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
              <FaFilePdf className="mr-3 text-red-600" />
              Smart PDF Uploader
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Automatically compress PDF files without quality loss before uploading to the server. 
              Save storage space while preserving all content and quality.
            </p>
          </div>

          {/* Status Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
              message.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              message.type === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              'bg-green-100 text-green-800 border border-green-200'
            }`}>
              <div className="font-medium flex items-center justify-center">
                {message.text}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Upload Your Notes
              </h2>
              
              <form onSubmit={handleUpload} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number*</label>
                    <input
                      type="text"
                      name="rollNo"
                      placeholder="20230001"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
                    <input
                      type="text"
                      name="course"
                      placeholder="BCA/B.Tech"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch*</label>
                    <input
                      type="text"
                      name="branch"
                      placeholder="Computer Science"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    />
                  </div>
                
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Mathematics"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester*</label>
                    <input
                      type="text"
                      name="semester"
                      placeholder="Semester 5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Simple">Simple</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Reference">Reference Material</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF*</label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    {file ? (
                      <div className="flex flex-col items-center">
                        <FaFilePdf className="text-5xl text-red-500 mb-3" />
                        <p className="font-medium text-gray-800 truncate max-w-xs">{fileName}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1">
                            {formatFileSize(originalFile?.size || 0)}
                            {compressionRatio !== null && (
                              <span className="text-green-600 ml-2">
                                → {formatFileSize(file.size)} (Saved {compressionRatio}%)
                              </span>
                            )}
                          </span>
                        </div>
                        {compressionProgress > 0 && (
                          <div className="w-full max-w-xs mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${compressionProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Compressing... {compressionProgress}%
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-4">
                        <FaCloudUploadAlt className="text-5xl text-blue-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Click to select a PDF file</p>
                        <p className="text-sm text-gray-500 mt-2">Files will be compressed automatically</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!file || uploading}
                  className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center transition-all ${
                    uploading ? 'bg-blue-400 cursor-not-allowed' : 
                    'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                  }`}
                >
                  {uploading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaCloudUploadAlt className="mr-3 text-lg" />
                      Upload Compressed PDF
                    </span>
                  )}
                </button>
              </form>
            </div>
            
            {/* Preview & Info Section */}
            <div className="space-y-8">
              {/* Preview Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  PDF Preview
                </h2>
                
                {previewUrl ? (
                  <div className="relative">
                    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                      <iframe 
                        src={previewUrl} 
                        title="PDF Preview" 
                        className="w-full h-96"
                        frameBorder="0"
                      ></iframe>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="flex items-center">
                        <FaInfoCircle className="mr-2 text-blue-500" />
                        Note: This preview shows the original PDF. The compressed version maintains the same visual quality.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8">
                      <FaFilePdf className="text-6xl text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No PDF Selected</h3>
                      <p className="text-gray-500">Upload a PDF to see a preview</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Compression Info */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  How It Works
                </h2>
                
                <div className="space-y-5">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Upload PDF</h3>
                      <p className="text-gray-600">Select any PDF file from your device. Our system automatically detects and processes it.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Lossless Compression</h3>
                      <p className="text-gray-600">Your PDF is compressed without any quality loss. Text remains sharp, images retain their clarity.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Secure Upload</h3>
                      <p className="text-gray-600">The compressed file is securely uploaded to our servers. Your data is always protected.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                      <FaCompressArrowsAlt className="mr-2" />
                      Compression Benefits
                    </h3>
                    <ul className="text-blue-700 space-y-1">
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>5MB files reduced to under 500KB</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Zero quality loss - perfect for academic materials</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Faster uploads and downloads</span>
                      </li>
                      <li className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Reduced storage costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}