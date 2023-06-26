import paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantKey } from "../index.js";
import https from "https";
import { IncomingForm } from "formidable";
export const addPaymentGateway = async (req, res) => {
  try {
    let paytmCheckSum = await paytmchecksum.generateSignature(
      paytmParams,
      paytmMerchantKey
    );
    const params = {
      ...paytmParams,
      CHECKSUMHASH: paytmCheckSum,
    };
    res.status(200).json(params);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const paytmResponse = (req, res) => {
  const form = new IncomingForm();
  let paytmCheckSum = req.body.CHECKSUMHASH;
  delete req.body.CHECKSUMHASH;

  let idVerifySignature = paytmchecksum.verifySignature(
    req.body,
    paytmMerchantKey,
    paytmCheckSum
  );

  if (idVerifySignature) {
    let paytmParams = {};
    paytmParams["MID"] = req.body.MID;
    paytmParams["ORDERID"] = req.body.ORDERID;

    paytmchecksum
      .generateSignature(paytmParams, paytmMerchantKey)
      .then(function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;

        let post_data = JSON.stringify(paytmParams);

        let options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        let response = "";
        const post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            let result = JSON.parse(response);
            console.log(result);
            res.redirect(`http://localhost:3000/`);
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
  } else {
    console.log("Checksum missmatched");
  }
};
