import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate ,axios} = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller,navigate]);

  const onSubmitHandler = async(event) => {
    try{
        event.preventDefault();
        const{data}=await axios.post("/api/seller/login",{email,password},{ withCredentials: true } );
       
        if(data.success){
          setIsSeller(true);
          navigate("/seller")
        }else{
          toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
  
  };

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex justify-center items-center bg-gray-50 text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 bg-white">
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span> Login
          </p>
          <div className="w-full">
            <p>Email :</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              required
            />
          </div>
          <div className="w-full">
            <p>Password :</p>
             <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                className="border border-gray-200 rounded w-full p-2 mt-1 pr-10 outline-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
