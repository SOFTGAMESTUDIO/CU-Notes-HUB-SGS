import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  X,
  Loader2,
  FileText,
  Calendar,
  BookOpen,
  Clock,
  File,
  FileBarChart,
  FileArchive,
  FileDigit,
  Book,
  Layers,
  FileStack,
} from "lucide-react";
import Layout from "../components/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../database/firebase";
import { FaFilePdf, FaHeart } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    semester: "All",
    branch: "All",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const navigate = useNavigate();

  // Updated stats state
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalCourses: 0,
    totalBranches: 0,
    totalSubjects: 0,
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesCollection = collection(db, "notes");
      const q = query(notesCollection, where("published", "==", true));
      const snapshot = await getDocs(q);

      const notesData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          let downloadUrl = "";

          try {
            const fileRef = ref(storage, data.fileUrl);
            downloadUrl = await getDownloadURL(fileRef);
          } catch (error) {
            console.error("Download URL error:", error);
          }

          // Format date
          const formattedDate =
            data.createdAt?.toDate()?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }) || "Unknown";

          return {
            id: doc.id,
            ...data,
            downloadUrl,
            createdAt: formattedDate,
            uploadedAt: data.createdAt?.toDate() || new Date(),
            // Generate title from subject and semester
            title: `${data.subject || "Untitled"} - Sem ${
              data.semester || "N/A"
            }`,
          };
        })
      );

      // Sort by newest first
      notesData.sort((a, b) => b.uploadedAt - a.uploadedAt);
      setNotes(notesData);
      calculateStats(notesData);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setIsLoading(false);
    }
  };

  const calculateStats = (notes) => {
    // Calculate unique values
    const courses = [...new Set(notes.map((note) => note.course))].filter(
      Boolean
    );
    const branches = [...new Set(notes.map((note) => note.branch))].filter(
      Boolean
    );
    const subjects = [...new Set(notes.map((note) => note.subject))].filter(
      Boolean
    );

    setStats({
      totalNotes: notes.length,
      totalCourses: courses.length,
      totalBranches: branches.length,
      totalSubjects: subjects.length,
    });
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.semester?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filters.category === "All" || note.category === filters.category;

    const matchesSemester =
      filters.semester === "All" || note.semester === filters.semester;

    const matchesBranch =
      filters.branch === "All" || note.branch === filters.branch;

    return matchesSearch && matchesCategory && matchesSemester && matchesBranch;
  });

  const categories = [
    "All",
    ...new Set(notes.map((note) => note.category || "Basic")),
  ];
  const semesters = [
    "All",
    ...new Set(notes.map((note) => note.semester || "N/A")),
  ];
  const branches = [
    "All",
    ...new Set(notes.map((note) => note.branch || "N/A")),
  ];

  const FileIcon = ({ category }) => {
    const icons = {
      Basic: FileText,
      Simple: FileBarChart,
      Advanced: FileDigit,
      Other: FileArchive,
    };

    const Icon = icons[category] || File;
    return <Icon className="w-5 h-5" />;
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div
      className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-lg text-white`}
    >
      <div className="flex items-center">
        <div className="bg-white/20 p-3 rounded-lg mr-4">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-light opacity-90">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );

  const NoteCard = ({ note }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="pr-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
              {note.subject || "Untitled Subject"}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span>{note.createdAt}</span>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 flex-shrink-0">
            {note.category || "General"}
          </span>
        </div>

        <div className="space-y-2 mb-4 sm:mb-5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Branch:</span>
            <span className="font-medium text-right">
              {note.branch || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Course:</span>
            <span className="font-medium">{note.course || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Semester:</span>
            <span className="font-medium">Sem {note.semester || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Author:</span>
            <span className="font-medium">{note.Name || "Livesh"}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/Notes/${note.id}`)}
          download
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 sm:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          <FaFilePdf />
          <span>View Notes</span>
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>CU STUDY HUB | Soft Game Studio</title>

        <meta name="title" content=" CU STUDY HUB | Soft Game Studio" />
        <meta
          name="description"
          content="Free Notes share and Access a curated collection of study notes, lecture materials, and exam resources"
        />

        <meta property="og:title" content=" CU STUDY HUB | Soft Game Studio" />
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
          content="CU STUDY HUB | Soft Game Studio"
        />
        <meta property="og:locale" content="en_US" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 mb-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:24px_24px]"></div>
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 mr-3 text-blue-200" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  Academic Resource Hub
                </h1>
              </div>
              <p className="text-lg text-blue-100 mb-8">
                Discover, share, and excel with curated study materials from
                Computer Science students
              </p>
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search notes by subject, semester or course..."
                  className="block w-full pl-10 pr-3 py-3.5 border-0 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full opacity-10" />
          </div>

          {/* Updated Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={FileStack}
              title="Total Notes"
              value={stats.totalNotes}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={Book}
              title="Courses"
              value={stats.totalCourses}
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              icon={Layers}
              title="Branches"
              value={stats.totalBranches}
              color="from-green-500 to-green-600"
            />
            <StatCard
              icon={BookOpen}
              title="Subjects"
              value={stats.totalSubjects}
              color="from-indigo-500 to-indigo-600"
            />
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                <select
                  className="bg-transparent text-gray-700 text-sm focus:outline-none"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                <select
                  className="bg-transparent text-gray-700 text-sm focus:outline-none"
                  value={filters.semester}
                  onChange={(e) =>
                    setFilters({ ...filters, semester: e.target.value })
                  }
                >
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester: {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                <select
                  className="bg-transparent text-gray-700 text-sm focus:outline-none"
                  value={filters.branch}
                  onChange={(e) =>
                    setFilters({ ...filters, branch: e.target.value })
                  }
                >
                  {branches.map((br) => (
                    <option key={br} value={br}>
                      Branch: {br}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700"
            >
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-gray-500 bg-opacity-75">
              <div className="bg-white rounded-lg shadow-xl max-w-xs mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Category
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setFilters({ ...filters, category })}
                          className={`px-3 py-2 text-sm rounded-md ${
                            filters.category === category
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Semester
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {semesters.map((semester) => (
                        <button
                          key={semester}
                          onClick={() => setFilters({ ...filters, semester })}
                          className={`px-3 py-2 text-sm rounded-md ${
                            filters.semester === semester
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {semester}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Branch
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {branches.map((branch) => (
                        <button
                          key={branch}
                          onClick={() => setFilters({ ...filters, branch })}
                          className={`px-3 py-2 text-sm rounded-md ${
                            filters.branch === branch
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Clock className="w-6 h-6 text-indigo-600 mr-3" />
                Latest Study Materials
              </h2>
              <button
                className="md:w-40 w-full mt-6 md:mt-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
                onClick={() => navigate(`/Notes/${note.id}`)}
              >
                <FaFilePdf />
                <span>Explore Notes</span>
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="ml-3 text-gray-600">Loading notes...</span>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                <File className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No notes found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.slice(0, 6).map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            )}
          </section>

          {/* Features Section */}
          <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 mb-12 border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Why Our Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Diverse Content
                </h3>
                <p className="text-gray-600">
                  Comprehensive collection covering all branches, courses, and
                  subjects for complete academic coverage.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Smart Filtering
                </h3>
                <p className="text-gray-600">
                  Find exactly what you need with our advanced filtering by
                  category, semester, branch, and subject.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Quality Control
                </h3>
                <p className="text-gray-600">
                  Community-rated content with detailed metadata ensures you get
                  the best study materials.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-white rounded-2xl p-8 mb-12 border border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Join Our Community
              </h2>
              <p className="text-gray-600 mb-6">
                Share your knowledge, access valuable resources, and connect
                with fellow students.
              </p>
              <button
                onClick={() => navigate("/Upload")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Upload Your Notes
              </button>
            </div>
          </section>

           {/* Suport Us Button */}
          <div>
            <button
              onClick={() => navigate("/SuportUS")}
              className=" fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
            >
              
             <FaHeart className="text-white" />
      <span className="font-semibold">Support Us</span>
            </button>
            </div>
        </div>
      </div>
    </Layout>
  );
}
