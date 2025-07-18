import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../database/firebase';
import { Link } from 'react-router-dom';

export default function AdminNotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [publishedNotes, setPublishedNotes] = useState([]);
  const [unpublishedNotes, setUnpublishedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('published');
  const [editingNote, setEditingNote] = useState(null);
  const [editForm, setEditForm] = useState({
    subject: '',
    branch: '',
    course: '',
    semester: '',
    category: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllNotes();
  }, []);

  useEffect(() => {
    const published = notes.filter(note => note.published);
    const unpublished = notes.filter(note => !note.published);
    setPublishedNotes(published);
    setUnpublishedNotes(unpublished);
  }, [notes]);

  const fetchAllNotes = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'notes'));
      const data = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ...d,
          downloadUrl: d.fileUrl,
          createdAt: d.createdAt?.toDate()?.toLocaleString() || 'Unknown',
        };
      });
      setNotes(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('❌ Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (noteId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'notes', noteId), { published: !currentStatus });
      setNotes(prev => prev.map(n => n.id === noteId ? { ...n, published: !currentStatus } : n));
    } catch (err) {
      console.error(err);
      setError('❌ Could not change publish status');
    }
  };

  const deleteNote = async (noteId, fileName) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      if (fileName) {
        const fileRef = ref(storage, `notes/${fileName}`);
        await deleteObject(fileRef);
      }
      await deleteDoc(doc(db, 'notes', noteId));
      setNotes(prev => prev.filter(n => n.id !== noteId));
      closeEditModal();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Failed to delete the note.');
    }
  };

  const publishAll = async () => {
    try {
      const unpublishedIds = unpublishedNotes.map(note => note.id);
      const batchUpdates = unpublishedIds.map(id => 
        updateDoc(doc(db, 'notes', id), { published: true })
      );
      
      await Promise.all(batchUpdates);
      setNotes(prev => prev.map(n => 
        unpublishedIds.includes(n.id) ? { ...n, published: true } : n
      ));
    } catch (err) {
      console.error('Publish all error:', err);
      setError('❌ Failed to publish all notes');
    }
  };

  const unpublishAll = async () => {
    try {
      const publishedIds = publishedNotes.map(note => note.id);
      const batchUpdates = publishedIds.map(id => 
        updateDoc(doc(db, 'notes', id), { published: false })
      );
      
      await Promise.all(batchUpdates);
      setNotes(prev => prev.map(n => 
        publishedIds.includes(n.id) ? { ...n, published: false } : n
      ));
    } catch (err) {
      console.error('Unpublish all error:', err);
      setError('❌ Failed to unpublish all notes');
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setEditForm({
      subject: note.subject || '',
      branch: note.branch || '',
      course: note.course || '',
      semester: note.semester || '',
      category: note.category || ''
    });
  };

  const closeEditModal = () => {
    setEditingNote(null);
    setEditForm({
      subject: '',
      branch: '',
      course: '',
      semester: '',
      category: ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveNoteChanges = async () => {
    if (!editingNote) return;
    
    try {
      await updateDoc(doc(db, 'notes', editingNote.id), {
        subject: editForm.subject,
        branch: editForm.branch,
        course: editForm.course,
        semester: editForm.semester,
        category: editForm.category
      });
      
      setNotes(prev => prev.map(n => 
        n.id === editingNote.id ? { ...n, ...editForm } : n
      ));
      
      closeEditModal();
    } catch (err) {
      console.error('Update error:', err);
      setError('❌ Failed to update note details');
    }
  };

  const filteredNotes = (notesArray) => {
    if (!searchTerm) return notesArray;
    
    const term = searchTerm.toLowerCase();
    return notesArray.filter(note => 
      note.subject?.toLowerCase().includes(term) ||
      note.branch?.toLowerCase().includes(term) ||
      note.course?.toLowerCase().includes(term) ||
      note.semester?.toLowerCase().includes(term) ||
      note.category?.toLowerCase().includes(term) ||
      note.Name?.toLowerCase().includes(term) ||
      note.RollNo?.toLowerCase().includes(term)
    );
  };

  const currentNotes = activeTab === 'published' 
    ? filteredNotes(publishedNotes) 
    : filteredNotes(unpublishedNotes);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-3xl mx-auto mt-8">
      <div className="flex">
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Edit Note Details</h3>
                <button 
                  onClick={closeEditModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={editForm.subject}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={editForm.branch}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={editForm.course}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={editForm.semester}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Basic">Basic</option>
                    <option value="Professional">Professional</option>
                    <option value="Humanities">Humanities</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNoteChanges}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notes Management</h1>
            <p className="mt-2 text-gray-600">Manage all uploaded notes and their publication status</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => fetchAllNotes()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Refresh Data
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
            <Link to={"/Upload"}>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Add New Note
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Notes</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{notes.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{publishedNotes.length}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {notes.length > 0 ? Math.round((publishedNotes.length / notes.length) * 100) : 0}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Unpublished</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{unpublishedNotes.length}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                        {notes.length > 0 ? Math.round((unpublishedNotes.length / notes.length) * 100) : 0}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search notes by subject, branch, course, semester, or uploader..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('published')}
              className={`${
                activeTab === 'published'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Published Notes
              {publishedNotes.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {publishedNotes.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('unpublished')}
              className={`${
                activeTab === 'unpublished'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Unpublished Notes
              {unpublishedNotes.length > 0 && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {unpublishedNotes.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Bulk Actions */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing {currentNotes.length} {activeTab === 'published' ? 'published' : 'unpublished'} notes
          </div>
          <div className="flex flex-wrap gap-2">
            {activeTab === 'published' && publishedNotes.length > 0 && (
              <button
                onClick={unpublishAll}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
              >
                Unpublish All
              </button>
            )}
            {activeTab === 'unpublished' && unpublishedNotes.length > 0 && (
              <button
                onClick={publishAll}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Publish All
              </button>
            )}
          </div>
        </div>

        {/* Notes Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {currentNotes.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notes found</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are currently no {activeTab === 'published' ? 'published' : 'unpublished'} notes.
                {searchTerm && " Try adjusting your search query."}
              </p>
              <div className="mt-6">
                <Link to={"/Upload"}>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Upload New Note
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Subject', 'Branch', 'Course', 'Semester', 'Category', 'Uploaded By', 'Date', 'Actions'].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentNotes.map((note) => (
                    <tr key={note.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{note.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {note.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {note.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {note.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {note.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="font-medium">{note.Name}</div>
                        <div className="text-gray-400">{note.RollNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {note.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <a
                          href={note.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                        <button
                          onClick={() => openEditModal(note)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => togglePublishStatus(note.id, note.published)}
                          className={`${
                            note.published 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {note.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deleteNote(note.id, note.fileName)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden mt-6 space-y-4">
          {currentNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{note.subject}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      Branch: {note.branch}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      Course: {note.course}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      Sem: {note.semester}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {note.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full 
                      ${note.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {note.published ? 'Published' : 'Unpublished'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <div>
                  <span className="text-gray-500">Uploaded by:</span> {note.Name}
                </div>
                <div>
                  <span className="text-gray-500">Roll No:</span> {note.RollNo}
                </div>
                <div>
                  <span className="text-gray-500">Date:</span> {note.createdAt}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={note.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium py-2 px-3 rounded transition"
                >
                  View
                </a>
                <button
                  onClick={() => openEditModal(note)}
                  className="text-center bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-medium py-2 px-3 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublishStatus(note.id, note.published)}
                  className={`text-center py-2 px-3 rounded text-sm font-medium transition ${
                    note.published 
                      ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' 
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {note.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => deleteNote(note.id, note.fileName)}
                  className="text-center bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium py-2 px-3 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}