import Home from "./components/Home"
import Nav from "./components/Nav"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav name={"Home"} />
      <div className="flex-grow bg-gray-20">
        <h1 className="text-primary-500 text-center text-3xl pt-20">Recipe Explorer</h1>
        <br/>
        <p className="text-center text-md mt-[-20px] mb-10">Insert description here.</p>
        <Home />
      </div>
    </div>
  );
}

export default App;
