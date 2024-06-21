import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { Cart_items } from "./cart_items";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    stock: number

    @OneToMany(() => Cart_items, (cart_items) => cart_items.products)
    @JoinColumn()
    cart_items: Cart_items

    


}