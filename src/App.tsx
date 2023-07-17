import Home from "./components/Home"
import Nav from "./components/Nav"
function App() {
  return <>
  <Nav name={"Home"} />
  <div className="app bg-gray-20">
    <h1 className=" text-primary-500 text-center text-3xl pt-20">Recipe Explorer</h1>
    <br/>
    <p className="text-center text-md mt-[-20px] mb-10">Insert description here.</p>
    <Home/>
    </div>
  </>;
}
export default App;
