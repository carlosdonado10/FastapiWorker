import './App.css';
import  Navbar from './components/navbar';
import ProcessForm from './components/createForm';
import ProcessList from './components/processList';
import Container from '@mui/material/Container';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navbar refinery={"refinery1"} currentUser={"global_admin"}/>
      <br/>
      <Container>
        <Routes>
            <Route path={"/"} element={<ProcessForm/>}/>
            <Route path={"/list"} element={<ProcessList/>}/>
            <Route path={"/#home"} element={<ProcessList/>}/>
            <Route path={"/wizard"} element={<ProcessForm/>}/>
        </Routes>


      </Container>
    </div>
  );
}

export default App;
