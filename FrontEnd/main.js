lista_acuerdos = [];
var jsonToSend = {};
var ls = false;
var mod_ls = false;
var ind_ls = 0;

/**
 * @function agregar_acuerdo funcion agregar los acuerdos en la lista de jsons de los mismos
 * @param {}
 */
function agregar_acuerdo()
{
    if(document.getElementById("idVotacion") != null && document.getElementById("ckeditor2") != null){
        var id_votacion = document.getElementById("idVotacion").value;
        var txt_acuerdo = CKEDITOR.instances.ckeditor2.getData();
        var txt_acuerdo_plain = txt_acuerdo.replace(/<\/?[^>]+(>|$)/g, "");
        var json = {
            "descripcion": txt_acuerdo_plain,
            "idVotacion": id_votacion
        }

        if(!ls || mod_ls){
            lista_acuerdos.push(json);
            var tab_lista_acuerdos = document.getElementById("table_acuerdos_body");
            var tr_acuerdo = document.createElement("tr");
            var td_acuerdo = document.createElement("td");
            var txt_td_acuerdo = document.createTextNode(txt_acuerdo_plain);
            td_acuerdo.appendChild(txt_td_acuerdo);
            tr_acuerdo.appendChild(td_acuerdo);
            tab_lista_acuerdos.appendChild(tr_acuerdo);
        }
        else{
                console.log("estoy aquí", document.getElementById(ind_ls.toString(10)).innerText);
                document.getElementById(ind_ls.toString(10)).innerText = txt_acuerdo_plain;
                lista_acuerdos.splice(ind_ls,1,json);
            }
        
        limpiar_textos_acuerdo()
        mod_ls = false;
    }
}
/**
 * @function limpiar_textos_acuerdo funcion limpiar el editor y el campo del id de la votación después de agregar
 * @param {}
 */

function limpiar_textos_acuerdo(){
    document.getElementById("idVotacion").value = "";
    CKEDITOR.instances.ckeditor2.setData("");
}
/**
 *@function agregar_acta funcion crear el json del acta a enviar a la base de datos
 *@param {}
 */

function agregar_acta(){
    get_acta_info();
    //guardar_acta_bd(jsonToSend);
    var resp_ins = ajax.guardar_acta_bd(jsonToSend);
    if(resp_ins == "ok"){
        var alert_bueno = document.createElement("div");
        alert_bueno.setAttribute("class","alert alert-dismissible alert-success");
        alert_bueno.setAttribute("id","id_alert");
        var txt = document.createTextNode("Se insertó el acta con éxito");
        var btn_close = document.createElement("button");
        btn_close.setAttribute("class","close");
        btn_close.setAttribute("data-dismiss","alert");
        var txt_bt = document.createTextNode("X");
        btn_close.appendChild(txt_bt);
        alert_bueno.appendChild(btn_close);
        alert_bueno.appendChild(txt);
        document.getElementById("container_principal").appendChild(alert_bueno);
        //document.body.appendChild(alert_bueno);
    }else{
        var alert_bueno = document.createElement("div");
        alert_bueno.setAttribute("class","alert alert-dismissible alert-danger");
        alert_bueno.setAttribute("id","id_alert");
        var txt = document.createTextNode("No fue posible insertar el acta");
        var btn_close = document.createElement("button");
        btn_close.setAttribute("class","close");
        btn_close.setAttribute("data-dismiss","alert");
        var txt_bt = document.createTextNode("X");
        btn_close.appendChild(txt_bt);
        alert_bueno.appendChild(btn_close);
        alert_bueno.appendChild(txt);
        document.getElementById("container_principal").appendChild(alert_bueno);
    }
    //ajax.guardar_acta_bd(jsonToSend);
    limpiar_todo();
}
/**
 * @function limpiar_todo función para llamar todos los métodos de limpieza de los campos de texto
 * @param {}  
 */
function limpiar_todo(){
    limpiar_tabla_acuerdos();
    ls = false;
    limpiar_textos_acta();
    lista_acuerdos = [];
    jsonToSend = {};
}
/**
 * @function limpiar_tabla_acuerdos función para limpiar la tabla de acuerdos al enviarlo o guardarlo
 * @param {}  
 */
function limpiar_tabla_acuerdos(){
    var table = document.getElementById('lista_acuerdos');
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
}
/**
 * @function get_acta_info función para obtener de los campos de texto la información general del acta
 * @param {}  
 */
function get_acta_info(){
    var desc_actas = document.getElementById("desc_actas").value;
    var txt_considerandos = CKEDITOR.instances.ckeditor1.getData();
    var txt_considerandos_plain = txt_considerandos.replace(/<\/?[^>]+(>|$)/g, "");
    jsonToSend = {
        "Descripcion":desc_actas,
        "Considerandos":txt_considerandos_plain,
        "Acuerdos":lista_acuerdos
    }
}
/**
 * @function limpiar_textos_acuerdo funcion limpiar el editor y el campo del id de la votación después de agregar
 * @param {}
 */
function limpiar_textos_acta(){
    document.getElementById("desc_actas").value = "";
    CKEDITOR.instances.ckeditor1.setData("");
}
/**
 * @function guardar_acta_ls funcion para almacenar el acta en el local storage
 * @param {}  
 */
function guardar_acta_ls(){
    window.localStorage
    get_acta_info();
    localStorage.setItem('acta',JSON.stringify(jsonToSend));
    limpiar_todo();
}
/**
 * @function btn_editar_acuerdo Funcion para mostrar en el modal el acuerdo seleccionado
 * @param {id}  es el id de cada acuerdo que sería igual a su posición en la lista
 */
function btn_editar_acuerdo(id){
    console.log("Acuerdos",lista_acuerdos)
    document.getElementById("idVotacion").value = lista_acuerdos[id]["idVotacion"];
    CKEDITOR.instances.ckeditor2.setData(lista_acuerdos[id]["descripcion"])
    document.getElementById("enviar_acuerdo").childNodes[0].nodeValue = "Modificar acuerdo";
    ind_ls = id;
    console.log("id",id);
    mod_ls = false;
}
/**
 * @function leer_acta_ls Funcion para cambiar el nombre dentro del modal según sea que se va a insertar o modificar
 * @param {}
 */
function change_name(){
    mod_ls = true;
    document.getElementById("enviar_acuerdo").childNodes[0].nodeValue = "Agregar acuerdo";
}
/**
 * @function leer_acta_ls funcion para leer el acta almacenada en el local storage
 * @param {}
 */
function leer_acta_ls(){
    var json_leido = JSON.parse(localStorage.getItem('acta'));
    if(json_leido != null){
        document.getElementById("desc_actas").value = json_leido["Descripcion"];
        CKEDITOR.instances.ckeditor1.setData(json_leido["Considerandos"]);
        lista_acuerdos = json_leido["Acuerdos"];
        for(var acuerdo in json_leido["Acuerdos"]){
            var tabla_acuerdos = document.getElementById("lista_acuerdos");
            var tr_desc = document.createElement("tr");
            tr_desc.setAttribute("class","d-flex");
            var td_desc  = document.createElement("td");
            td_desc.setAttribute("class","col-lg-11");
            td_desc.setAttribute("id",acuerdo.toString(10));
            var td_but  = document.createElement("td");
            td_but.setAttribute("class","col-lg-1");
            var btn_modificar = document.createElement("button");
            var id_btn =  acuerdo.toString(10);
            console.log(id_btn);
            btn_modificar.setAttribute("id", id_btn);
            btn_modificar.setAttribute("onClick","btn_editar_acuerdo(this.getAttribute('id'))");
            btn_modificar.setAttribute("data-toggle","modal");
            btn_modificar.setAttribute("data-target","#myModal");
            btn_modificar.setAttribute("class","img_edit");
            console.log("En la pos acuerdo",acuerdo)
            var desc_txt = document.createTextNode(json_leido["Acuerdos"][acuerdo].descripcion);
            td_desc.appendChild(desc_txt);
            td_but.appendChild(btn_modificar);
            tr_desc.appendChild(td_desc);
            tr_desc.appendChild(td_but);
            tabla_acuerdos.appendChild(tr_desc);
        }
        ls = true;
        mod_ls = true;
    }
    localStorage.clear();
    console.log(json_leido);
}

function limpiar(){
    document.getElementById("tableV").style.display='none';
    document.getElementById("allActas").style.display='none';
}
    
function visual(){
    var id= document.getElementById('idinput').value;
    if(id>0){
        var req = ajax.visual(id);
        var json = eval("("+req+")"); 
                for (var body in json) {
                    var info = json[body][0].info;
                    var acuerdos = ""
                    for(var i in info.acuerdos){
                        console.log(i);
                        if(i==0){
                            acuerdos = acuerdos+info.acuerdos[i].descripcion;
                        }else{
                            acuerdos = acuerdos+", "+info.acuerdos[i].descripcion;
                        }
                    }
                    document.getElementById('c1').innerHTML = json[body][0].id;
                    document.getElementById('c2').innerHTML = info.Descripcion;
                    document.getElementById('c3').innerHTML = acuerdos;
                    document.getElementById('c4').innerHTML = info.considerandos;
                }
                document.getElementById("tableV").style.display='block';
                document.getElementById("allActas").style.display='block';
                document.getElementById('tableV').className='cltable2';
    }
}   
