// src/App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ProductList />

        {/* <Cart /> */}
      </div>
    </Provider>
  );
}

export default App;
