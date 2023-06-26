import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv/config";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import Router from "./routes/route.js";
import { v4 as uuid } from "uuid";
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// DefaultData(); // calling it to insert into database

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams["MID"] = process.env.PAYTM_MID;
paytmParams["WEBSITE"] = process.env.PAYTM_MID;
paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams["ORDER_ID"] = uuid();
paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID;
paytmParams["TXN_AMOUNT"] = "100";
paytmParams["CALLBACK_URL"] = "http://localhost:8000/callback";
paytmParams["EMAIL"] = "kunaltyagi@gmail.com";
paytmParams["MOBILE_NO"] = "1234567852";
