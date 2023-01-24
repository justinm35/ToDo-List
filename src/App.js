import './App.css';
import InfoBar from './components/infoBar'
import TaskBar from './components/taskBar'

function App() {
  return (
   
    <div className="app">
        <InfoBar userName="Alan"/>
        <TaskBar />
    </div>
  );
}

export default App;
