import Portafolio from "../models/Portafolio.js"

// Obtener todos los portafolios  -  GET /api/portafolios
const obtenerPortafolios = async (req, res) => {

    try {
        // const portafolios = await Portafolio.find({autor: req.usuario._id})
        const portafolios = await Portafolio.find().where("autor").equals(req.usuario)
        res.json(portafolios)
    } catch (error) {
        console.log(error);
    }
}

// Crear un nuevo portafolio  -  POST /api/portafolios
const nuevoPortafolio = async (req, res) => {

    const nuevoPortafolio = new Portafolio(req.body)
    nuevoPortafolio.autor = req.usuario._id
    try {
        const portafolioAlmacenado = await nuevoPortafolio.save()
        res.json({ msg: "Portafolio almacenado correctamente en la base de datos" })
    } catch (error) {
        console.log(error);
    }

}

// Obtener un portafolio  -  GET /api/portafolios/:id
const obtenerPortafolio = async (req, res) => {

    //const portafolio = await Portafolio.find().where("_id").equals(req.params.id).where("autor").equals(req.usuario._id)

    const { id } = req.params;

    let portafolio

    try {
        portafolio = await Portafolio.findById(id)
    } catch (error) {
        console.log("Portafolio no encontrado");
    }

    if(!portafolio){
        const error = new Error("No se ha encontrdo el portafolio");
        return res.status(404).json({ msg: error.message });
    }

    if (portafolio.autor.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    }

    return res.json(portafolio)
}

// Editar un portafolio  -  PUT /api/portafolios/:id
const editarPortafolio = async (req, res) => {
    const { id } = req.params;

    let portafolio

    try {
        portafolio = await Portafolio.findById(id)
    } catch (error) {
        console.log("Portafolio no encontrado");
    }

    if(!portafolio){
        const error = new Error("No se ha encontrdo el portafolio");
        return res.status(404).json({ msg: error.message });
    }

    if (portafolio.autor.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    }

    // Solo edita un campo
    portafolio.titulo = req.body.titulo || portafolio.titulo
    
    try {
        const portafolioAlmacenado = await portafolio.save()
        res.json(portafolioAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

// Eliminar un portafolio  -  DELETE /api/portafolios/:id
const eliminarPortafolio = async (req, res) => {
    const { id } = req.params;

    let portafolio

    try {
        portafolio = await Portafolio.findById(id)
    } catch (error) {
        console.log("Portafolio no encontrado");
    }

    if(!portafolio){
        const error = new Error("No se ha encontrdo el portafolio");
        return res.status(404).json({ msg: error.message });
    }

    if (portafolio.autor.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    }

    try {
        await portafolio.deleteOne()
        res.json({msg: "Portafolio elminiado"})
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerPortafolios,
    nuevoPortafolio,
    obtenerPortafolio,
    editarPortafolio,
    eliminarPortafolio
}