import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Orders } from "./orders"
import { Products } from "./Products";

@Entity()
export class Order_items {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number;

    @Column()
    price: number

    @OneToMany(() => Orders, (orders) => orders.order_items)
    orders: Orders

    @OneToMany(() => Products, (products) => products.order_items)
    products: Products
}