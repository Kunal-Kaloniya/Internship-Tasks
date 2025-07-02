import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SubmitForm from "./components/SubmitForm";
import AdminPanel from "./components/AdminPanel";
import PublishedPapers from "./components/PublishedPapers";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to='/'>Submit</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/published">Published</Link>
      </div>

      <Routes>
        <Route path='/' element={<SubmitForm />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/published' element={<PublishedPapers />} />
      </Routes>
    </Router>
  );
}

export default App;