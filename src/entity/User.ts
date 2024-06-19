import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, JoinTable } from "typeorm"
import { Cart } from "./cart"
import { Orders } from "./orders" 
@Entity()
export class User {
    // static create(arg0: { name: string; email: string; password: string; }) {
    //     throw new Error('Method not implemented.');
    // }
    // static findOne(userId: number) {
    //     throw new Error('Method not implemented.');
    // }
    // static find() {
    //     throw new Error('Method not implemented.');
    // }
    // static update(userId: number, updateData: Partial<User>) {
    //     throw new Error('Method not implemented.');
    // }
    // static delete(userId: number) {
    //     throw new Error('Method not implemented.');
    // }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @Column({unique: true})
    username: string;

    @Column({ unique: true})
    email: string;

    @Column({ default: "user" })
    type: string;

    @Column()
    password: string;

    @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
    @JoinColumn()
    cart: Cart

    @OneToMany(() => Orders, (orders) => orders.user)
    @JoinColumn()
    orders: Orders
    static email: { email: any; };


}
