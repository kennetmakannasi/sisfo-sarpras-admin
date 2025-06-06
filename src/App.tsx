import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Dashboard from './page/dashboard/dashboard';
import Register from './page/auth/register';
import Login from './page/auth/login';
import User from './page/user/user';
import Item from './page/item/item';
import Category from './page/category/category';
import Borrow from './page/borrow/borrow';
import Return from './page/return/return';
import Layout from './components/layouts/layout';
import ProtectedRoute from './components/routeprotect';


function App() {
  return(
    <Router>
      <Routes>
        <Route path= "/register" element={<Register/>}></Route>
        <Route path= "/login" element={<Login/>}></Route>

        <Route path= "/" element={<Layout/>}>
          <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>

          <Route path= "/users" element={<ProtectedRoute><User/></ProtectedRoute>}></Route>
        
          <Route path= "/items" element={<ProtectedRoute><Item/></ProtectedRoute>}></Route>

          <Route path='/categories' element={<ProtectedRoute><Category/></ProtectedRoute>}></Route>

          <Route path='/borrows' element={<ProtectedRoute><Borrow/></ProtectedRoute>}></Route>

          <Route path='/returns' element={<ProtectedRoute><Return/></ProtectedRoute>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
