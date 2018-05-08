import { ITransactionRepository } from "../repository/ITransactionRepository";
import { ITransactionModel } from "../model/ITransactionModel";

export interface ITransactionService {
    createTransaction(transaction: ITransactionModel): Promise<ITransactionModel>;
    findAllTransaction(): Promise<ITransactionModel[]>;
    findTransactionById(id: string): Promise<ITransactionModel>;
    findTransactionByHash(hash: string): Promise<ITransactionModel>;
    updateTransaction(id: string, updateInfo: ITransactionModel): Promise<ITransactionModel>;
    deleteTransation(id: string): Promise<void>;
}