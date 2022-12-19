import styles from './App.module.scss';
import Header from './components/Header/Header';
import ProductsList from './components/ProductsList/ProductsList'
import ProductPage from './components/ProductPage/ProductPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Cart/Cart';
import CartOverlay from './components/CartOverlay/CartOverlay';


function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrap}>
      <Header />
        <Routes>
          <Route path="/" />
          <Route path="/category/:category" element={<ProductsList />} />    
          <Route path="/products/:product" element={<ProductPage />} />       
          <Route path="/cartoverlay" element={<CartOverlay />} />   
          <Route path="/cart" element={<Cart />} />   
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
