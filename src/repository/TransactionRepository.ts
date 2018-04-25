import { injectable } from "inversify";
import { Repository, Connection, createConnection } from "typeorm";

import { ITransactionRepository } from "../interfaces/repository/ITransactionRepository";
import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { TransactionMySqlEntity } from "../model/TransactionMySqlModel";


@injectable()
export class TransactionMySqlRepository implements ITransactionRepository {
    private transactionRepository: Repository<TransactionMySqlEntity>;

    constructor() {
        this.connect().then(async connection => {
            this.transactionRepository = connection.getRepository(TransactionMySqlEntity);
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

    public async update(_id: number, transaction: ITransactionModel): Promise<void>{
        await this.transactionRepository.update({id: _id}, transaction);
    }
    
    public async delete(_id: number): Promise<ITransactionModel> {
        const transaction: TransactionMySqlEntity = await this.transactionRepository.findOne({id: _id});
        return await this.transactionRepository.remove(transaction);
    }

    private connect(): Promise<Connection> {
        return createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "32897285",
            database: "mydb",
            entities: [
                TransactionMySqlEntity
            ],
            synchronize: true,
            logging: false
        })
    }
}