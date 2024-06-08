const express = require('express');
import cors from "cors";
import foodRouter from './src/routers/food.router';
import userRouter from './src/routers/user.router';
import orderRouter from './src/routers/order.router';
require('./src/configs/database.config').getDbConnection();

const app = express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"] 
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);



const port = 5000;
app.listen(port, () => {
    console.log("website served on http://localhost:" + port);
})

