import crearTabla from "./tablas.js";
import {renderizarLista} from "./tablas.js";
import { tablaToObjeto } from "./tablas.js";

/*import limpiarFormulario from "./formulario.js";
import {rellenarFormulario} from "./formulario.js";*/
import Anuncio_Animal from "./anuncios.js";

import {limpiarFormulario, rellenarFormulario} from "./formulario.js";


import {obtenerAnunciosAjax,obtenerAnunciosAjaxPromise,deleteMascotaAjax, postMascotaAjax, updateMascotaAjax} from "./controllers/controllerAjax.js";

import {obtenerMascotasFetch,postMascotaFetch,postMascotaFetchAsync, deleteMascotaFetch, updateMascotasFetch} from "./controllers/controllerFetch.js";

import {obtenerMascotasAxios,postMacotasAxios,postMacotasAxiosAsync,deleteMascotasAxios,updateMascotasAxios} from "./controllers/controllerAxios.js";

//import {mascotas} from "./controllers/controllerAjax.js"

//let checksJSON = JSON.parse(localStorage.getItem("checks")) || [];

//let anuncios = tablaToObjeto(document.getElementById("miTabla")) || [];

let anuncios = [];

let listaAnuncios;

let filtro = document.getElementById("filtro");



let checks;









window.addEventListener("DOMContentLoaded",async ()=>{
    
    listaAnuncios = await obtenerAnunciosAjaxPromise();

    //listaAnuncios= await obtenerMascotasFetch();

    //listaAnuncios = await obtenerMascotasAxios();
    
    
    

    renderizarLista(crearTabla(listaAnuncios),document.getElementById("divLista"));
    
    


    document.forms[0].addEventListener("submit",handlerSubmit);
   

    window.addEventListener("click",handlerClick);

    

    
    checks = document.querySelectorAll( '.cbox' );

    
    let existe = JSON.parse( localStorage.getItem('chkprecio'));
    if(existe){
        filtrarChecks(listaAnuncios);
    }
    
    

    
    checks.forEach( element  =>{ 
        

        filtrarColumnas( element,listaAnuncios);
    });
    

});


function filtrarChecks(listaAnuncios){
    
    
    let checks = document.querySelectorAll( '.cbox' );

    let checkboxs = [];
    
    checks.forEach((a)=>{
     

        let listaMapeada = listaAnuncios.map( row => {
            
                
                let fila = {};

                
    
                for (const key in row) {
                    let checkbox = JSON.parse( localStorage.getItem('chk'+key));
                    
                    if(checkbox.id == 'chk'+key && checkbox.value == true){
                        
                    
                    
                    fila[key] = row[key];

                    
                    }
                    else if(checkbox.value == false){
                        document.getElementById('chk'+key).checked = false;
                    }
                    
                }
            
               
                return fila;
            
            
        })
        
   
        renderizarLista(crearTabla(listaMapeada),document.getElementById("divLista"));

    })


}





function handlerSubmit(e){
    e.preventDefault();

    const frm = e.target;

    if(frm.id.value){
        

    }
    else{
        const nuevoAnuncio = new Anuncio_Animal(Date.now(),
        frm.titulo.value,
        frm.tipoTransaccion.value,
        frm.descripcion.value,
        parseInt(frm.precio.value),
        frm.tipo.value,
        frm.raza.value,
        frm.fecha.value,
        frm.vacunado.value);
        

        altaAnuncio(nuevoAnuncio);
        limpiarFormulario(document.forms[0]);
        

    }
    
}

async function modificarAnuncio(anuncio){
 
    //FETCH
    //await updateMascotasFetch(anuncio.id,anuncio);

    //listaAnuncios = await obtenerMascotasFetch();

    //AJAX

    await updateMascotaAjax(anuncio);

    listaAnuncios = await obtenerAnunciosAjaxPromise();


    //AXIOS

    //await updateMascotasAxios(anuncio.id,anuncio);

    //listaAnuncios = await obtenerMascotasAxios();




    console.log(listaAnuncios);

    renderizarLista(crearTabla(listaAnuncios),document.getElementById("divLista"));

    checks = document.querySelectorAll( '.cbox' );

    checks.forEach( element  =>  { filtrarColumnas( element, listaAnuncios ) });


    

}



async function altaAnuncio(anuncio){
    anuncios.push(anuncio);

    
    

    //FETCH
    

    //await postMascotaFetch(anuncio);
    //await postMascotaFetchAsync(anuncio);

    //listaAnuncios = await obtenerMascotasFetch();
    

    //AJAX
    await postMascotaAjax(anuncio);
    listaAnuncios = await obtenerAnunciosAjaxPromise();

    

    //AXIOS

    //await postMacotasAxiosAsync(anuncio);
    
    //listaAnuncios = await obtenerMascotasAxios();

    


    

    renderizarLista(crearTabla(listaAnuncios),document.getElementById("divLista"));

    checks = document.querySelectorAll( '.cbox' );

    checks.forEach( element  =>  { filtrarColumnas( element, listaAnuncios ) });

}





async function handlerClick(e){

    if(e.target.matches("td")){
        
        console.log(listaAnuncios);

        let id = e.target.parentNode.dataset.id;
        rellenarFormulario(id,listaAnuncios);

        

 

    }
    else if(e.target.matches("#btnEliminar")){
        let id = parseInt(document.forms[0].id.value);

        
       

        
        if(confirm("Confirma la eliminacion?")){
          
            let index = anuncios.findIndex((el) => el.id == id);
            
                anuncios.splice(index,1);
                
                //FETCH
                //await deleteMascotaFetch(id);

                //listaAnuncios = await obtenerMascotasFetch();

                //AJAX 
               await deleteMascotaAjax(id);

               listaAnuncios = await obtenerAnunciosAjaxPromise();

               

                renderizarLista(crearTabla(listaAnuncios),document.getElementById("divLista"));

                checks = document.querySelectorAll( '.cbox' );
               

                checks.forEach( element  =>  { 
                    filtrarColumnas( element, listaAnuncios ) 
                });

            
            
       
            limpiarFormulario(document.forms[0]);
            
        }
        else{
            limpiarFormulario(document.forms[0]);
        }


    } 
    else if(e.target.matches("#btnModificar")){
        let id = parseInt(document.forms[0].id.value);
        const frm = document.forms[0];

        const anuncioEditado = new Anuncio_Animal(
            id,            
            frm.titulo.value,
            frm.tipoTransaccion.value,
            frm.descripcion.value,
            parseInt(frm.precio.value),
            frm.tipo.value,
            frm.raza.value,
            frm.fecha.value,
            frm.vacunado.value);
            if(confirm("Confirma la modificacion?")){
                
                
                modificarAnuncio(anuncioEditado);
               

                limpiarFormulario(document.forms[0]);
            }
                
            else{
                limpiarFormulario(document.forms[0]);
            }


    }
    else if(e.target.matches("#btnCancelar")){
        limpiarFormulario(document.forms[0]);
    }
    else if(e.target.matches("#filtroPerro")){
        
        let promedioInput = document.getElementById("promedio");

        let maximoInput = document.getElementById("maximo");

        let minimoInput = document.getElementById("minimo");

        let porcentajeInput = document.getElementById("porcentaje");



        let promedio = filtrar("perro",listaAnuncios);

        let maximo = precioMaximo("perro",listaAnuncios);

        let minimo = precioMinimo("perro",listaAnuncios);

        let porcentaje = porcentajeVacunados("perro",listaAnuncios);


        

        promedioInput.value = promedio;

        maximoInput.value = maximo;

        minimoInput.value = minimo;

        porcentajeInput.value = porcentaje+"%";

      }
    else if(e.target.matches("#filtroGato")){
        

        let promedioInput = document.getElementById("promedio");

        let maximoInput = document.getElementById("maximo");

        let minimoInput = document.getElementById("minimo");

        let porcentajeInput = document.getElementById("porcentaje");



        let promedio = filtrar("gato",listaAnuncios);

        let maximo = precioMaximo("gato",listaAnuncios);

        let minimo = precioMinimo("gato",listaAnuncios);

        let porcentaje = porcentajeVacunados("gato",listaAnuncios);


       

        promedioInput.value = promedio;

        maximoInput.value = maximo;

        minimoInput.value = minimo;

        porcentajeInput.value = porcentaje+"%";
      }
    else if(e.target.matches("#filtroTodos")){
        

        let promedioInput = document.getElementById("promedio");

        let maximoInput = document.getElementById("maximo");

        let minimoInput = document.getElementById("minimo");

        let porcentajeInput = document.getElementById("porcentaje");



        let promedio = filtrar("todos",listaAnuncios);

        let maximo = precioMaximo("todos",listaAnuncios);

        let minimo = precioMinimo("todos",listaAnuncios);

        let porcentaje = porcentajeVacunados("todos",listaAnuncios);


     

        promedioInput.value = promedio;

        maximoInput.value = maximo;

        minimoInput.value = minimo;

        porcentajeInput.value = porcentaje+"%";
      }

}



export function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./images/Hourglass.gif");
    spinner.setAttribute("alt","spinner");
    const spinnerContainer =document.getElementById("spinnerContainer");

    spinnerContainer.appendChild(spinner);

    //document.getElementById("divLista").setAttribute("class","display-none");

    document.getElementById("divLista").classList.add("oculto");



    
}

export function quitarSpinner(){
    document.getElementById("spinnerContainer").innerHTML="";

    document.getElementById("divLista").classList.replace("oculto","visible");
}

function filtrarColumnas( check,listaAnuncios ) {
    
    
    check.addEventListener( 'click', async() => { 
        let listaMapeada = listaAnuncios.map( row => { 
            
            let fila = {};
            let checks = [];
            
            
            for (const key in row) {
                               
                 if ( document.getElementById('chk'+key).checked ) {                   
                    fila[key] = row[key];

                    
                    
                    let checkbox = document.getElementById('chk'+key);

                    let data = {id:checkbox.id,value:checkbox.checked};
                    localStorage.setItem('chk'+key,JSON.stringify(data));
                    
                }
                else{

                    let checkbox = document.getElementById('chk'+key);
                    let data = {id:checkbox.id,value:checkbox.checked};
                    localStorage.setItem('chk'+key,JSON.stringify(data));
                }
                
                   
                               
                   
            }
            

            

            
            return fila;
        });

        

        renderizarLista(crearTabla(listaMapeada),document.getElementById("divLista"));
        
        

    });
};



function filtrar(filtro,lista)
{

   
    let promedio = "N/A";
    if(filtro == "perro")
    {
        const precioPerro = lista.filter(anun=>anun.tipo == "perro");

        if(precioPerro.length !=0) {
            const precios = precioPerro.map(element => element.precio);
            const cantPrecios = precios.length;
            const total = precios.reduce((prev,actual)=>prev + actual,0);

    
            promedio = total / cantPrecios;
        }
        
    }
    else if(filtro == "gato")
    {
        const precioGato = lista.filter(anun=>anun.tipo == "gato");

        if(precioGato.length != 0){
            const precios = precioGato.map(element => element.precio);
            const cantPrecios = precios.length;
            const total = precios.reduce((prev,actual)=>prev + actual,0);
            promedio = total / cantPrecios;
        }
        
    }
    else if(filtro == "todos"){
        const precios = lista.map(element => element.precio);
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);
        promedio = total / cantPrecios;
    }

    return promedio;
}

function precioMaximo(filtro,lista){
    let mayor = "N/A";
    if(filtro == "perro")
    {
        const precioPerro = lista.filter(anun=>anun.tipo == "perro");

        if(precioPerro.length != 0){

            const precios = precioPerro.map(element => element.precio);
        
            mayor = precios.reduce((prev,actual)=>{
                return prev > actual ? prev : actual;
            });
        }

        

        
    }
    else if(filtro == "gato")
    {
        const precioGato = lista.filter(anun=>anun.tipo == "gato");

        if(precioGato.length != 0){
            const precios = precioGato.map(element => element.precio);
        
            mayor = precios.reduce((prev,actual)=>{
                return prev > actual ? prev : actual;
            });
        }
        

        
        
    }
    else if(filtro == "todos"){

        
        const precios = lista.map(element => element.precio);
        
        const total = precios.reduce((prev,actual)=>{
            mayor = precios.reduce((prev,actual)=>{
                return prev > actual ? prev : actual;
            });
        });
        
    }

    return mayor;
}

function precioMinimo(filtro,lista){
    let mayor = "N/A";
    if(filtro == "perro")
    {
        const precioPerro = lista.filter(anun=>anun.tipo == "perro");

        

        if(precioPerro.length != 0){
            const precios = precioPerro.map(element => element.precio);
            mayor = precios.reduce((prev,actual)=>{
                return prev < actual ? prev : actual;
            });
        }
        
       

        
    }
    else if(filtro == "gato")
    {
        const precioGato = lista.filter(anun=>anun.tipo == "gato");

        
        
        if(precioGato.length != 0){
            const precios = precioGato.map(element => element.precio);
            mayor = precios.reduce((prev,actual)=>{
                return prev < actual ? prev : actual;
            });
        }
       
        
    }
    else if(filtro == "todos"){
        const precios = lista.map(element => element.precio);
        
        const total = precios.reduce((prev,actual)=>{
            mayor = precios.reduce((prev,actual)=>{
                return prev < actual ? prev : actual;
            });
        });
        
    }

    return mayor;
}

function porcentajeVacunados(filtro,lista){
    let porcentaje = "N/A";
    if(filtro == "perro")
    {
        const cantPerros = lista.filter(anun=>anun.tipo == "perro");

        if(cantPerros != 0){
            const cantPerrosVacunados = cantPerros.filter(p =>p.vacunado == "vacunado");

            porcentaje = (cantPerrosVacunados.length*100)/cantPerros.length;
        }

    }
    else if(filtro == "gato")
    {
        

        const cantGatos = lista.filter(anun=>anun.tipo == "gato");

        if(cantGatos.length != 0){
            const cantGatosVacunados = cantPerros.filter(p =>p.vacunado == "vacunado");

            porcentaje = (cantGatosVacunados.length*100)/cantGatos.length;
        }

        
        
    }
    else if(filtro == "todos"){
        
        
        const mascotasVacunadas = lista.filter(anun=>anun.vacunado == "vacunado");

        porcentaje = (mascotasVacunadas.length*100)/lista.length;


        
        
    }

    return porcentaje;
}

