var express = require('express');
var cors = require('cors');
const foodRouter = require('./src/routers/food.router');
const userRouter = require('./src/routers/user.router');
const orderRouter = require('./src/routers/order.router');
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

