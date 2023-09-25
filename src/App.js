
import {BrowserRouter, Routes , Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useAuthContext } from './hooks/useAuthContext';
import Edit from './pages/Edit'
import Create from './pages/Create';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={user ? < Home /> : <Navigate to='/login' />}/>
          <Route path='/login' element={!user ? < Login /> : <Navigate to='/' />}/>
          <Route path='/signup' element={!user ? < Signup /> : <Navigate to='/' />}/>
          <Route path='/edit' element={user? <Edit /> : <Navigate to='/login' />} />
          <Route path='/create' element={user? <Create /> : <Navigate to='/login' /> } />
        </Routes>
      </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
