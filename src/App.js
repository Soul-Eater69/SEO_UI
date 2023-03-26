import "./App.css";
import { Routes, Route } from "react-router-dom"
import IndexPage from "./components/IndexPage";
import AuditPage from "./components/AuditPage";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<IndexPage/>} path={"/"}/>
        <Route element={<AuditPage/>} path={"/*"}/>
      </Routes>
      
    </div>
  );
}

export default App;
