import React from 'react';
import { Routes } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
     axios.get('https://632b046c1090510116ceb475.mockapi.io/items').then(res => {
     setItems(res.data);
     });

     axios.get('https://632b046c1090510116ceb475.mockapi.io/cart').then(res => {
     setCartItems(res.data);
     });

  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://632b046c1090510116ceb475.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://632b046c1090510116ceb475.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://632b046c1090510116ceb475.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  
  return(
  <div className="wrapper clear">

    {cartOpened  && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> }
    <Header onClickCart={() => setCartOpened(true)}  />

    <Routes path="/favorites">test sadad ada</Routes>

    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
      <h1>{searchValue ? `Search by request: "${searchValue}"` : 'All sneakers'}</h1>
      <div className="search-block d-flex">
        <img src="/img/search.svg" alt="Search"/>
        {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/>}
        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
      </div>
      </div>
    <div className="d-flex flex-wrap">
      {items
      .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map ((item, index) => (
        <Card
        key={index} 
        title={item.title}
        price={item.price} 
        imageUrl={item.imageUrl}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        />
      ))}
  </div>


    </div>
  </div> 
  ) 
}

export default App;
