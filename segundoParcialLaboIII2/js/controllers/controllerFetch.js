import crearTabla from "../tablas.js";
import {renderizarLista} from "../tablas.js";

import Anuncio_Animal from "../anuncios.js";

import { agregarSpinner,quitarSpinner } from "../scripts.js";

//export let mascotasFetch =[];

export function obtenerMascotasFetch(){
    agregarSpinner();
    return fetch("http://localhost:3000/mascotas")
    .then((res)=>{
        return res.ok? res.json(): Promise.reject(res);           
    })
    .then((data)=>{
        const mascotasFetch = [];
            console.log(data);
            data.forEach(element => {                
                mascotasFetch.push(element);


            });
            //console.log(mascotasFetch);
            return mascotasFetch;
        })
    .catch(err=>{
            
            console.error(`Error: ${err.status}:${err.statusText}`);
        })
    .finally(()=>{
        //document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        quitarSpinner();
    })
};

export function postMascotaFetch(mascota){
    
    //agregarSpinner();

    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json;charset=utf-8"
        },
        body:JSON.stringify(mascota)
    };


    fetch("http://localhost:3000/mascotas",options)   
    .then((res)=>{

            return res.ok? res.json(): Promise.reject(res);           
        })
        .then((data)=>{
                //renderizarLista(crearTabla(data),document.getElementById("divLista"));
                //console.log("Hola");

                return true;
            })
        .catch(err=>{
                
                console.error(`Error: ${err.status}:${err.statusText}`);

                console.log(err);

                //console.log("Hola");
                
            })
        .finally(()=>{
            //document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
            //quitarSpinner();
        })
    };

    export async function postMascotaFetchAsync(mascota){
    
        //agregarSpinner();
    
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json;charset=utf-8"
                },
                body:JSON.stringify(mascota)
            };
        
            try {
                const res = await fetch("http://localhost:3000/mascotas",options);
                if(!res.ok){
                    throw {error: res.status,statusText:res.statusText}

                }

                return await res.json();

                
            } catch (error) {
                console.error(error);
            }
        
        
        
    }

    export function deleteMascotaFetch (id){

        agregarSpinner();
       //console.log(id);
        const options = {
            method:"DELETE"                  
        };


        fetch("http://localhost:3000/mascotas/"+ id ,{method:"DELETE"})
        .then((res)=>{
            return res.ok? res.json(): Promise.reject(res);           
        })
        .then((data)=>{
                console.log(data);
                //obtenerMascotasFetch();
                return true;
                
            })
        .catch(err=>{
                
                console.error(`Error: ${err.status}:${err.statusText}`);
            })
        .finally(()=>{
            //document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
            quitarSpinner();
        })
    };

    export function updateMascotasFetch (id,mascotaModificada){

        //agregarSpinner();
        

        const options = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            },
            body:JSON.stringify(mascotaModificada)
        };


        fetch("http://localhost:3000/mascotas/"+id,options)
        .then((res)=>{
            return res.ok? res.json(): Promise.reject(res);           
        })
        .then((data)=>{
                //console.log(data);
                return true;
            })
        .catch(err=>{
                
                console.error(`Error: ${err.status}:${err.statusText}`);
            })
        .finally(()=>{
            //document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
            //quitarSpinner();
        })
    };

