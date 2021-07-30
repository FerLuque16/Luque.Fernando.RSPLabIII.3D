import crearTabla from "../tablas.js";
import {renderizarLista} from "../tablas.js";

import Anuncio_Animal from "../anuncios.js";

import { agregarSpinner,quitarSpinner } from "../scripts.js";

//export let mascotas = [];

let data = [];
//let mascotas = [];
    
    export function obtenerAnunciosAjax(){

        agregarSpinner();
            const xhr = new XMLHttpRequest();
            // Asignar un handler para la peticion
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status <299){

                        data = JSON.parse(xhr.responseText);

                        const mascotas=[];

                        data.forEach(element => {
                            
                            mascotas.push(element);
                        });

                        renderizarLista(crearTabla(data),document.getElementById("divLista"));

                    }
                    else{
                        const statusText = xhr.statusText || "Ocurrio un error"
                        console.error(`Error: ${xhr.status} : ${statusText}`);

                        
                        
                    }

                    quitarSpinner();

                }
                
            };
               
                xhr.open("GET","http://localhost:3000/mascotas");


                xhr.send();


    }

    export function obtenerAnunciosAjaxPromise(){
        return new Promise((resolve,reject)=>{
            agregarSpinner();
            const xhr = new XMLHttpRequest();
            // Asignar un handler para la peticion
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status <299){

                        data = JSON.parse(xhr.responseText);

                        const mascotas=[];

                        data.forEach(element => {
                            /*const mascotaOrdenada = new Anuncio_Animal(
                                element.id,
                                element.titulo,
                                element.descripcion,
                                element.precio,
                                element.tipo,
                                element.raza,
                                element.fecha,
                                element.vacuna
                            );*/
                            //console.log(element);
                            mascotas.push(element);
                        });
                        
                        resolve(mascotas);
                        //console.log(data);
                        //renderizarLista(crearTabla(data),document.getElementById("divLista"));


                    
                
                    }
                    else{
                        const statusText = xhr.statusText || "Ocurrio un error"
                        reject (`Error: ${xhr.status} : ${statusText}`);

                        
                        
                    }
                    //document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
                    quitarSpinner();

                }
               
                
            };
                //Se puede hacer asi tambien
                /*xhr.addEventListener("readystatechange",()=>{

                })*/

                //Abrir la peticion
                //1er par metodo 2do url 3ro modo true=asincrono false=sincronp
                xhr.open("GET","http://localhost:3000/mascotas");

                //Enviar la peticion
                xhr.send();
        });
        


    }

    export function postMascotaAjax (nuevaMascota){
        
        return new Promise((resolve,reject)=>{
            agregarSpinner();

        

            //const {url,method,success,error,final} = options;
            //Instaciamos el objeto xmlhttprequest
            const xhr = new XMLHttpRequest();
            // Asignar un handler para la peticion
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status <299){

                        data = JSON.parse(xhr.responseText);

                        //console.log(data);
                        resolve(true);

                    }
                    else{
                        const statusText = xhr.statusText || "Ocurrio un error"
                        reject(`Error: ${xhr.status} : ${statusText}`);

                        
                        
                    }
                    quitarSpinner();

                }
                else{
                    
                    
                
                }
                
            };
            //Se puede hacer asi tambien
            /*xhr.addEventListener("readystatechange",()=>{

            })*/
            
            //Abrir la peticion
            //1er par metodo 2do url 3ro modo true=asincrono false=sincronp
            xhr.open("POST","http://localhost:3000/mascotas");

            
            //Seteo la cabecera de la peticion

            xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")

            //Enviar la peticion
            xhr.send(JSON.stringify(nuevaMascota));


        });
        
    }


    export function deleteMascotaAjax(id){
        return new Promise ((resolve, reject)=>{
            //let id= 4;
        //agregarSpinner();
        //const {url,method,success,error,final} = options;
        //Instaciamos el objeto xmlhttprequest
        const xhr = new XMLHttpRequest();
        // Asignar un handler para la peticion
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4){
                if(xhr.status >=200 && xhr.status <299){

                    data = JSON.parse(xhr.responseText);

                    console.log(data);

                    resolve(true);

                }
                else{
                    const statusText = xhr.statusText || "Ocurrio un error"
                    reject(`Error: ${xhr.status} : ${statusText}`);

                    
                    
                }
              
            }
            else{
               
            
            }
            
        };
        

        //Abrir la peticion
        //1er par metodo 2do url 3ro modo true=asincrono false=sincronp
        xhr.open("DELETE",`http://localhost:3000/mascotas/${id}`);
        
        //Seteo la cabecera de la peticion

        //xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")

        //Enviar la peticion
        xhr.send();


        })

        

    };

    export function updateMascotaAjax(mascotaModificada){
        return new Promise((resolve,reject)=>{
            let id= mascotaModificada.id;
            agregarSpinner();
            //const {url,method,success,error,final} = options;
            //Instaciamos el objeto xmlhttprequest
            const xhr = new XMLHttpRequest();
            // Asignar un handler para la peticion
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status <299){

                        data = JSON.parse(xhr.responseText);

                        console.log(data);

                        resolve(true);

                    }
                    else{
                        const statusText = xhr.statusText || "Ocurrio un error"
                        reject(`Error: ${xhr.status} : ${statusText}`);

                        
                        
                    }
                // document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
                quitarSpinner();
                }
                else{
                    
                    //document.querySelector(".spinner").appendChild(createSpinner());
                
                }
                
            };
            //Se puede hacer asi tambien
            /*xhr.addEventListener("readystatechange",()=>{

            })*/

            //Abrir la peticion
            //1er par metodo 2do url 3ro modo true=asincrono false=sincronp
            xhr.open("PUT",`http://localhost:3000/mascotas/${id}`);
            
            //Seteo la cabecera de la peticion

            xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")

            //Enviar la peticion
            xhr.send(JSON.stringify(mascotaModificada));
            })
        

    };
   

    
    
   
    
   

    