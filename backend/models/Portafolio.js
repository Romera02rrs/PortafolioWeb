import mongoose from "mongoose";

const portafolioSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    formaciones: [
        {
            type: String,
            trim: true
        }
    ],
    habilidades: [
        {
            type: String,
            trim: true
        }
    ],
    aptitudes: [
        {
            type: String,
            trim: true
        }
    ],
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
},
{
    timestamps: true
})

const Portafolio = mongoose.model("Portafolio", portafolioSchema)

export default Portafolio