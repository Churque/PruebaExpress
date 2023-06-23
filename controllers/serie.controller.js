import SerieModel from "../models/serie.model.js";

async function createPersonalSerie(req, res) {
    try {
        if (!req.body.nombre || !req.body.estado || !req.body.capítulos || !req.body.minutos) {
          return res.status(400).send({ success: false, error: "Falta algún campo como nombre, estado, capítulos, minutos" });
        }
        const userId = req.params.userId;
        await SerieModel.create({
          userId: userId,
          nombre: req.body.nombre,
          portada: req.body.portada,
          estado: req.body.estado,
          capítulos: req.body.capítulos,
          minutos: req.body.minutos,
        });
    
        res.status(201).send({ success: true });
      } catch (err) {
        res.status(500).send({ success: false, error: err.message });
      }
}

async function createGlobalSerie(req,res){
    try {
        if (!req.body.nombre || !req.body.estado || !req.body.capítulos || !req.body.minutos) {
          return res.status(400).send({ error: "Falta algún campo como nombre, estado, capítulos, minutos o adminId" });
        }
        await SerieModel.create({
          nombre: req.body.nombre,
          portada: req.body.portada,
          estado: req.body.estado,
          capítulos: req.body.capítulos,
          minutos: req.body.minutos,
        });
    
        res.send({ success: true });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
}


async function getSerieByUser(req, res) {
    const userId = req.params.userId;
    const series = await SerieModel.find({ id: userId });
    res.send({ series });
}

async function deletePersonalSerieById(req,res){
    try {
        const userId = req.params.userId;
        const serieId = req.params.serieId;
        const serie = await SerieModel.findOne({ userId, _id: serieId });
        if (!serie) {
          return res.status(403).send({ error: "No corresponde el usuario logueado con el usuario creador del mensaje" });
        }
    
        const deletionResult = await SerieModel.deleteOne({ _id: serieId });
        if (deletionResult.deletedCount === 1) {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
}
    async function getSeries(req, res) {
        const adminId = req.params.adminId;
        const series = await SerieModel.find();
        res.send({ series });
    }
    

export { createPersonalSerie ,getSerieByUser,deletePersonalSerieById,getSeries,createGlobalSerie};
