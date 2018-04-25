import 'reflect-metadata';
import { injectable, inject } from "inversify";
import * as express from 'express';


import { IRegistrableController } from "../interfaces/controller/IRegistrableController";
import { ITransactionModel } from "../interfaces/model/ITransactionModel";
import { ITransactionService } from "../interfaces/service/ITransactionService";
import TYPES from "../types";


@injectable()
export class TransactionController implements IRegistrableController {
    @inject(TYPES.TransactionService)
    private transactionService: ITransactionService;

    register(app: express.Application): void {
        app.route('/transactions/all/')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const transactions = await this.transactionService.findAllTransaction();
                res.json(transactions);
            })
        app.route('/transactions/hash/:hash')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                console.log(req.params.hash);
                const transaction = await this.transactionService.findTransactionByHash(req.params.hash);
                res.json(transaction);
            })
        app.route('/transactions/')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const transaction: ITransactionModel = {
                    hash: req.body.hash,
                    amount: req.body.amount,
                    content: req.body.content
                };
                const createdTransaction = await this.transactionService.createTransaction(transaction).catch(
                    (error) => {
                        console.log(error);
                    }
                );
                console.log(createdTransaction);
                res.json(createdTransaction);
            });
            
        app.route('/transactions/:id/')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const transaction = await this.transactionService.findTransactionById(req.params.id);
                if (!transaction) {
                    res.send("404 not found");
                }
                res.json(transaction);
            })
            .put(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const transaction: ITransactionModel = {
                    hash: req.body.hash,
                    amount: req.body.amount,
                    content: req.body.content
                }
                const updated_transactions = await this.transactionService.updateTransaction(req.params.id, transaction);
                console.log("Completed");
                res.json(updated_transactions);
            })
            .delete(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const updated_transactions = await this.transactionService.deleteTransation(req.params.id);
                console.log("Deleted");
                res.json(updated_transactions);
            })
    }
}