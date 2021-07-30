import crearTabla from "../tablas.js";
import {renderizarLista} from "../tablas.js";

import Anuncio_Animal from "../anuncios.js";

import { agregarSpinner,quitarSpinner } from "../scripts.js";


export function obtenerMascotasAxios(){
    agregarSpinner();
    return axios.get("http://localhost:3000/mascotas")
    .then((datos)=>{
        
        let data;
        console.log(datos);

            for (const key in datos) {
                if (Object.hasOwnProperty.call(datos, "data")) {
                    data = datos["data"];
                    
                }
            }
            //console.clear();

            //console.log(data);

            /*if(data.length >0){
                
                renderizarLista(crearTabla(data),document.getElementById("divLista"));
            }*/

            return data;
          
    })
    .catch(err=>{
        console.log(err);
    })
    .finally(()=>{
        quitarSpinner();
    })


}


    export function postMacotasAxios(nuevaMascota){
   
        //agregarSpinner();
        const options = {
            method: "POST",
            data: nuevaMascota
        };

        axios("http://localhost:3000/mascotas",options)
        .then((res)=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            //quitarSpinner();
        });
    }

    export async function postMacotasAxiosAsync(nuevaMascota){
   
        //agregarSpinner();
        const options = {
            method: "POST",
            data: nuevaMascota
        };

        try {
            const res = await axios("http://localhost:3000/mascotas",options);
          
                if(!res.ok){
                    throw {error: res.status,statusText:res.statusText}

                }

                return await res.json();


        } catch (error) {
            console.error(error);
        }
        
       
    }


    export function deleteMascotasAxios (id){

        //agregarSpinner();

        axios.delete("http://localhost:3000/mascotas/"+id)
        .then((res)=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            //quitarSpinner();
        })


    }

    export function updateMascotasAxios(id,mascotaModificada){

        //agregarSpinner();

        
        axios.put("http://localhost:3000/mascotas/"+id,mascotaModificada)
        .then((res)=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            //quitarSpinner();
        })
    }
