import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { User} from "./User"
import { Order_items } from "./order_items"

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    total_amount: number;

    @Column()
    status: string

    @OneToMany(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => Order_items, (order_items) => order_items.orders)
    @JoinColumn()
    order_items: Order_items
}