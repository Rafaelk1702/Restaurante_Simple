import express from 'express'
const router = express.Router();

// importar el modelo nota
import Invent from '../models/Inventario';

// Get con parámetros
router.get('/inventario/:id', async(req, res, next) => {
  const _id = req.params.id;
  try {
    const notaDB = await Invent.findOne({_id});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

router.get('/inventario', function(req,res){
  try{  Invent.find({}).then(function(notas){
    res.send(notas);
  })} catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }

});
// Agregar una  nota
router.post('/inventario', async(req, res) => {
  const body = req.body;  
  try {
    const notaDB = await Invent.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    //return res.status(500).json({
      //mensaje: 'Ocurrio un error en el post datainventario.js',
      //error
    //})
    
  }
});
// Delete eliminar una nota
/*router.delete('/notas/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const notaDb = await Nota.findByIdAndDelete({_id});
    if(!notaDb){
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(notaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }

});*/

router.delete('/inventario/:id', function(req,res,next){
  Invent.findByIdAndRemove({_id: req.params.id}).then(function(nota){
    res.send(nota);
  });
});

//Ruta PUT
/*router.put('/notas/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const notaDb = await Nota.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(notaDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});*/
router.put('/inventario/:id', function(req,res,next){
  Invent.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Invent.findOne({_id: req.params.id}).then(function(nota){
     res.send(nota); 
    });    
  });
});

// Exportamos la configuración de express app
module.exports = router;