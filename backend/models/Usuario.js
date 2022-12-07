import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minLength: 8
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 320
    },
    edad: { 
      type: 
      Number, 
      min: 0, 
      max: 120 
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    portafolios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portafolio",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Antes de ejecutar el .save() se hashea el password
usuarioSchema.pre("save", async function (next) {
  // Previene volver a hashear el password dos veces si modificas algún campo del usuario
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Deshashear el password para verificarlo
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
