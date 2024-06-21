import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
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

  
    @ManyToOne(() => Cart, (cart) => cart.cart_items)
    @JoinColumn({ name: "cart_id" }) // Define join column for cart_id
    cart: Cart;

    @OneToMany(() => Products, (products) => products.cart_items)
    products: Products


}