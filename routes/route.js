import express from "express";
import { userSingup,userLogIn } from "../controller/user-controller.js";
import {getProducts,getProductById} from "../controller/product-controller.js"
import { addPaymentGateway,paytmResponse } from "../controller/payment-controller.js";
const router = express.Router();

router.post("/signup", userSingup);
router.post("/login",userLogIn);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);

//for paytm payment
router.post('/payment',addPaymentGateway);
router.post('/callback',paytmResponse);
export default router;
