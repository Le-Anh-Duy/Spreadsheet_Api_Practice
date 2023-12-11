const express = require('express')
const path = require('path')

var router = require('./routes/sendFile')
const {google} = require("googleapis")
const { table } = require('console')

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.render("index")
}) 

app.use(router)

app.post("/", async (req, res) => {

    const {name, price} = req.body

    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    // creat client
    const client = await auth.getClient();

    // 
    const googleSheets = google.sheets({version: "v4", auth: client })

    // get metadata
    
    const spreadsheetId = "1-D80rt979fAASCi8zM9VdIuFl6EIhLXnx-y_CYo4I9o"

    const metaData = await googleSheets.spreadsheets.get({
        auth, 
        spreadsheetId,
    }) 

    // read rows from spreadsheet

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Buy!A:A",
    })

    // write rows to spreadsheets
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Buy!A:C",
        valueInputOption: "USER_ENTERED", 
        resource: {
            values: [
                ["1", name, price]
            ]
        }
    })

    console.log(name + price)

    res.send("successful")
})

const port = 3000

app.listen(port, (req, res) => console.log(`running on ${port}`))