const functions = require("firebase-functions");
const admin=require("firebase-admin");
const express=require("express");

const app=express();

admin.initializeApp({
  credential: admin.credential.cert("./credentials.json"),
  databaseURL: "https://functions-api-node.firebaseio.com",
});

const db=admin.firestore();

app.get("/hola", (req, res)=>{
  return res.status(200).json({message: "Hola insectos"});
});

app.post("/api/products", async(req, res) => {
 await db.collection("products")
      .doc()
      .create({name: req.body});
    return res.status(204).json({mensaje: "producto agregado"})
});
exports.app=functions.https.onRequest(app);

