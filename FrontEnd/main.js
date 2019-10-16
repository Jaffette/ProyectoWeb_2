lista_acuerdos = [];
var jsonToSend = {};

/**
 * @function agregar_acuerdo funcion agregar los acuerdos en la lista de jsons de los mismos
 * @param {}
 */
function agregar_acuerdo()
{
    console.log("Hello")
    if(document.getElementById("idVotacion") != null && document.getElementById("ckeditor2") != null){
        var id_votacion = document.getElementById("idVotacion").value;
        var txt_acuerdo = CKEDITOR.instances.ckeditor2.getData();
        var txt_acuerdo_plain = txt_acuerdo.replace(/<\/?[^>]+(>|$)/g, "");
        var json = {
            "descripcion": txt_acuerdo_plain,
            "idVotacion": id_votacion
        }
        lista_acuerdos.push(json);
        limpiar_textos_acuerdo()
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
    var desc_actas = document.getElementById("desc_actas").value;
    var txt_considerandos = CKEDITOR.instances.ckeditor1.getData();
    var txt_considerandos_plain = txt_considerandos.replace(/<\/?[^>]+(>|$)/g, "");
    jsonToSend = {
        "Descripcion":desc_actas,
        "considerandos":txt_considerandos_plain,
        "acuerdos":lista_acuerdos
    }
    //guardar_acta_bd(jsonToSend);
    limpiar_textos_acta();
}

/**
 * @function limpiar_textos_acuerdo funcion limpiar el editor y el campo del id de la votación después de agregar
 * @param {}
 */

function limpiar_textos_acta(){
    document.getElementById("desc_actas").value = "";
    CKEDITOR.instances.ckeditor1.setData("");
}

function guardar_acta_bd(json){
    var req=new XMLHttpRequest;
    req.onreadystatechange= function ()
    {
        console.log(req.status,req.readyState);
        if (req.status==200 && req.readyState==4)
        {
            console.log("Response",req.responseText);
        }
    }
    console.log(json);
    req.open("POST"," http://127.0.0.1:5000/insertarActa",true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(json));
}

function guardar_acta_ls(){
    window.localStorage
    agregar_acta();
    console.log(jsonToSend);
    localStorage.setItem('acta',JSON.stringify(jsonToSend));
}

function leer_acta_ls(){
    var json_leido = JSON.parse(localStorage.getItem('acta'));
    console.log(json_leido["Descripcion"])
    document.getElementById("desc_actas").value = json_leido["Descripcion"];
    
    //localStorage.clear();
    console.log(json_leido);
}