import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.cookies.token; // ✅ Read from cookies
   
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized! Token missing." });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode && tokenDecode.id) {
            req.userId = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ success: false, message: "Invalid token payload." });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }
        console.error("Authentication error:", error);
        return res.status(500).json({ success: false, message: "Authentication failed." });
    }
};

export default authUser;
