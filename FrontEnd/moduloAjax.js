class class_ajax
{
    constructor()
    {
    }

    guardar_acta_bd(json){
        var req=new XMLHttpRequest;
        req.onreadystatechange= function ()
        {
            console.log(req.status,req.readyState);
            if (req.status==200 && req.readyState==4)
            {
                console.log("Response2",req.responseText);
                
            }
        }
        console.log(json);
        req.open("POST"," http://127.0.0.1:5000/insertarActa",true);
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(json));
        
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


