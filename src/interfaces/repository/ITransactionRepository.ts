import { ITransactionModel } from "../model/ITransactionModel";

export interface ITransactionRepository {
    create(trasaction: ITransactionModel): Promise<ITransactionModel>;
    findAll(): Promise<Array<ITransactionModel>>;
    findById(id: number): Promise<ITransactionModel>;
    findByHash(hash: string): Promise<ITransactionModel>;
    update(id: number, trasaction: ITransactionModel): Promise<void>;
    delete(id: number): Promise<ITransactionModel>;
}