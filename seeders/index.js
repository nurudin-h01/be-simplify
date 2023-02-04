const UsersModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const DBconnection = require("../config/index")
require('dotenv').config({ path: "../.env" })
const {MONGODB_URL} = process.env

const saltRounds = 10

const UserData = [   
  new UsersModel({
    namalengkap: "Dummy 1",
    username: "Username 1",
    role: "aktivis",
    email: "Dummy Email",
    tempatlahir: "Dummy Place",
    tanggallahir: Date.now(),
    pekerjaan: "Dummy Work",
    nomorhp: "+628123123123",
    tahunmasuk: 2015,
    suluk: "Dummy",
    Kaji: "Dummy",
    riwayat_penyakit: "Dummy",
    password: bcrypt.hashSync("admin123", saltRounds)
})]

async function createSeeder(){
    try {
        await DBconnection(MONGODB_URL)
        const existData = await UsersModel.find()
        if(existData.length === 0){
            await UserData.map(async (data, index) => {
                    await data.save((err, result) => {
                        console.log(result)
                    });
            });
        } else {
            console.log('data is exist')
        }
    } catch (error) {
        console.log(error.message)
    }
}

createSeeder()