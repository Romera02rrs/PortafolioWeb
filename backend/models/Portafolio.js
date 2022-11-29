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
            titulo: {
                type: String,
                trim: true,
                required: true
            },
            campo: String,
            nombreCentro: String,
            fechaInicio: Date,
            fechaFin: Date,
            enCurso: Boolean,
            ubicacion: String
        },
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
        //required: true
    }
},
{
    timestamps: true
})

const Portafolio = mongoose.model("Portafolio", portafolioSchema)

export default Portafolio