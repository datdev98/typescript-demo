import { Repository, Connection, createConnection } from "typeorm";
import { injectable } from "inversify";

import { ITransactionRepository } from "../interfaces/repository/ITransactionRepository";
import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { TransactionSqlEntity } from "../model/TransactionSqlModel";

@injectable()
export class TransactionMssqlRepository  implements ITransactionRepository {
    protected transactionRepository: Repository<ITransactionModel>;

    constructor() {
        this.connect().then(async connection => {
            this.transactionRepository = connection.getRepository(TransactionSqlEntity);
        })
        .catch(error => {
            console.log(error);
        })
    }

    public async create(transaction: ITransactionModel): Promise<ITransactionModel> {
        const newTransaction = await this.transactionRepository.create(transaction);
        return await this.transactionRepository.save(newTransaction)
    }

    public async findAll(): Promise<Array<ITransactionModel>> {
        return await this.transactionRepository.find();
    }

    public async findById(id: number): Promise<ITransactionModel> {
        return await this.transactionRepository.findOne(id);
    }


    public async findByHash(_hash: string): Promise<ITransactionModel> {
        return await this.transactionRepository.findOne({hash: _hash});
    }  

    public async update(id: number, transaction: ITransactionModel): Promise<void>{
        await this.transactionRepository.update({_id: id}, transaction);
    }
    
    public async delete(id: number): Promise<ITransactionModel> {
        const transaction: TransactionSqlEntity = await this.transactionRepository.findOne({_id: id});
        return await this.transactionRepository.remove(transaction);
    }

    private connect(): Promise<Connection> {
        return createConnection({
            type: "mssql",
            host: "localhost",
            username: "SA",
            password: "Dat351428679",
            database: "MyDB",
            entities: [
                TransactionSqlEntity
            ],
            synchronize: true,
            logging: false
        })
    }
}