import mongoose from "mongoose";

const portafolioSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "El título es requerido"],
        trim: true,
        maxLength: 255
    },
    descripcion: {
        type: String,
        trim: true,
        maxLength: 500
    },
    experiencia: [
        {
            nombreEmpresa: {
                type: String,
                trim: true,
                required: true,
                maxLength: 255
            },
            cargo: {
                type: String,
                trim: true,
                required: true,
                maxLength: 255
            },
            fechaInicio: {
                type: Date,
                required: true,
                max: Date.now() + 1 * 60 * 60 * 1000
            },
            fechaFin: {
                type: Date,
                max: Date.now() + 1 * 60 * 60 * 1000
            },
            enCurso: Boolean,
            ubicacion: {
                type: String,
                trim: true,
            },
            responsabilidades: [
                {
                    titulo: {
                        type: String,
                        trim: true,
                        required: true,
                        maxLength: 255
                    }
                }
            ]
        }
    ],
    formaciones: [
        {
            titulo: {
                type: String,
                trim: true,
                required: true,
                maxLength: 255
            },
            campo: {
                type: String,
                trim: true,
                required: true,
                maxLength: 255
            },
            nombreCentro: {
                type: String,
                trim: true,
                maxLength: 255
            },
            fechaInicio: {
                type: Date,
                max: Date.now() + 1 * 60 * 60 * 1000
            },
            fechaFin: {
                type: Date,
                max: Date.now() + 1 * 60 * 60 * 1000
            },
            enCurso: Boolean,
            ubicacion: {
                type: String,
                trim: true,
            }
        }
    ],
    habilidades: [
        {
            type: String,
            trim: true,
            maxLength: 255
        }
    ],
    aptitudes: [
        {
            type: String,
            trim: true,
            maxLength: 255
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