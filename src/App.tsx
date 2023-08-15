import Home from "./components/Home"
import Nav from "./components/Nav"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gradient-to-b from-gray-20 to-primary-100">
        <Home />
      </div>
    </div>
  );
}

export default App;
