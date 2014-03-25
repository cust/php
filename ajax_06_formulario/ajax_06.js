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

 function enviaFormulario()
 {
  var frmDatos = document.getElementById('formulario');
  var Indice;
  var strContenido = "";
  var strSeparador = "";
  
  // Recorremos los tres controles que hay
  for(Indice = 0; Indice < 3; Indice++) 
  {
//aquÃ­ preparamos el valor antes de enviarlo con encodeURIComponent
    strContenido =  strContenido + strSeparador + 
      	frmDatos.elements[Indice].id + '=' + 
      	encodeURIComponent( frmDatos.elements[Indice].value);
    strSeparador = '&';
  }  

  var elemento = document.getElementById('resultado');
    
    
  var objXML = CreaXHR();
  if(objXML) // Si tenemos el objeto
  {
    // Enviamos la solicitud al servidor
//vamos a utilizar esta vez el mÃ©todo POST y abrimos el fichero PHP Ajax005
    objXML.open('POST', 'form.html', false);
    // con las cabeceras apropiadas
//con setRequestHeader preparamos las cabeceras adecuadamente
//para enviar parÃ¡metros mediante el mÃ©todo POST, 
//es obligatorio incluir la cabecera Content-Type mediante la siguiente instrucciÃ³n:
    objXML.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//tambiÃ©n le decimos en la cabecera la longitud de lo que vamos a enviar
    objXML.setRequestHeader('Content-Length', strContenido.length);
//enviamos la peticiÃ³n con valor a travÃ©s del mÃ©todo POST no como en los ejemplos anteriores que era null
    objXML.send(strContenido);
//Mostramos el resultado que se enviarÃ¡
//responseText es la respuesta que nos devuelve PHP
    elemento.innerHTML = '<p>' +  strContenido + '</p><hr /><p>' +
      		'Respuesta del servidor: <b>' + 
      		objXML.responseText + '</b></p>';
  }
    
  return false;
 }