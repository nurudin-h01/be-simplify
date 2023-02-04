const ClassModel = require("../models/class.model");
const UsersModel = require("../models/users.model");
const { dataToken } = require("../helpers");


class UsersController {
    static async getClass(req, res){
        try {
            const listClass = await ClassModel.find();
            res.status(200).send(listClass);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async registerclass(req, res){
        try {
            const {data} = dataToken(req, res)
            const {kelas, status, motivasi} = req.body
            const UID = data._id
            let User = await UsersModel.findOne({userID: UID, "statuskelas.kelas": `${kelas}` })
            let Class = await ClassModel.findOne({_id: kelas, "jumlahpeserta.idpeserta": `${UID}`})
            // ketika user punya kelas yang disimpan
            if(User){
                await UsersModel.updateOne(
                    { _id: UID, 'statuskelas.kelas': kelas },//Finding Product with the particular price
                    { $set: { 'statuskelas.$.status': status, 'statuskelas.$.motivasi': motivasi  } },
                );
                // ketika kelas tidak ada id siswa daftar
                if(!Class){
                    let ClassExist = await ClassModel.findOne({_id: kelas})
                    let newclass = {idpeserta: UID}
                    console.log(ClassExist)
                    ClassExist.jumlahpeserta.push(newclass)
                    const Register = await ClassModel.findOneAndUpdate({ _id: kelas }, ClassExist);
                }
                res.status(200).send("berhasil daftar");
            } else {
                let UserExist = await UsersModel.findOne({userID: UID})
                let newclass = {kelas: kelas, status:status, motivasi:motivasi}
                UserExist.statuskelas.push(newclass)
                const Register = await UsersModel.findOneAndUpdate({ _id: UID }, UserExist);
                if(!Class){
                    let ClassExist = await ClassModel.findOne({_id: kelas})
                    let newclass = {idpeserta: UID}
                    ClassExist.jumlahpeserta.push(newclass)
                    const Register = await ClassModel.findOneAndUpdate({ _id: kelas }, ClassExist);
                }
                res.status(200).send("berhasil daftar");
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }

    }
}

module.exports = UsersController;