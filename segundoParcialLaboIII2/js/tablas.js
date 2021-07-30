

export default function crearTabla(items){
    const tabla = document.createElement("table");

    tabla.setAttribute("id","miTabla");
    //tabla.setAttribute("class","table");
    //tabla.setAttribute("class","table-striped");
    //tabla.setAttribute("class","table-hover");

    tabla.classList.add("table");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    tabla.classList.add("table-md");
    tabla.classList.add("bg-light");
    
    
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    //console.log("Cree una tabla");

    /*tabla.setAttribute("style", "border:1px solid black border-collapse:collapse");*/

    return tabla;

}

function crearThead(item){
    const thead = document.createElement("thead");

    thead.classList.add("table-dark")

    const tr = document.createElement("tr");

    for ( const key in item){
        if(key !== "id"){
            const th = document.createElement("th");
            const texto = document.createTextNode(key);
            th.appendChild(texto);

            tr.appendChild(th);
        }        
    }
    thead.appendChild(tr);

    return thead;
}

/*function crearTbody(items){
    const tbody = document.createElement("tbody");

   

    items.forEach(item => {
        
        const tr = document.createElement("tr");
        for(const key in item){
            if(key === "id"){
                tr.setAttribute("data-id",item[key]);
            }
            else{
                const td = document.createElement("td"); 
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                //td.textContent = item[key];
                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);
        
    });

    return tbody;

}*/

function crearTbody(items){
    const tbody = document.createElement("tbody");

    items.forEach(item => {

        const tr = document.createElement("tr");
        
        
        // tr.addEventListener("click",handlerClickTD);

        for (const key in item) {
            if(key === "id"){
                tr.setAttribute("data-id",item[key]);
                //console.log(tr);
            }
            else{
                const td = document.createElement("td");                 
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                //td.textContent = item[key];
                tr.appendChild(td);
            }
        }                                    
        tbody.appendChild(tr);
    });

    

    return tbody;


}

export function renderizarLista(lista, contenedor){
    
    
    while(contenedor.hasChildNodes()){//Mientras el contenedro tiene hijos, remuevo el primero
        contenedor.removeChild(contenedor.firstChild);
    }
    if(lista){
        contenedor.appendChild(lista);
    }
    
    
}

export function tablaToObjeto(tabla) {
    let trs = tabla.rows,
        trl = trs.length,
        i = 0,
        j = 0,
        keys = [],
        obj, ret = [];

    for (; i < trl; i++) {
        if (i == 0) {
            for (; j < trs[i].children.length; j++) {
                keys.push(trs[i].children[j].innerHTML);
                
            }
            keys.push("id");

            //console.log(keys);
        } else {
            obj = {};
            for (j = 0; j < trs[i].children.length; j++) {
              
                obj[keys[j]] = trs[i].children[j].innerHTML;
                //console.log("Objeto");
                //console.log( obj[keys[j]] = trs[i].children[j].innerHTML);
                
            }
            obj["id"] = parseInt(trs[i].dataset.id);
            obj["precio"] = parseInt(obj["precio"]);

            //console.log(trs[i]);
            //console.log("Listo");

            //console.log(obj);
            ret.push(obj);
        }
    }

    return ret;
}


