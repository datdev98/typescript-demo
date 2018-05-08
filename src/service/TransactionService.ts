import { injectable, inject } from "inversify";
import "reflect-metadata";

import { ITransactionService } from "../interfaces/service/ITransactionService";
import TYPES from '../types';
import { ITransactionRepository } from "../interfaces/repository/ITransactionRepository";
import { ITransactionModel } from '../interfaces/model/ITransactionModel';


@injectable()
export class TransactionService implements ITransactionService {
    @inject(TYPES.TransactionRepository)
    private transactionRepository: ITransactionRepository;

    public async createTransaction(transaction: ITransactionModel): Promise<ITransactionModel> {
        return await this.transactionRepository.create(transaction);
    }

    public async findTransactionById(id: string): Promise<ITransactionModel> {
        return await this.transactionRepository.findById(id);
    }


    public async findTransactionByHash(hash: string): Promise<ITransactionModel> {
        return await this.transactionRepository.findByHash(hash);
    }

    public async findAllTransaction(): Promise<ITransactionModel[]> {
        return await this.transactionRepository.findAll();
    }

    public async updateTransaction(id: string, updateInfo: ITransactionModel): Promise<ITransactionModel> {
        await this.transactionRepository.update(id, updateInfo);
        return await this.findTransactionById(id);
    }

    public async deleteTransation(id: string): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}
