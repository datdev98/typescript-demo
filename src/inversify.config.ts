import { Container } from "inversify";

import TYPES from "./types";
import { IRegistrableController } from "./interfaces/controller/IRegistrableController";
import { TransactionController } from "./controller/TransactionController";
import { ITransactionRepository } from "./interfaces/repository/ITransactionRepository";
import { TransactionMssqlRepository } from "./repository/TransactionMssqlRepository";
import { TransactionMySqlRepository } from "./repository/TransactioMySqlRepository";
import { TransactionMongoRepository } from "./repository/TransactionMongoRepository";
import { ITransactionService } from "./interfaces/service/ITransactionService";
import { TransactionService } from "./service/TransactionService";

const container = new Container();
container.bind<IRegistrableController>(TYPES.Controller).to(TransactionController);
container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService);
container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionMongoRepository);
export default container;