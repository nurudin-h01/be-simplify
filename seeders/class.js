const ClassModel = require("../models/class.model")
const bcrypt = require("bcrypt")
const DBconnection = require("../config/index")
require('dotenv').config({ path: "../.env" })
const {MONGODB_URL} = process.env

const saltRounds = 10

const ClassData = [   
  new ClassModel({
    namakelas:"Dummy Class",
    jeniskelas: "Dummy Type 1",
    jadwal: Date.now(),
    tempat: "Dummy Place"
}),
new ClassModel({
    namakelas:"Dummy Class 2",
    jeniskelas: "Dummy Type 2",
    jadwal: Date.now(),
    tempat: "Dummy Place"
}),



]

async function createSeeder(){
    try {
        await DBconnection(MONGODB_URL)
        const existData = await ClassModel.find()
        if(existData.length === 0){
            await ClassData.map(async (data, index) => {
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