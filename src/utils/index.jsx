/**
 *
 * @param {Array} products cartProduct Array of Objects
 * @returns {Number} Total Price
 */
export const totalPrice = (products) => {
  return products.reduce((acc, product) => acc + product.price, 0);
};
