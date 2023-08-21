import React from "react";
import { useState, useEffect } from "react";

function Filters({ products, searchText, setFilteredProducts }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  let applyFiltersAndSearch = (products, selectedFilters) => {
    let filteredProducts = [...products];

    if (selectedFilters.gender) {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === selectedFilters.gender
      );
    }

    if (selectedFilters.color) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === selectedFilters.color
      );
    }

    if (selectedFilters.priceRange) {
      const [minPrice, maxPrice] = selectedFilters.priceRange.split("-");
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= parseInt(minPrice) &&
          product.price <= parseInt(maxPrice)
      );
    }

    if (selectedFilters.type) {
      filteredProducts = filteredProducts.filter(
        (product) => product.type === selectedFilters.type
      );
    }

    if (searchText) {
      const lowercasedQuery = searchText.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.color.toLowerCase().includes(lowercasedQuery) ||
          product.type.toLowerCase().includes(lowercasedQuery)
      );
    }

    return filteredProducts;
  };

  function handleFilter(event) {
    const { name, value, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? value : null,
    }));
  }

  useEffect(() => {
    const updatedFilteredProducts = applyFiltersAndSearch(
      products,
      selectedFilters,
      searchText
    );
    setFilteredProducts(updatedFilteredProducts);
  }, [products, selectedFilters, searchText, setFilteredProducts]);

  return (
    <div className="filters">
      <div className="category">
        <header>Colour</header>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Red"
            onChange={handleFilter}
          />
          Red
        </label>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Blue"
            onChange={handleFilter}
          />
          Blue
        </label>
        <label>
          <input
            type="checkbox"
            name="color"
            value="Green"
            onChange={handleFilter}
          />
          Green
        </label>
      </div>
      <div className="category">
        <header>Gender</header>
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Men"
            onChange={handleFilter}
          />
          Men
        </label>
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Women"
            onChange={handleFilter}
          />
          Women
        </label>
      </div>
      <div className="filters">
        <div className="category">
          <header>Price</header>
          <label>
            <input
              type="checkbox"
              name="priceRange"
              value="0-250"
              onChange={handleFilter}
            />
            0-Rs.250
          </label>
          <label>
            <input
              type="checkbox"
              name="priceRange"
              value="250-450"
              onChange={handleFilter}
            />
            Rs.250-Rs.450
          </label>
          <label>
            <input
              type="checkbox"
              name="priceRange"
              value="451-600"
              onChange={handleFilter}
            />
            Rs.450
          </label>
        </div>
      </div>
      <div className="category">
        <header>Type</header>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Polo"
            onChange={handleFilter}
          />
          Polo
        </label>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Hoodie"
            onChange={handleFilter}
          />
          Hoodie
        </label>
        <label>
          <input
            type="checkbox"
            name="type"
            value="Basic"
            onChange={handleFilter}
          />
          Basic
        </label>
      </div>
    </div>
  );
}

export default Filters;