import Home from "./components/Home"
import Nav from "./components/Nav"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-20">
        <Home />
      </div>
    </div>
  );
}

export default App;
