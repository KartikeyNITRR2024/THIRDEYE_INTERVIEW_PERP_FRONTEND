import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Folder from "./pages/Folder";
import Search from "./pages/Search";
import About from "./pages/About";
import Connect from "./pages/Connect";
import Course from "./pages/Course";
import { FolderProvider } from "./context/FolderContext";
import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <CourseProvider>
      <FolderProvider>
        <Router>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Course />} />
                <Route path="/folder" element={<Folder />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/connect" element={<Connect />} />
              </Routes>
            </main>

            <Toaster position="bottom-right" reverseOrder={false} />
          </div>
        </Router>
      </FolderProvider>
    </CourseProvider>
  );
}

export default App;