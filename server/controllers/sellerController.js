import jwt from "jsonwebtoken";
//Login Seller :/api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: "seller-id-123", email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("sellertoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true, message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//check auth:/api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    // Get user info from middleware
    return res.json({ success: true, user: req.user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Logout User-->/api/seller/logout
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie("sellertoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default sellerlogout;