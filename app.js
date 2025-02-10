const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios"); // Import 'axios' instead of 'request'
const moment = require("moment");
const apiRouter = require('./api');
const cors = require("cors");
// Create an Express application
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
const nodemailer = require('nodemailer');

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Set up a server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
  
});

const friends=["254740616615","254792434244", "254743466032"]

//====================================ESENPI==============================================
async function getAccessToken(cK,cS) {
    // REPLACE IT WITH YOUR CONSUMER SECRET
 const url =
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
    const auth =
      "Basic " +
      new Buffer.from(cK + ":" + cS).toString("base64");
  
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
//====================================ESENPI==============================================

// Register URLs
async function registerUrls() {
  const consumerKey = "ogNIHgP7LRN2LjGuKb7ShvCGM6xUHuKubEiiGnmddnNwl7CF"; // REPLACE IT WITH YOUR CONSUMER KEY
  const consumerSecret = "blg5AHGBAYzV40oJwfeR9pwByUlQb4nj055x8DfwAJzspOq1bRSlaQafuAkgYB5A"; // REPLACE IT WITH YOUR CONSUMER SECRET
 
  const shortCode = "6723519"
  const validationUrl = "https://8d39-154-159-252-66.ngrok-free.app/validation";
  const confirmationUrl = "https://8d39-154-159-252-66.ngrok-free.app/confirmation";

  const accessToken = await getAccessToken(consumerKey, consumerSecret);
  const url = "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  console.log(accessToken);
  
  const auth = `Bearer ${accessToken}`;

  const response = await axios.post(
      url,
      {
          ShortCode: shortCode,
          ResponseType: "Completed",
          ConfirmationURL: confirmationUrl, 
          ValidationURL: validationUrl,
      },
      {
          headers: { Authorization: auth },
      }
  );

  console.log("URL Registration Response:", response.data);
}

// Run Registration
// registerUrls()


  app.get("/", (req, res) => {
    res.send("MPESA DARAJA API WITH NODE JS SOFTWARES");
    var timeStamp = moment().format("YYYYMMDDHHmmss");
    console.log(timeStamp);
  });
  
  //ACCESS TOKEN ROUTE
  app.get("/access_token", (req, res) => {
    const consumer_key = "ogNIHgP7LRN2LjGuKb7ShvCGM6xUHuKubEiiGnmddnNwl7CF"; // REPLACE IT WITH YOUR CONSUMER KEY
    const consumer_secret = "blg5AHGBAYzV40oJwfeR9pwByUlQb4nj055x8DfwAJzspOq1bRSlaQafuAkgYB5A"; // REPLACE IT WITH YOUR CONSUMER SECRET
   
    getAccessToken(consumer_key,consumer_secret)
      .then((accessToken) => {
        res.send("😀 Your access token is " + accessToken);
      })
      .catch(console.log);
  });
  
  //MPESA STK PUSH ROUTE
  app.post("/stkpush", (req, res) => {
    //=============REQUEST DATA=============
    const consumer_key = "ogNIHgP7LRN2LjGuKb7ShvCGM6xUHuKubEiiGnmddnNwl7CF"; // REPLACE IT WITH YOUR CONSUMER KEY
    const consumer_secret = "blg5AHGBAYzV40oJwfeR9pwByUlQb4nj055x8DfwAJzspOq1bRSlaQafuAkgYB5A"; // REPLACE IT WITH YOUR CONSUMER SECRET
   
    console.log(req.body);
    const r=req.body;
    const amount=r.amount
    const customer=r.customerMSISDN
    //=============REQUEST DATA=============
    // regUrls()
    getAccessToken(consumer_key,consumer_secret)
    .then((accessToken) => {
      const url =
        "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from(
        "6723519" +
          "d61bb261124f727cfad44a8a00708452d517ba453519926f06c102abc298a44f" +
          timestamp
      ).toString("base64");

  
        axios
          .post(
            url,
            {
              BusinessShortCode: "6723519",
              Password: password,
              Timestamp: timestamp,
              TransactionType: "CustomerBuyGoodsOnline",
              Amount: 1,
              PartyA: `254${customer}`,
              PartyB: "4123906",
              PhoneNumber: `254${customer}`,
              CallBackURL: "https://ab8b-154-159-252-66.ngrok-free.app/callback/",
              AccountReference: "Esenpi",
              TransactionDesc: "Mpesa Daraja API stk push test",
            },
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .then((response) => {
            res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
            console.log(response);
        })
          .catch((error) => {
            console.log(error);
            res.status(500).send("❌ Request failed");
          });
      })
      .catch(console.log);
  
});
  





  // REGISTER URL FOR C2B
  app.get("/registerurl", (req, resp) => {
    const consumer_key = "ogNIHgP7LRN2LjGuKb7ShvCGM6xUHuKubEiiGnmddnNwl7CF"; // REPLACE IT WITH YOUR CONSUMER KEY
    const consumer_secret = "blg5AHGBAYzV40oJwfeR9pwByUlQb4nj055x8DfwAJzspOq1bRSlaQafuAkgYB5A"; // REPLACE IT WITH YOUR CONSUMER SECRET
   
    getAccessToken(consumer_key,consumer_secret)
      .then((accessToken) => {
        const url = "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl";
        const auth = "Bearer " + accessToken;
        axios
          .post(
            url,
            {
              ShortCode: "6723519",
              ResponseType: "Complete",
              ConfirmationURL: "https://8d39-154-159-252-66.ngrok-free.app/confirmation",
              ValidationURL: "https://8d39-154-159-252-66.ngrok-free.app/validation",
            },
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .then((response) => {
            resp.status(200).json(response.data);
          })
          .catch((error) => {
            console.log(error);
            resp.status(500).send("❌ Request failed");
          });
      })
      .catch(console.log);
  });
  
  app.post("/confirmation", async (req, res) => {
    try {
      const transactionId = req.body.TransactionID; // Assume this field exists in the request body
      const transactionData = req.body;
  
      // Save the transaction data
      await setDoc(doc(firestore, "mpesa_transactions", transactionId), {
        ...transactionData,
        createdAt: new Date().toISOString(),
      });
  
      res.status(200).send("Transaction saved successfully.");
    } catch (error) {
      console.error("Error saving transaction:", error);
      res.status(500).send("Error saving transaction.");
    }
  });
  app.get("/validation", (req, resp) => {
    console.log("Validating payment");
    console.log(req.body);
  });
  app.get("/callback", (req, resp) => {
    console.log("Validating payment");
    console.log(req.body);
  });
  
  // B2C ROUTE OR AUTO WITHDRAWAL
  app.get("/b2curlrequest", (req, res) => {
    getAccessToken()
      .then((accessToken) => {
        const securityCredential =
          "N3Lx/hisedzPLxhDMDx80IcioaSO7eaFuMC52Uts4ixvQ/Fhg5LFVWJ3FhamKur/bmbFDHiUJ2KwqVeOlSClDK4nCbRIfrqJ+jQZsWqrXcMd0o3B2ehRIBxExNL9rqouKUKuYyKtTEEKggWPgg81oPhxQ8qTSDMROLoDhiVCKR6y77lnHZ0NU83KRU4xNPy0hRcGsITxzRWPz3Ag+qu/j7SVQ0s3FM5KqHdN2UnqJjX7c0rHhGZGsNuqqQFnoHrshp34ac/u/bWmrApUwL3sdP7rOrb0nWasP7wRSCP6mAmWAJ43qWeeocqrz68TlPDIlkPYAT5d9QlHJbHHKsa1NA==";
        const url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
        const auth = "Bearer " + accessToken;
        axios
          .post(
            url,
            {
              InitiatorName: "testapi",
              SecurityCredential: securityCredential,
              CommandID: "PromotionPayment",
              Amount: "1",
              PartyA: "600996",
              PartyB: "254768168060",
              Remarks: "Withdrawal",
              QueueTimeOutURL: "https://mydomain.com/b2c/queue",
              ResultURL: "https://mydomain.com/b2c/result",
              Occasion: "Withdrawal",
            },
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .then((response) => {
            res.status(200).json(response.data);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send("❌ Request failed");
          });
      })
      .catch(console.log);
  });


// // Configure the SMTP transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: "smtp.gmail.com",
// port: 587,  // or use other services like SendGrid, SES, etc.
//   auth: {
//     user: 'edwardhiuhu623@gmail.com', // your email address
//     pass: 'bmfw xwwd riwv cetn', // your email password or app-specific password if using Gmail
//   },
// });
// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
port: 587,  // or use other services like SendGrid, SES, etc.
  auth: {
    user: 'fikishwaconnections@gmail.com', // your email address
    pass: 'yztx pqvv yajy hxzi', // your email password or app-specific password if using Gmail
  },
});


// Validation middleware
const validateEmailRequest = (req, res, next) => {
  const { userData, driverDetails, locations, times } = req.body;

  if (!userData?.email || !driverDetails || !locations) {
    return res.status(400).json({
      error: 'Missing required fields in request body'
    });
  }

  next();
};

const generateEmailHTML = (userData, driverDetails, locations, times, amount) => {
  const startTime = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fikishwa Rides</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
      color: #1a1a1a;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header {
      background: #34D186;
      padding: 24px;
      text-align: center;
    }
    .header img {
      width: 120px;
      margin-bottom: 16px;
    }
    .header h1 {
      color: white;
      font-size: 24px;
      margin: 0;
      font-weight: 600;
    }
    .content {
      padding: 32px 24px;
    }
    .ride-summary {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 32px;
    }
    .amount {
      font-size: 32px;
      font-weight: 700;
      color: #34D186;
      text-align: center;
      margin: 24px 0;
    }
    .divider {
      height: 1px;
      background: #e9ecef;
      margin: 24px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 15px;
    }
    .detail-label {
      color: #6c757d;
    }
    .detail-value {
      font-weight: 500;
      text-align: right;
    }
    .driver-info {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 24px;
      margin-top: 24px;
    }
    .footer {
      padding: 24px;
      text-align: center;
      background: #f8f9fa;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">

      <h1>Hi ${userData.userName}</h1>
      <h1>Fikishwa Ride receipt</h1>
    </div>
    
    <div class="content">
      <div class="amount">
        KES ${amount}
      </div>
      
      <div class="ride-summary">
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">  ${startTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">From</span>
          <span class="detail-value">  ${locations.startAddress}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">To</span>
          <span class="detail-value">  ${locations.destinationAddress}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">  38 min </span>
        </div>
      </div>

      <div class="divider"></div>

      <div class="driver-info">
        <div class="detail-row">
          <span class="detail-label">Driver</span>
          <span class="detail-value">  ${driverDetails.username.toUpperCase()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Vehicle</span>
          <span class="detail-value">  ${driverDetails.carModel} • ${driverDetails.vehicleColor}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Plate Number</span>
          <span class="detail-value">  ${driverDetails.plate.toUpperCase()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Category</span>
          <span class="detail-value">  ${driverDetails.rideCategory}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Questions? Contact us at support@fikishwa.com</p>
      <p>© ${new Date().getFullYear()} Fikishwa. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

// Email sending endpoint
app.post('/send-email', validateEmailRequest, async (req, res) => {
  try {
    const { userData, driverDetails, locations, times, amount } = req.body;

    const mailOptions = {
      from: 'fikishwaconnections@gmail.com',
      to: userData.email,
      subject: 'Fikishwa Taxi - Your Ride Information',
      html: generateEmailHTML(userData, driverDetails, locations, times,amount)
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Function to generate email HTML for driver status updates
const generateDriverStatusEmailHTML = (personalInfo, vehicleInfo, status) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Driver Status Update</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
      color: #1a1a1a;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header {
      background: #34D186;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: white;
      font-size: 24px;
      margin: 0;
      font-weight: 600;
    }
    .content {
      padding: 32px 24px;
    }
    .footer {
      padding: 24px;
      text-align: center;
      background: #f8f9fa;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Driver Status Update</h1>
    </div>
    <div class="content">
      <p>Dear ${personalInfo.fullName},</p>
      <p>Your driver application status is now: <strong>${status}</strong>.</p>
      <p>Vehicle Information:</p>
      <ul>
        <li>Make: ${vehicleInfo.make}</li>
        <li>Model: ${vehicleInfo.model}</li>
        <li>Year: ${vehicleInfo.year}</li>
        <li>Type: ${vehicleInfo.type}</li>
      </ul>
      <p>Thank you for being a part of Fikishwa.</p>
    </div>
    <div class="footer">
      <p>Questions? Contact us at support@fikishwa.com</p>
      <p>© ${new Date().getFullYear()} Fikishwa. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

// Endpoint to send driver status update emails
app.post('/send-driver-status-email', async (req, res) => {
  try {
    const { personalInfo, vehicleInfo, status } = req.body;

    const mailOptions = {
      from: 'fikishwaconnections@gmail.com',
      to: personalInfo.email,
      subject: 'Fikishwa - Driver Status Update',
      html: generateDriverStatusEmailHTML(personalInfo, vehicleInfo, status)
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Driver status email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending driver status email:', error);
    res.status(500).json({
      error: 'Failed to send driver status email',
      details: error.message
    });
  }
});
