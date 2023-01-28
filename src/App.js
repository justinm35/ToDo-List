import './App.css';
import InfoBar from './components/infoBar'
import TaskBar from './components/taskBar'
import DateBar from './components/dateBar'

function App() {
  return (
   
    <div className="app">
      <DateBar/>
      <TaskBar />
      <h1 className="author">Developed By Justin Martin</h1>
    </div>
  );
}

export default App;
