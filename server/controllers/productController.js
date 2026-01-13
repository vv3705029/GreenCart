import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// Add product: POST /api/product/add
export const addProduct = async (req, res) => {
  try {
    // console.log("cookies:", req.cookies);
    // console.log("body:", req.body);
    // console.log("files:", req.files);

    let productdata = {};

    // Parse product data from request body
    if (req.body.productdata) {
      try {
        productdata = JSON.parse(req.body.productdata);
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid JSON in productData" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Missing productData" });
    }

    // Handle image uploads
    let imagesUrl = [];
    if (req.files && req.files.length > 0) {
      imagesUrl = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    // Save product in database
    await Product.create({ ...productdata, image: imagesUrl });

    return res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products: GET /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by ID: POST /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change product stock: PUT /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
