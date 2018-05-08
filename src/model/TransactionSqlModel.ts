import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TransactionSqlEntity implements ITransactionModel {
    @PrimaryGeneratedColumn('uuid')
    _id?: string;
    
    @Column({
        length: 65
    })
    hash: string;

    @Column()
    amount: number;

    @Column()
    content?: string;
}