import {BrowserRouter,Route, Routes,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
//pages&components
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const {admin} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route 
          path="/"
          element={ admin ? <Home/>: <Navigate to = "/login" /> }
          />
          <Route 
          path="/login"
          element={!admin ? <Login/>: <Navigate to = "/"/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
