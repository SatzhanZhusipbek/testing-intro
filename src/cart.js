function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) { 
  if (quantity <= 0) {
    throw new RangeError("Количество товара должно быть больше 0");
  }  

  const existingProduct = cart.find(p => p.id === product.id);
  if ((existingProduct?.quantity ?? 0 + quantity) > product.stock) {
    throw new RangeError("Количество товара не должно быть больше, чем есть на складе")
  }

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity, stock: product.stock });
  }

  return cart;
}
function changeQuantity(cart, id, quantity) { 
  if (quantity <= 0) {
    throw new RangeError("Количество товара должно быть больше 0");
  } 

  const product = cart.find(item => item.id === id);
  if (product) {
    if (quantity > product.stock) {
      throw new RangeError("Количество товара не должно быть больше, чем есть на складе") 
    }
    cart[id-1].quantity = quantity;
  }
    
  return cart;
}
function removeFromCart(cart, id) { 
  const newCart = cart.filter(product => product.id !== id);
  return newCart;
}
function calculateCartSubtotal(cart) { 
  let subTotal = 0;
  for (product of cart) {
    subTotal += product.price * product.quantity;
  }
  return subTotal;
}
function calculateOrderTotal(products, promo) { 
  const subtotal = calculateCartSubtotal(products);
  let discount = 0; let delivery = 30000;
  if (promo === "SAVE10" && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  if (subtotal >= 50000) {
    delivery = 0;
  }
  const total = subtotal + delivery - discount;
  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
