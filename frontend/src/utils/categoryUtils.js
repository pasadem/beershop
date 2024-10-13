const filteredByCategory = (products, cat, producer) => {
  if (producer === '') {
    return products.filter(product => product.category === cat)
  }
    return products.filter(product => product.category === cat && product.origin === producer)
  }

  export default filteredByCategory;