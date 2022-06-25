const { application } = require('express')
const express = require('express')
const mysql = require ('mysql')

const app = express ();

const db = mysql.createConnection({
    host: "localhost",
    database :"murid",
    user :"root",
    password :""
})


db.connect((err) => {
    if(err) throw err
    console.log('database conected')

    const sql= "SELECT * FROM `murid_sd`"
    db.query(sql, (err, result)=> {
console.log("hasil database ->", result)
    })

    app.get("/", (req, res) => {
        res.send("ok route open")
    })
}) 




app.listen(8000, () => {
    console.log ('server readyy...')
})