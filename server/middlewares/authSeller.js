import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const sellertoken = req.cookies.sellertoken; // ✅ same name as login

  if (!sellertoken) {
    return res.status(401).json({ success: false, message: "Not Authorized! Token missing." });
  }

  try {
    const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);

    if (decoded.email === process.env.SELLER_EMAIL) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: "Invalid token payload." });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
