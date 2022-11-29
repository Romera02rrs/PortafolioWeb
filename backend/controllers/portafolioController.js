import Portafolio from "../models/Portafolio.js"

const obtenerPortafolios = async (req, res) => {

    try {
        // const portafolios = await Portafolio.find({autor: req.usuario._id})
        const portafolios = await Portafolio.find().where("autor").equals(req.usuario)
        res.json(portafolios)
    } catch (error) {
        console.log(error);
    }
}

const nuevoPortafolio = async (req, res) => {

    const nuevoPortafolio = new Portafolio(req.body)
    nuevoPortafolio.autor = req.usuario._id
    try {
        const portafolioAlmacenado = await nuevoPortafolio.save()
        res.json(portafolioAlmacenado)
    } catch (error) {
        console.log(error);
    }

}

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