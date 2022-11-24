import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

// Antes de ejecutar el .save() se hashea el password
usuarioSchema.pre('save', async function(next) {
    // Previene volver a hashear el password dos veces si modificas algún campo del usuario
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario