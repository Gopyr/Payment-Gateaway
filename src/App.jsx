import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Layouts/Main";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Konten utama */}
      <main className="flex-1">
        <Main />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
