class class_ajax
{
    constructor()
    {
    }

    guardar_acta_bd(json){
        var resp = null;
        var req=new XMLHttpRequest;
        req.onreadystatechange= function ()
        {
            console.log(req.status,req.readyState);
            if (req.status==200 && req.readyState==4)
            {
                resp = req.responseText;
                //console.log("Response2",req.responseText);
                
            }
            else{
                resp = "error"
            }
        }
        console.log(json);
        req.open("POST"," http://127.0.0.1:5000/insertarActa",false);
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(json));
        return resp;
    }
    visual(id){
        var info=null;
        var req=new XMLHttpRequest;
        req.onreadystatechange= function ()
        {
            console.log(req.status,req.readyState);
            if (req.status==200 && req.readyState==4)
            {
                info= req.responseText;
            }
        }
        req.open("GET"," http://127.0.0.1:5000/obtenerActa/"+id,false);
        req.send();
        return info;
    }
}

var ins_ajax= new class_ajax();

window.ajax=ins_ajax;


