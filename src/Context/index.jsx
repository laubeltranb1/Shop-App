import { createContext, useState, useEffect, useCallback } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  // Open/Close - Product Detail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Showe info Product Detail
  const [productToShow, setProductToShow] = useState({});

  // Shopping cart
  const [cartProducts, setCartProducts] = useState([]);
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);

  //Shopping Cart order
  const [order, setOrder] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [searchByTitle, setSearchByTitle] = useState(null);
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = useCallback(
    (searchType, products, searchByTitle, searchByCategory) => {
      switch (searchType) {
        case "BY_TITLE":
          return filteredItemsByTitle(products, searchByTitle);
        case "BY_CATEGORY":
          return filteredItemsByCategory(products, searchByCategory);
        case "BY_TITLE_AND_CATEGORY":
          return filteredItemsByCategory(products, searchByCategory).filter(
            (item) =>
              item.title.toLowerCase().includes(searchByTitle.toLowerCase())
          );
        default:
          return products;
      }
    },
    []
  );

  useEffect(() => {
    let filteredResult = null;

    if (searchByTitle && searchByCategory) {
      filteredResult = filterBy(
        "BY_TITLE_AND_CATEGORY",
        products,
        searchByTitle,
        searchByCategory
      );
    } else if (searchByTitle && !searchByCategory) {
      filteredResult = filterBy(
        "BY_TITLE",
        products,
        searchByTitle,
        searchByCategory
      );
    } else if (!searchByTitle && searchByCategory) {
      filteredResult = filterBy(
        "BY_CATEGORY",
        products,
        searchByTitle,
        searchByCategory
      );
    } else if (!searchByTitle && !searchByCategory) {
      filteredResult = filterBy(
        null,
        products,
        searchByTitle,
        searchByCategory
      );
    }

    setFilteredProducts(filteredResult);
  }, [products, searchByTitle, searchByCategory]);

  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        products,
        setProducts,
        searchByTitle,
        setSearchByTitle,
        filteredProducts,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
