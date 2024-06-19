import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User} from "./User"
import { Cart_items } from "./cart_items"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number

    @OneToOne(() => User, (user) => user.cart)
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => Cart_items, (cart_items) => cart_items.cart)
    @JoinColumn()
    cart_items: Cart_items
}