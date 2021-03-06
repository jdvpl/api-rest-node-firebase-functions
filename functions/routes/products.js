
const { Router }=require('express');


const admin=require("firebase-admin");

const router = new Router();


admin.initializeApp({
    credential: admin.credential.cert("./credentials.json"),
    databaseURL: "https://functions-api-node.firebaseio.com",
  });
  
  const db=admin.firestore();
// crear producto
router.post("/api/products", async(req, res) => {
    try {
       await db.collection("products")
       .doc()
       .set(req.body);
       res.status(200).json({msg: "se agrego correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
   });
   
// obtener producto por id
router.get("/api/product/:id",(req,res)=>{
    (async ()=>{
        try {
            const doc= db.collection("products").doc(req.params.id)
            const item=await doc.get();
            const response=item.data();
            return res.status(200).json(response)
            } catch (error) {
            console.log(error)
            return res.status(500).send(error)
            }
    })();
})

router.get("/api/products",async(req, res)=>{
    try {
        const query=db.collection("products");
    const querySnapshot=await query.get();
    const respose=querySnapshot.docs.map(doc =>({
        id:doc.id,
        nombre: doc.data().nombre,
        precio:doc.data().precio,
        cantidad: doc.data().cantidad

    }));
    return res.status(200).json(respose)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});
// elete
router.delete("/api/product/:id", async(req, res)=>{
    try {
        const doc= db.collection("products").doc(req.params.id)
        await doc.delete();
        res.status(200).json({msg: "se elminino correctamente"})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

router.put("/api/product/:id", async(req, res)=>{
    try {
        const document= db.collection("products").doc(req.params.id);
        await document.update(req.body)
        return res.status(200).json({msg: "Se actualizo correctamente el producto "+req.body.nombre})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})
module.exports = router;




