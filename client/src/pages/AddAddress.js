import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

//Input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-indigo-500 transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const {axios,user,navigate}=useAppContext();
  
   console.log("User ID:", user?._id);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress)=>({
        ...prevAddress,
        [name]:value
    }))
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
       const{data}=await axios.post("/api/address/add",{userId: user._id,address});
       if(data.success){
        toast.success(data.message);
        navigate("/cart")
       }else{      
         toast.error(data.message);
       }
    }catch(error){
         toast.error(error.message);
    }
    
  };

  useEffect(()=>{
    if(!user){
      navigate("/cart")
    }
  },[navigate,user])
  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add shipping{" "}
        <span className="font-semiboldd text-indigo-500">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row jstify-between mt-10">
        <div className="flex-1 max-w-md gap-5">
          <form onSubmit={onSubmitHandler} >
           <div className="flex flex-col gap-5">
             <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="Firstname"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Lastname"
              />
            </div>
            <InputField
                handleChange={handleChange}
                address={address}
                name="email"
                type="email"
                placeholder="Email Address"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="street"
                type="text"
                placeholder="Street"
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="text"
                placeholder="Zip-code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
              </div>
              <InputField
                handleChange={handleChange}
                address={address}
                name="phone"
                type="text"
                placeholder="Phone"
              />
              <button className="w-full mt-6 bg-indigo-500 text-white py-3 hover:bg-indigo-600 transition cursor-pointer uppercase">Save-Address</button>
           </div>
          </form>

        </div>
        <img
          src={assets.add_address_iamge}
          className="md:mr-16 mb:16 md:mt-0"
          alt="Add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
