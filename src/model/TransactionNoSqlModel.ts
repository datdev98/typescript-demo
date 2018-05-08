import { Core, Model, Instance, Collection, Index, Property, ObjectID } from "iridium";

import { ITransactionModel } from "../interfaces/model/ITransactionModel";

/**
 * Iridium config
 */
@Index({hash: 1})
@Collection('transactions')
export class TransactionNoSqlSchema extends Instance<ITransactionModel, TransactionNoSqlSchema> implements ITransactionModel {
    @ObjectID
    public _id?: string;

    @Property(String, true)
    hash: string;

    @Property(Number, true)
    amount: number;

    @Property(String, true)
    content?: string;
}

class AddressDatabase extends Core {
    Transaction = new Model<ITransactionModel, TransactionNoSqlSchema>(this, TransactionNoSqlSchema);
}

export const mongoDatabase = new AddressDatabase({database: 'mydb'});

// delete everything from mongo
// database.connect().then(() => database.Addresses.remove()).then(() => database.Addresses.get()).then(() => database.close());
