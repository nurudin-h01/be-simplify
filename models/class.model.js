const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
	{
		namakelas: {
			type: String,
			maxlength: 100,
            default: "Dummy Class",
            required: true
		},
        jeniskelas: {
			type: String,
			enum: ["Dummy Type 1", "Dummy Type 2"],
			maxlength: 20,
            default: "Dummy Type 1",
		},
		jumlahpeserta: [
            {
				idpeserta: {
					type: mongoose.Types.ObjectId,
					ref: "User",
				},
			},
        ],
        jadwal: {
			type: Date,
            default: Date.now(),
		},
        tempat: {
			type: String,
			maxlength: 50,
            default: "Dummy Place 1",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const ClassModel = mongoose.model("Class", classSchema);
module.exports = ClassModel;