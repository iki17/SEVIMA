const { application } = require("express")
const express = require("express")
const mysql = require ("mysql")
const BodyParser = require("body-parser")

const app = express ();

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views" )

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
        const users = JSON.parse(JSON.stringify(result))
        console.log("hasil database ->", users)

        // untuk get data
        app.get("/", (req, res) => {
            res.render("index" , {users: users, title : "DAFTAR MURID BARU "})
        })
        // untuk insert data
        app.post("/tambah", (req, res) => {
            const insertsql = `INSERT INTO murid_sd (nama,umur,nama_ibu) VALUES ('${req.body.nama}',
            '${req.body.umur}','${req.body.nama_ibu}');`
            db.query(insertsql, (err,result)=> {

                if(err) throw err
                res.redirect("/");
            })
        })

    })
}) 




app.listen(8000, () => {
    console.log ('server readyy...')
})