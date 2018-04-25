export interface ITransactionModel {
    id?: number;
    hash: string;
    amount: number;
    content?: string;
}