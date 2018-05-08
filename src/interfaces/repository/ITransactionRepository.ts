import { ITransactionModel } from "../model/ITransactionModel";

export interface ITransactionRepository {
    create(trasaction: ITransactionModel): Promise<ITransactionModel>;
    findAll(): Promise<Array<ITransactionModel>>;
    findById(id: string): Promise<ITransactionModel>;
    findByHash(hash: string): Promise<ITransactionModel>;
    update(id: string, trasaction: ITransactionModel): Promise<void>;
    delete(id: string): Promise<ITransactionModel>;
}