// https://www.youtube.com/watch?v=oAaS9ix8pes
import Timer from './components/Timer/Timer';
import Analysis from './components/Analysis/Analysis';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet"></link>
          <Route exact path="/" component = {Timer}/>
          <Route path = "/analysis" component = {Analysis}/>
    </HashRouter>
  );
}

export default App;
