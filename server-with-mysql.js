import { createApp } from "./app.js";
import { ProductModel } from "./models/mysql/product.js";
import { UserModel } from "./models/mysql/user.js";
import { TableModel } from "./models/mysql/table.js";
import { ClientModel } from "./models/mysql/client.js";
import { OrderModel } from "./models/mysql/order.js";
import { OrderProductModel } from "./models/mysql/orderProduct.js";
import { BillModel } from "./models/mysql/bill.js";


createApp({productModel:ProductModel, userModel:UserModel, tableModel:TableModel, clientModel:ClientModel, orderModel:OrderModel, orderProductModel: OrderProductModel, billModel: BillModel })
