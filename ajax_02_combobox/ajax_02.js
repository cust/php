// Referencia al objeto XMLHttpRequest. Creamos el objeto con el que vamos a trabajar
var objXML = false;

// Esta funciï¿½n crea una instancia del objeto de tipo XHTMLHttpRequest
// XMLHttpRequest y devuelve su referencia
function CreaXHR()
{
  var ref = false; // No tenemos objeto

// esta es otra forma de crear el objeto XMLHttpRequest diferente al ejercicio 0 que era con if, ahora con try/catch
// try/catch =  detectar y cazar errores. Por ej:
/*
try { //intento algo que puede producir un error
   	funcion_que_no_existe()
	}catch(mierror){
   					alert("Error detectado: " + mierror)
					} 
*/
  try { // Intentamos crearlo en IE 5 con MSXML 3.0 o posterior
// ref es la referencia que utilizamos para crearlo
   ref = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e1) { // si no funciona
   try { // lo intentamos como IE 5 con MSXML 2
     ref = 
        new ActiveXObject('Microsoft.XMLHTTP');
     }  catch (e2) { // si no funciona
     ref = false; // no tenemos objeto
   }
  }

  // si no tenemos objeto y existe el tipo
  // XMLHttpRequest como nativo
// si ref es falso y se cumple el resto de la condiciÃ³n:
  if (!ref && (typeof XMLHttpRequest !=  'undefined' || window.XMLHttpRequest)) 
  	   ref = new XMLHttpRequest();    // lo creamos directamente
  return ref; // devolvemos la referencia
}

// Funciï¿½n ejecutada al cambiar la selecciï¿½n
// en la lista de tï¿½tulos de libros
function RecuperaDescripcion()
{
  objXML = CreaXHR();
   
  // Creamos el URL para solicitar la descripciï¿½n que corresponda
//estos Des01.html, etc. son solo retazos de cÃ³digo html a incrustar en nuestra pÃ¡gina creada con Ajax
  var URL='Des' +  document.getElementById('disco').value + '.html';
    
  if(objXML) // Si tenemos el objeto
  {
    // Enviamos la solicitud al servidor
    objXML.open('GET', URL, true);
// Esta linea de onreadystatechange no es necesario que se encuentre aquÃ­
    objXML.onreadystatechange=ProcesaRespuesta;
    objXML.send(null);
  }
}

// Funciï¿½n que se ejecuta al recibir 
// la respuesta del servidor
function ProcesaRespuesta()
{
  if(objXML.readyState == 4) {
    // obtenemos la descripciï¿½n y 
    var texto = objXML.responseText;
    // la introducimos en la pï¿½gina
//utilizamos la propiedad innerHTML que es el contenido mismo del elemento al que nos estamos dirigiendo
    document.getElementById("descripcion").innerHTML = texto;
  }
}
