export const weightHandler = (product) => {
    if (product.category === 'Yeast') {
      return `${product.price} грн за 0.5 кг`
    } else if (product.category === 'Hops') {
      return `${product.price} грн за кг`
    }
  }