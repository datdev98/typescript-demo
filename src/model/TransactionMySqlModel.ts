import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TransactionMySqlEntity implements ITransactionModel {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length: 65
    })
    hash: string;

    @Column()
    amount: number;

    @Column()
    content?: string;
}