const filteredByCategory = (products, cat, producer = '') => {
  if (producer === '') {
    return products.filter(product => product.category === cat)
  } else if (cat === '') {
    return products;
  } else {
    return products.filter(product => product.category === cat && product.origin === producer)
  }
}

  export default filteredByCategory;