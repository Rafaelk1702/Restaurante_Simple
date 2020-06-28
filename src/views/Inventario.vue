<template>
<div class="contenedor">
    <div>
        <button class="standar-cabecera btn" @click="ActivarFormAgregar">Agregar nuevo producto</button>
        <button class="standar-cabecera btn">Agregar artículo existente</button>
        <button class="standar-cabecera btn">Administrar</button>
    </div>
    <form v-if="ActivarAgregar == false">
    <select class="contenido">
        <option>Código</option>
        <option>Nombre</option>
    </select>

    <!--Buscar input y select Inventario-->
    <input class="contenido" type="text" id="productobuscar" placeholder="Buscar..." v-model="Search" @keyup.enter="SearchData">
        <!--Buscar Botón Inventario-->
    <button class="contenido btn" @click.prevent="SearchData">Buscar</button>
    </form>
    <div>
    <form @submit.prevent="AgregarArticulo" v-if="ActivarAgregar">
        <div class="cerrar">
        <button class="btn standar-izquierda" @click="ActivarAgregar = false">X</button>
        </div>
        
        <h3>Nombre y Descripción del artículo</h3>
        <label>Nombre<input type="text" required v-model="ArticulosFormulario.Nombre"></label> 
        <label>Descripción<textarea class="contenido" id="descripcion" cols="30" rows="10" v-model="ArticulosFormulario.Descripcion"></textarea></label> 
        <h3>Precios</h3>
        <label>Precio del artículo bruto<input type="text" v-model="ArticulosFormulario.PrecioBruto"></label> 
        <label>Porcentaje del IVA<input type="text" v-model="ArticulosFormulario.Iva"></label> 
        <label>Precio por artículo<input type="text" v-model="ArticulosFormulario.PrecioArticulo"></label> 
        <h3>Inventario</h3>
        <label>Código de artículo<input type="text" placeholder="Buscar..." v-model="ArticulosFormulario.CodigoArticulo"></label> 
        <label>Código de barra <input type="text" v-model="ArticulosFormulario.CodigoBarra"></label>
        <label>Política de inventario <input type="text" v-model="ArticulosFormulario.Politica"></label>
        <label>Cantidad <input type="text" v-model="ArticulosFormulario.Cantidad"></label>
        <h3>Variantes</h3>
        <label>Color<input type="text" v-model="ArticulosFormulario.Color"></label> 
        <label>Tamaño o medidas<input type="text" v-model="ArticulosFormulario.Medidas"></label> 
        <label>Peso por unidad<input type="text" v-model="ArticulosFormulario.Peso"></label> 
        <label>Fecha de ingreso a inventario<input type="text" v-model="ArticulosFormulario.FechaIngreso"></label> 
        <label>Fecha de vencimiento<input type="text" v-model="ArticulosFormulario.FechaVencimiento"></label> 
        
        <label id="label-disponible" class="contenido">Disponibilidad<input type="radio" v-model="disponible" value='si'><label id="si" for="si">si</label>&nbsp;&nbsp;<input type="radio" value="no" v-model="disponible"><label id="no" for="no">no</label> <!--:value para expresion, value para cadena de texto-->
            <div v-if="disponible == 'si'">
            <select id="ArticulosFormulario.SeleccionCanal" class="canalesventa-lista contenido" v-model="ArticulosFormulario.SeleccionCanal">
                <option>Directo - Fabricante, consumidor</option>
                <option>Corto - Fabricante,detallista y consumidor</option>
                <option>Largo - Fabricante,mayorista,minorista y consumidor</option>      
                </select>
            </div></label>
         
        
         <h3>Organización</h3>
        <label>Tipo de producto<input type="text" placeholder="Buscar..." v-model="ArticulosFormulario.TipoProducto"></label>
        
        <label>Proveedor<input type="text" placeholder="Buscar..." v-model="ArticulosFormulario.Proveedor"></label>
        
        <label>Etiquetas<input type="text" placeholder="Buscar... arrastrar y soltar" v-model="ArticulosFormulario.Etiqueta"></label>
        
        <div>
            <button class="btn contenido GuardarFor">Guardar</button>
        </div>
        
         

    </form> 
    <form v-else>

    <!--Tabla de Base de Datos en Front-->
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th scope="col">Disponible</th>
                <th scope="col">Precio</th>
            </tr>
        </thead>
        <tbody v-for="(i, index) in ArticulosArray" :key="index">
            <tr>
                <th scope="row">{{i.CodigoArticulo}}</th>
                <td>{{i.Nombre}}</td>
                <td>{{i.Disponible}}</td>
                <td>{{i.PrecioBruto}}</td>
                <button id="info" class="btn">Info</button>
                <button id="edit" class="btn">Editar</button>
                <button id="delet" class="btn">Eliminar</button>
            </tr>
        </tbody>
    </table>
    </form>
    </div>
    <div>
        <br>
        <pre>{{$data}}</pre>
    </div>

</div>

</template>

<script>
//import axios from "axios"

export default {
  data () {
    return { 
        Search:'',       
        disponible: 'si', //:value para expresion, value para cadena de texto 
        ArticulosFormulario: {Nombre: '',Descripcion:'',
        //Precios
        PrecioBruto: '',Iva:'',PrecioArticulo:'',
        //Inventario
        CodigoArticulo:'',CodigoBarra:'',Politica:'',Cantidad:'',
        //variantes
        Color:'',Medidas:'',Peso:'',FechaIngreso:'',FechaVencimiento:'',
        //Dsiponibilidad
        Disponible:'',SeleccionCanal:'Directo - Fabricante, consumidor',
        //Organizacion
        TipoProducto:'',Proveedor:'',Etiqueta:''
      },
      //Nombre:"",
      ArticulosArray: [{
        CodigoArticulo: '1212',
        Nombre: 'Palta',
        Disponible: 'si',
        PrecioBruto: '13,67'
      }
      ],
      CopyArray:[],
      ActivarAgregar: false, //formulario agregar desactivado,
      
    }
 /*   created(){
        this.fetch()
    }*/

  },
  created: function(){
      this.CopyArray = this.ArticulosArray; //Guardo en array porque con filter me borra los articulos.
      //console.log(this.CopyArray)
  },
  methods:{
      AgregarArticulo: function(){
          let {Nombre, Descripcion, PrecioBruto, Iva, PrecioArticulo, CodigoArticulo, CodigoBarra, Politica, Cantidad, Color, Medidas, Peso, FechaIngreso, FechaVencimiento, Disponible, SeleccionCanal, TipoProducto, Proveedor, Etiqueta} = this.ArticulosFormulario;
          Disponible= this.disponible,
          this.ArticulosArray.push({
              Nombre, Descripcion, Disponible, PrecioBruto, Iva, PrecioArticulo, CodigoArticulo, CodigoBarra, Politica, Cantidad, Color, Medidas, Peso, FechaIngreso, FechaVencimiento, Disponible, SeleccionCanal, TipoProducto, Proveedor, Etiqueta
          }),
          //limpiar
            this.ArticulosFormulario.Nombre='',this.ArticulosFormulario.Disponible='',this.ArticulosFormulario.Descripcion='',
            //Precios
            this.ArticulosFormulario.PrecioBruto= '',this.ArticulosFormulario.Iva='',this.ArticulosFormulario.PrecioArticulo='',
            //Inventario
            this.ArticulosFormulario.CodigoArticulo='',this.ArticulosFormulario.CodigoBarra='',
            this.ArticulosFormulario.Politica='',this.ArticulosFormulario.Cantidad='',
            //variantes
            this.ArticulosFormulario.Color='',this.ArticulosFormulario.Medidas='',this.ArticulosFormulario.Peso='',
            this.ArticulosFormulario.FechaIngreso='',this.ArticulosFormulario.FechaVencimiento='',
            //Dsiponibilidad
            this.ArticulosFormulario.Disponible='',
            //Organizacion
            this.ArticulosFormulario.TipoProducto='',this.ArticulosFormulario.Proveedor='',
            this.ArticulosFormulario.Etiqueta=''
      },
      ActivarFormAgregar(){
          this.ActivarAgregar= true          
      },
     /* SearchData: function(){
          this.page = I,
            this.fetch()
      }*/
      SearchData: function(){
          this.ArticulosArray = this.CopyArray;
         // let {CodigoArticulo, Nombre} = this.ArticulosArray;
          //console.log("codigo "+ this.CodigoArticulo +"  input "+this.Search);
          this.ArticulosArray = this.ArticulosArray.filter(CodigoA => {
              console.log("codigo "+ CodigoA.CodigoArticulo +"  input "+this.Search);
              return CodigoA.CodigoArticulo == this.Search
                
          });//(function(buscar){
              
          //});//(buscar =>{return buscar.CodigoArticulo == this.Search});
          //console.log("search -- "+ buscar)
      }
      

  },


}
</script>

<style>
.standar-cabecera{
    border: 1px solid #39c;
    border-radius: 5px;
    outline: none;  
}
.standar-element{
    border: 1px solid #39c;
    border-radius: 5px;
    text-align: left;
}
.standar-izquierda{
 /**   position: absolute;
    top: 50px;
    right: 100px;
    text-align: center;*/ 
    font-size: 15px;
}
.cerrar{
    width: 90%;
    top: 150px;
    
    margin-right: 100px;
}
@media only screen and (min-width:480px){
    .cerrar{
        float: right;
       width: 20%;
        position: fixed;
    }
}

.contenido {
    font-size: 16px;
    text-align: left;
    padding-left: 4px;
    margin-top: 50px;
    margin-inline-start: 10px;
    outline: none;
    border: 1px solid #39c;
    border-radius: 5px;
}

/**Botones */
.btn {
    background-color: rgb(56, 120, 199);
    color: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
}
.btn:active{
    background-color: rgb(32, 100, 160);
}
#edit{
    background-color: khaki;
    color: black;
    margin-left: 10px;
}
#delet{
    background-color: orangered;
    margin-left: 10px;
}
/**#info{

}
/**Formulario y elementos */
#label-disponible{
    text-align: center;
    padding: 0px 15px 35px;
    margin-top: 60px;
    
}
#si{
    padding: 5px 5px 0px 0px;
    margin: 0 auto;
}
#no{
     padding: 5px 5px 0px 0px;
    margin: 0 auto;   
}
.GuardarFor:active{
    background-color: green;
}
form{
    width: 99%;
    margin: auto;
}
#descripcion{
    margin-top: 10px;
}
label{
    display: inline-block;
    margin: 5px 5px 5px 20px;
    clear: both;
    /*float: left;*/
}
table {
    padding-top: 20px;
    margin: 0 auto;
    width: 70%;
}
textarea{
    height : 70px;   
    vertical-align: 0; 
    margin: 0px 0px -20px 0px;
    padding-top: 1px ;
}

input{
    font-size: 15px;
    text-align: left;
    padding-left: 4px;
    margin-top: 10px;
    margin-bottom: 0px;
    margin-inline-start: 10px;
    outline: none;
    border: 1px solid #39c;
    height: 30px;
    border-radius: 5px; 
   /***float: left; */ 
}
input:active{
   border: 1px solid rgb(102, 197, 245); 
}
</style>
