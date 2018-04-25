import { ITransactionRepository } from "../repository/ITransactionRepository";
import { ITransactionModel } from "../model/ITransactionModel";

export interface ITransactionService {
    createTransaction(transaction: ITransactionModel): Promise<ITransactionModel>;
    findAllTransaction(): Promise<ITransactionModel[]>;
    findTransactionById(id: number): Promise<ITransactionModel>;
    findTransactionByHash(hash: string): Promise<ITransactionModel>;
    updateTransaction(id: number, updateInfo: ITransactionModel): Promise<ITransactionModel>;
    deleteTransation(id: number): Promise<void>;
}