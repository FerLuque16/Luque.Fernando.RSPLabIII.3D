class Anuncio
{
    constructor(id,titulo, transaccion, descripcion, precio ){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export default class Anuncio_Animal extends Anuncio
{
    constructor(id,titulo, transaccion, descripcion, precio ,tipo,
         raza, fecha_nac, vacunado){
        super(id,titulo, transaccion, descripcion, precio);
        this.tipo = tipo;
        this.raza = raza;
        this.fecha_nac = fecha_nac;
        this.vacunado = vacunado;
    }
}