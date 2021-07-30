    //import obtenerAnunciosAjax from "./controllers/controllerAjax.js";
    
    export function limpiarFormulario(frm){
        
        frm.reset();
        document.forms[0].reset();
        document.getElementById("btnEliminar").classList.add("oculto");
        document.getElementById("btnModificar").classList.add("oculto");
        document.getElementById("btnCancelar").classList.add("oculto");
    
        //document.getElementById("btnSubmit").value = "Alta Persona";
        document.forms[0].id.value = "";
        
    }

    export function rellenarFormulario(id,anuncios){
        //let cosas = JSON.parse(localStorage.getItem("lista")) || [];
        //const anuncios = obtenerAnuncios() || [];

        console.log(anuncios);

        let anuncio = anuncios.filter((a) =>{
            if(a.id === parseInt(id))
                return true;
        })[0];
    
        document.getElementById("btnEliminar").classList.replace("oculto","visible");
        document.getElementById("btnModificar").classList.replace("oculto","visible");
        document.getElementById("btnCancelar").classList.replace("oculto","visible");

        document.getElementById("btnEliminar").classList.add("btn");
        document.getElementById("btnEliminar").classList.add("btn-danger");

        document.getElementById("btnModificar").classList.add("btn");
        document.getElementById("btnModificar").classList.add("btn-warning");

        document.getElementById("btnCancelar").classList.add("btn");
        document.getElementById("btnCancelar").classList.add("btn-dark");




        
        ///console.log(anuncio.dormitorios);
        //console.log(anuncio);
        
        const frm = document.forms[0];
    
        frm.titulo.value = anuncio.titulo;
        if(anuncio.transaccion === "venta")
            frm.tipoTransaccion.value = "venta";
        else
            frm.tipoTransaccion.value = "alquiler";
    
    
        frm.descripcion.value = anuncio.descripcion;
        frm.precio.value = anuncio.precio;
        frm.tipo.value = anuncio.tipo;
        frm.raza.value = anuncio.raza;
        frm.vacunado.value = anuncio.vacuna;
    
        frm.id.value = anuncio.id;
    
    
    
    
    }
