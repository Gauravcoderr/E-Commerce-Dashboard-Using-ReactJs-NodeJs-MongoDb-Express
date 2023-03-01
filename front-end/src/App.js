
import './App.css';
import Nav from '../src/Components/Nav';
 import Footer from '../src/Components/Footer';
 import SignUp from '../src/Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import PrivateComponent from './Components/PrivateComponent';
  import Login from './Components/Login';
   import ProductList from './Components/ProductList';
   import UpdateProduct from './Components/UpdateProduct';
  import AddProduct from './Components/AddProduct';

function App() {
  return (
    <div className="App">
  <Router>
  
      <Nav/>
    
  
      <Routes>

      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct />}/>
      <Route path='/logout' element={<h1>logout Component</h1>}/>
      <Route path='/profile' element={<h1>profile Component</h1>}/>

      </Route>
    

      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      </Routes>
     

    
  </Router>
  <Footer/>
    </div>
  );
}

export default App;
