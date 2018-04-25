import * as express from "express";
import * as bodyParser from 'body-parser';
import container from "./inversify.config";

import { IRegistrableController } from "./interfaces/controller/IRegistrableController";
import TYPES from "./types";


const app: express.Application = express()

app.use(bodyParser.json());

const controllers: IRegistrableController[] = container.getAll<IRegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

app.listen(3000);
console.log("Waiting for requests...");