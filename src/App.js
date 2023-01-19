import './App.css';
import InfoBar from './components/infoBar'
import TaskBar from './components/taskBar'

function App() {
  return (
    <div className="App">
        <InfoBar userName="Alan"/>
        <TaskBar />
    </div>
  );
}

export default App;
