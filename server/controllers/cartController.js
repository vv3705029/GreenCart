//Update User Cartdata: /api/cart/update
import User from "../models/User.js";
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true, upsert: false } // new:true → return updated doc
    );
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "Cart Updated !", user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
