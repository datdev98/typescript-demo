export interface ITransactionModel {
    _id?: string;
    hash: string;
    amount: number;
    content?: string;
}