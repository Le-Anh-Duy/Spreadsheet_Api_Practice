const express = require("express")
const path = require("path")

const router = express.Router();
console.log("hello")

router.post("sent-table/", (req, res) => {
    console.log("hihi")
    console.log(req.headers, req.body.hihi)
})

router.get("/script.js", (req, res, next) => {
    
    const option = {
        root: path.join(__dirname)
    }

    const file = "./script.js"
    res.sendFile(file, option, (err) => {
        if (err) {
            console.log("fail")
            next(err)
        } else {
            console.log("sucessfully sent file")
        }
    })
})

router.get("/style.css", (req, res, next) => {
    const option = {
        root: path.join(__dirname)
    }
    const file = "./style.css"
    res.sendFile(file, option, (err) => {
        if (err) {
            console.log("fail")
            next(err)
        } else {
            console.log(`sucessfully sent file ${file}`)
        }
    })
})

module.exports = router