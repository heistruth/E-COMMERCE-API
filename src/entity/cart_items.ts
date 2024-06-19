import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./cart"
import { Products } from "./Products";

@Entity()
export class Cart_items {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number

    @OneToMany(() => Cart, (cart) => cart.cart_items)
    cart: Cart

    @OneToMany(() => Products, (products) => products.cart_items)
    products: Products


}