const express = require('express')
const {google} = require("googleapis")

const app = express()

app.use(express.urlencoded({ extended: true}))

app.post("/", async (req, res) => {

    console.log(123);
    // const {name, price} = req.body

    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/keep",
    });
    
    // creat client
    const client = await auth.getClient();

    // get metadata
    console.log(123);
    // const keepId = "1n9_EJdjbI8aoC7wo4AZegd9FOzk5xmQin4xgbv8qsgeRigGu79W2iCfdI8e0pKq3Q6gb1g"
    const respone = await fetch("https://keep.googleapis.com/v1/notes/1n9_EJdjbI8aoC7wo4AZegd9FOzk5xmQin4xgbv8qsgeRigGu79W2iCfdI8e0pKq3Q6gb1g", {
        method: "post",
        credentials: "include"
    });

    // console.log(respone.json());

    res.send("successful")
})

const port = 3000

app.listen(port, (req, res) => console.log("running on 3000"))