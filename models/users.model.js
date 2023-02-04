const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		namalengkap: {
			type: String,
			maxlength: 100,
            default: "Dummy Name",
		},
        username: {
			type: String,
			maxlength: 100,
		},
        password: {
			type: String,
			maxlength: 255,
		},
        role: {
			type: String,
			enum: ["aktivis", "admin"],
			maxlength: 9,
		},
		email: {
			type: String,
			maxlength: 150,
            default: "Dummy Email"
		},
		tempatlahir: {
			type: String,
			maxlength: 20,
            default: "Dummy Place"
		},
		statuskelas: [
			{
				kelas: {
					type: mongoose.Types.ObjectId,
					ref: "Class",
				},	
				status: {
					type: String,
                    enum: ["Simpan", "Waiting", "Proses", "Diterima", "Kosong"],
                    default: "Kosong"
				},
				motivasi: {
					type: String,
				}
			},{_id: false}
		],
		tanggallahir: {
			type: Date,
            default: Date.now(),
		},
        pekerjaan: {
			type: String,
			maxlength: 150,
            default: "Dummy Work"
		},
        nomorhp: {
			type: String,
			maxlength: 20,
		},

		tahunmasuk: {
			type: Number,
			maxlength: 4,
		},
		suluk: {
			type: String,
			maxlength: 20,
		},
		Kaji: {
			type: String,
			maxlength: 20,
		},
		riwayat_penyakit: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UsersModel = mongoose.model("User", userSchema);
module.exports = UsersModel;