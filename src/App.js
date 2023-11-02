
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Guidelines } from './components/templates/guidelines';
import {Quiz} from "./components/templates/quizapp/quiz"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Guidelines/>}/>
      <Route path="/quizstarted" element={<Quiz/>}/>
    </Routes>
  );
}

export default App;
