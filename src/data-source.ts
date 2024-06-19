import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Cart_items } from "./entity/cart_items"
import { Orders } from "./entity/orders"
import { Products } from "./entity/Products"
import { Cart } from "./entity/cart"
import { Order_items } from "./entity/order_items"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Edamatsbankzzz",
    database: "E-COMMERCE-API",
    synchronize: true,
    logging: false,
    entities: [User, Cart_items, Cart, Products, Orders, Order_items],
    migrations: [],
    subscribers: [],
})
