// src/pages/NoteDetail.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../database/firebase';
import Layout from '../../components/Layout';
import { 
  FaFilePdf, 
  FaCalendarAlt, 
  FaDownload, 
  FaArrowLeft,
  FaShareAlt,
  FaWhatsapp,
  FaTelegram,
  FaLink,
  FaCheck
} from 'react-icons/fa';
import { Helmet } from 'react-helmet';

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeHeight, setIframeHeight] = useState('80vh');
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareDropdownRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) return;
        
        const docRef = doc(db, 'notes', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const noteData = docSnap.data();
          setNote({
            id: docSnap.id,
            ...noteData,
            createdAt: noteData.createdAt?.toDate() || new Date(),
          });
        } else {
          setError('Note not found');
        }
      } catch (err) {
        console.error('Error fetching note:', err);
        setError('Failed to load note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Adjust iframe height on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        setIframeHeight('60vh');
      } else if (window.innerWidth < 1024) { // Tablet
        setIframeHeight('70vh');
      } else { // Desktop
        setIframeHeight('80vh');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const getShareUrl = () => {
    return `${window.location.origin}/notes/${id}`;
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `Check out this study note on CU STUDY HUB:\n${note.subject}\n${getShareUrl()}`
    )}`;
    window.open(url, '_blank');
    setShowShareDropdown(false);
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(
      `Check out this study note: ${note.subject}`
    )}`;
    window.open(url, '_blank');
    setShowShareDropdown(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded-lg w-1/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
            <div className="text-5xl mb-4 text-red-500">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Note</h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{note.subject || 'Note Details'} - CU STUDY HUB | Soft Game Studio</title>
        <meta
          name="description"
          content={`View ${note.subject || 'study note'} details and PDF content`}
        />
        <meta
          property="og:title"
          content={`${note.subject || 'Note Details'} - CU STUDY HUB`}
        />
        <meta
          property="og:description"
          content={`Detailed view of ${note.subject || 'study note'} with PDF viewer`}
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/ing.png?alt=media&token=30ec48dc-f618-4d39-a69c-2aaaac7f7269"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Notes
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Note Details Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {note.subject || 'Untitled Note'}
                </h1>
                <div className="flex items-center text-gray-600">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {note.category || 'General'}
                  </span>
                  <span className="ml-2 text-sm flex items-center">
                    <FaCalendarAlt className="mr-1.5" />
                    {formatDate(note.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="relative" ref={shareDropdownRef}>
                  <button
                    onClick={() => setShowShareDropdown(!showShareDropdown)}
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    <FaShareAlt />
                    <span>Share</span>
                  </button>
                  
                  {showShareDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                      <button
                        onClick={shareOnWhatsApp}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <FaWhatsapp className="text-green-500 mr-3 text-lg" />
                        <span>Share on WhatsApp</span>
                      </button>
                      <button
                        onClick={shareOnTelegram}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <FaTelegram className="text-blue-400 mr-3 text-lg" />
                        <span>Share on Telegram</span>
                      </button>
                      <button
                        onClick={copyLink}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {copied ? (
                          <FaCheck className="text-green-500 mr-3 text-lg" />
                        ) : (
                          <FaLink className="text-gray-500 mr-3 text-lg" />
                        )}
                        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <a
                  href={note.fileUrl}
                  download
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  <FaDownload />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Note Metadata */}
          <div className="p-4 sm:p-6 border-b">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Branch</h3>
                <p className="text-gray-900 font-medium">{note.branch || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Course</h3>
                <p className="text-gray-900 font-medium">{note.course || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Semester</h3>
                <p className="text-gray-900 font-medium">Sem {note.semester || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">File Size</h3>
                <p className="text-gray-900 font-medium">{formatFileSize(note.originalSize)}</p>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full p-4">
            <div className="border rounded-xl overflow-hidden shadow-md">
              <div className="bg-gray-50 px-4 py-2 border-b flex items-center text-gray-600">
                <FaFilePdf className="text-red-500 mr-2" />
                <span className="text-sm font-medium">PDF Viewer</span>
              </div>
              
              {note.fileUrl ? (
                <iframe 
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(note.fileUrl)}&embedded=true`}
                  title={note.subject || 'PDF Viewer'}
                  className="w-full bg-gray-100"
                  style={{ height: iframeHeight }}
                  frameBorder="0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-gray-50">
                  <div className="text-5xl text-gray-300 mb-4">📄</div>
                  <p className="text-gray-500">PDF file not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}