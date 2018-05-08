import { Transform, Model, Instance, } from "iridium";
import { injectable } from "inversify";

import { ITransactionRepository } from "../interfaces/repository/ITransactionRepository";
import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { mongoDatabase, TransactionNoSqlSchema } from "../model/TransactionNoSqlModel";


@injectable()
export class TransactionMongoRepository implements ITransactionRepository {
    protected transactionRepository = mongoDatabase.Transaction;

    constructor() {
        mongoDatabase.connect();
    }

    public async create(trasaction: ITransactionModel): Promise<ITransactionModel> {
        let transaction = await this.transactionRepository.create(trasaction);
        return transaction.save();
    }
    public async findAll(): Promise<Array<ITransactionModel>> {     
        return await this.transactionRepository.find().toArray();
    }

    public async findById(id: string): Promise<ITransactionModel> {
        return await this.transactionRepository.findOne(id.toString());
    }
    public async findByHash(_hash: string): Promise<ITransactionModel> {
        return await this.transactionRepository.findOne({hash: _hash});
    }

    public async update(id: string, transaction: ITransactionModel): Promise<void> {
        this.transactionRepository.findOne({_id: id}).then((update_transaction) => {
            update_transaction.hash = transaction.hash;
            update_transaction.amount = transaction.amount;
            update_transaction.content = transaction.content;
        })
    }
    public async delete(_id: string): Promise<ITransactionModel> {
       this.transactionRepository.remove({id: _id}).then((deletedTransaction) => {
            return deletedTransaction;
       })
       return;
    }
}