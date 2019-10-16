class class_ajax
{
    jsonToSend
    constructor()
    {
        this.jsonToSend = { "Descripcion": "Papeleo 3", 
                "considerandos": "Revisar actas pasadas",
                "acuerdos":[{"descripcion":"Aprobar ley 101","idVotacion":1},
                {"descripcion":"Eliminar ley 27","idVotacion":2}]}

    }

    imprimir(msg) 
    {
        console.log(msg);    
    }
}

var ins_ajax= new class_ajax();

window.ajax=ins_ajax;


