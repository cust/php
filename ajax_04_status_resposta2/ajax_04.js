// Referencia al objeto XMLHttpRequest
var objXML = false;


function CreaXHR()
{
  var ref = false;

  try { // Procedimiento para crear un objeto
   // XMLHttpRequest compatible entre distintos
   ref = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e1) { // navegadores Web
   try {
     ref = 
        new ActiveXObject('Microsoft.XMLHTTP');
     }  catch (e2) {
     objXML = false;
   }
  }

  if (!ref && (typeof XMLHttpRequest != 'undefined' || window.XMLHttpRequest)) 
   ref = new XMLHttpRequest();  
   
  return ref;
}

// Funciï¿½n ejecutada al cambiar la selecciï¿½n en la lista de tï¿½tulos de libros
function RecuperaDescripcion()
{
  objXML = CreaXHR();
   
  
    
  if(objXML) // Si tenemos el objeto
  {
    // Enviamos la solicitud al servidor
    objXML.open('GET',"index.html", true);
    objXML.onreadystatechange=ProcesaRespuesta;
    objXML.send(null);
  }
}

// Funciï¿½n que se ejecuta al recibir la respuesta del servidor
function ProcesaRespuesta()
{
  // mostramos el estado en una ventana
  alert("Estados: \n\t 0 - OPERACION NO REALIZADA \n\t 1 - OPEN   \n\t"
	+" 2 - ENVIADO  \n\t 3 - RECIBIDO \n\t 4 - TRANSACION COMPLETADA \n Estado actual : "
	+objXML.readyState);
  
  if(objXML.readyState == 4)

   if(objXML.status == 200)
    {

	    //document.getElementById("cabeceras").innerHTML = '<pre>' +  objXML.getAllResponseHeaders() + '</pre>';

	    cabeceras=objXML.getAllResponseHeaders();
//Para dirigirse a las cabeceras hay que hacer referencia a ellas tal y como nos devuelve los datos
//Hay varias cabeceras y para dirigirse a cada una hay que hacerlo con la cadena de texto que nos envia 
//Vamos justo todo lo que hay antes de los dos puntos de cada cabecera recibida del servidor HTTP
	    if ( objXML.getResponseHeader('Content-Type') == 'text/html')
			cabeceras+= '<h3> Documento de tipo text/html</h3>';
	    document.getElementById("cabeceras").innerHTML = '<pre>' +  cabeceras + '</pre>';

    }
}





