import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constant/order_status";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post('/create', expressAsyncHandler(
    async (req:any,res:any) => {
        const requestOrder = req.body;

        if(requestOrder.items.length <= 0){
            res.status(400).send('Cart is empty!')
        }

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW
        })

        const newOrder = new OrderModel({...requestOrder,user:req.user.id})
        await newOrder.save();
        res.send(newOrder);
    }
))

export default router;