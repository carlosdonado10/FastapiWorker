import './App.css';
import  Navbar from './components/navbar'
import ProcessForm from './components/createForm'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


// const views = [{key: 1, caption: 'createProcess'}, {key: 2, caption: 'viewProcesses'}]

// let currentView = 1
// let processId = undefined

// let getTitle = (currentView) => "Create Process" ? currentView === 1 : "Process Logs"

function App() {
  return (
    <div className="App">
      <Navbar refinery={"refinery1"} currentUser={"global_admin"}/>
      <br/>
      <Container>
          <Typography className={"ScreenName"} variant={"h3"} component={"div"}>
              {"Create Process"}
          </Typography>

          <Paper elevation={3}>
          <ProcessForm/>

          </Paper>
      </Container>
    </div>
  );
}

export default App;
