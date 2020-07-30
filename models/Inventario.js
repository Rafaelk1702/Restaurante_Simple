import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inventarioSchema = new Schema({
  Nombre: {type: String, required: [true, 'Nombre obligatorio']},
  Descripcion: String,
  PrecioBruto: Number,
  Iva: Number,
  PrecioArticulo: Number,
  CodigoArticulo:{type:String, required:[true, 'Código obligatorio']}, 
  CodigoBarra: String,
  Politica: String,
  Cantidad: Number,
  Color: String,
  Medidas: String,
  Peso: Number,
  FechaIngreso:{type: Date, default: Date.now},
  FechaVencimiento:{type: Date},
  Disponible: String,
  SeleccionCanal: String,
  TipoProducto: String,
  Proveedor: String,
  Etiqueta: String
  //rank: {type:String},
  //available: {type: Boolean, default: false}
});

// Convertir a modelo
const Inventario = mongoose.model('Inventario', inventarioSchema);

export default Inventario;
//module.exports = Nota;