import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place Order cod:  /api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }
    //Calculate Amount Using Items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    //Add Tax Charges (2%)
    amount += Math.floor(amount * 0.02);
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: true ,
      
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Get oreder by one user: .api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "cod" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

      res.json({success:true,orders});
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};


//Get all oredes(for seller/admin):  /api/order/seller

export const getAllOrders=async(req,res)=>{
   try {
    const { userId } = req.user.id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "cod" }, { isPaid: true }]
    }).populate("items.product address");
      

    res.json({success:true,orders});
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

