import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export const AppContext = createContext();

//axios
axios.defaults.withCredentials=true;
axios.defaults.baseURL = "http://localhost:4000";

export const AppContextProvider = ({ children }) => {
  const currency = process.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // Add this
  const [searchQuery, setsearchQuery] = useState({});
  
  //Fetch Seller Status
  const fetchSeller = async () => {
  try {
    const { data } = await axios.get("/api/seller/is-auth", { withCredentials: true });
    if (data.success) {
      setIsSeller(true);
    // ✅ store user info
    } else {
      setIsSeller(false);
      setUser(null);
    }
  } catch (error) {
    setIsSeller(false);
    setUser(null);
  }
};


  const fetchProductes = async () => {
    try{
       const{data}=await axios.get("/api/product/list");
       if(data.success){
        setProducts(data.products);
       }else{
         toast.error(data.message);
       }
    }catch(error){
         toast.error(error.message);
    }
  };

  //fetch user Auth and User data and cart
  const fetchUser=async()=>{
    try{
       const {data}=await axios.get("/api/user/is-auth");
       if(data.success){
          setUser(data.user);
          setCartItems(data.user.cartItems);
       }
    }catch(error){
          setUser(null);
    }
  }
     


  //add cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to card");
  };

  //Update cart item Quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Updated cart");
  };

  //remove cart item
  const removeFromcart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Removed from cart");
  };
  //calculate cart items
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      count += cartItems[itemId];
    }
    return count;
  };
  //calculate total amount in the cart
  const getCartAmount = () => {
    let amount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItems[itemId] > 0) {
        amount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return amount;
  };
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProductes();
  }, []);

  //Update Database Cart Items
  useEffect(()=>{
     const updateCart=async()=>{
          try{
             const {data}=await axios.post("/api/cart/update",{userId: user._id,cartItems})
             if(!data.success){
              toast.error(data.message);
             }
            
          }catch(error){
            toast.error(error.message)
          }
     }
     if(user){
      updateCart();
     }
  },[cartItems,user])

 
  const value = {
    getCartAmount,
    getCartCount,
    searchQuery,
    setsearchQuery,
    menuOpen,
    setMenuOpen,
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    setProducts,
    cartItems,
    setCartItems,
    currency,
    addToCart,
    updateCartItem,
    removeFromcart,
    axios,
    fetchProductes
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
