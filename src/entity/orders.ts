import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { User} from "./User"


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

    @Column("simple-json")
    items: { productId: number, quantity: number, price: number}[];

    @Column()
    createdAt: Date;

    @Column()
    cart_id: number

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    
}