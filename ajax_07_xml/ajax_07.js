 
function CreaXHR()
{
  var ref = false;

  try { // Procedimiento para crear un objeto
   // XMLHttpRequest compatible entre distintos
   ref = new ActiveXObject('Msxml2.XMLHTTP');
   alert ('Msxml2.XMLHTTP');
  } catch (e1) { // navegadores Web
   try {
     ref = 
        new ActiveXObject('Microsoft.XMLHTTP');
	 alert ('Microsoft.XMLHTTP');
     }  catch (e2) {
     objXML = false;
   }
  }

  if (!ref && (typeof XMLHttpRequest != 'undefined' || window.XMLHttpRequest)) 
   {
   ref = new XMLHttpRequest();
   alert ('XMLHttpRequest');
   }
   
  return ref;
}

// Esta funciï¿½n obtiene los datos del libro cuyo ISBN se facilita y los muestra
function muestraTitulo(isbn) 
 {
 // componemos el nombre del archivo XML
 var idLibro = 'ajax_07' + isbn + '.xml';
 var objXML = CreaXHR();
 
 // Eliminamos datos de un libro anterior
 var el = document.getElementById('datos');
 el.innerHTML = '';
 
 if(objXML)
 {
    // solicitamos el archivo con los datos
    objXML.open('GET', idLibro + '?peticion=' + Math.random(), false);
    objXML.send(null);
    if(objXML.status == 200) {
// obtenemos el objeto que representa al documento
//en este caso ya no es responseText como en los ejemplos anteriores sino que utilizamos responseXML 
      var libroXML = objXML.responseXML;
      // y recuperamos una referencia a los nodos hijos del  nodo <libro> 
//los buscamos por etiqueta con getElementsByTagName
//y obtenemos una referencia a los nodos hijo de 'libro'
      var datos = libroXML.getElementsByTagName('libro')[0].childNodes; 
      // Vamos a generar una tabla
      var strDatos = '<table border="1">';
      // recorriendo los nodos hijo
      for(var i = 0; i < datos.length; i++) 
        // Si tenemos un nodo ELEMENT_NODE
//nodeType = 1 son de tipo Element, esto es de tipo etiqueta <Element>
//nodeName es el propio nombre de la etiqueta
//y por ultimo visualizamos en otra celda el nodeValue
        if(datos[i].nodeType == 1) 
          // insertamos en la tabla su nombre
          strDatos += '<tr><td>' + datos[i].nodeName + 
            	'</td><td>' + datos[i].childNodes[0].nodeValue + 
            	'</td></tr>';
      
      // cerramos la tabla
      strDatos += '</table>';
      el.innerHTML = strDatos;
    } else 
      alert('Fallo al intentar obtener los ' + 'datos del libro ' + isbn);
 }
}

// Obtiene la lista de tï¿½tulos de un tema dado 
//tema = 1, 2, 3 Ã³ 4
function muestraTema(tema) {
  // componemos el nombre del archivo XML
  var idTema = 'Ajax_07_tema0' + tema + '.xml';
  var objXML = CreaXHR();
  if(objXML) {
    // solicitamos el archivo XML actualizado
//utilizamos el Math.random() para obligar a refrescar la pÃ¡gina haciendo una peticiÃ³n nueva siempre
    objXML.open('GET', idTema + '?peticion=' +  Math.random(), false);
    objXML.send(null);
    if(objXML.status == 200) {
      // obtenemos el documento XML
//la respuesta HTTP objXML.responseXML la introducimos en titulosXML
      var titulosXML = objXML.responseXML;
      // y recuperamos la lista de tÃ­tulos
//nos quedamos solo con las etiquetas 'titulo'
      var titulos = 
      titulosXML.getElementsByTagName('titulo');
      
      // Vamos a generar una lista
      var strTitulos = '<ul>';
      // con los elementos XML obtenidos
      for(var i = 0; i < titulos.length; i++) {
        // y aï¿½adiendo un <li> por cada uno
//childNodes = Lista de todos los nodos hijo del nodo actual 
//nodeValue = El valor del nodo (no estÃ¡ definido para algunos tipos de nodo) 
//TambiÃ©n podemos aÃ±adir, insertar, reemplazar y eliminar elementos nodo con los mÃ©todos correspondientes
//pasamos el atributo 'isbn' (1111111, 22222222, 33333333, ...)
        strTitulos += 
           '<li onclick="muestraTitulo(\'' + 
           titulos[i].getAttribute('isbn') + 
           '\');">' + 
           titulos[i].childNodes[0].nodeValue + 
           '</li>';
      }
      
      // cerramos la lista
      strTitulos += '</ul>';
      // y la mostramos en la secciï¿½n adecuada
//creamos el objeto el con elementos cuyo id es 'titulos'
      var el = 
        document.getElementById('titulos');
      el.innerHTML = strTitulos;
    } else 
      alert(
      'Fallo al intentar obtener los tï¿½tulos de '
       + tema);
  }
}

 // Obtener la lista de temas disponibles 
 function inicializa() 
 {
   var objXML = CreaXHR();
   if(objXML) 
   { // si tenemos un XMLHttpRequest
      // solicitamos el archivo temas.xml
      objXML.open('GET', 'Ajax_07_temas.xml', false);
      objXML.send(null);
      if(objXML.status == 200) 
	{
        var temaXML = objXML.responseXML;
        var temas = temaXML.getElementsByTagName('tema');
           
        // Vamos a generar una lista XHTML
        var strTemas = '<ul>';
        // recorriendo los elementos existentes
        for(var i = 0; i < temas.length; i++) 
		{
//lo que le estamos diciendo es que cuando hagamos click llame a la funciÃ³n muestraTema y le pasamos como parÃ¡metro
//que serÃ­a 1 para el primero, 2 para el segundo, etc que es el valor del id
//y como texto mostramos el nodeValue del childNodes[0] que es el nodoHijo
//nodos son las etiquetas que tenemos
//nodos hijos serÃ­an subetiquetas contenidas por la etiqueta padre
//en nuestro caso el nodo hijo serÃ¡ el texto contenido por las mismas etiquetas: <tema>texto o nodo hijo de tema</tema>

//temas[i] es el array de todos los elementos que tienen la etiqueta <tema>
//toda etiqueta final se transforma en dos, la primera de tipo Element que serÃ­a <tema> en nuestro caso
//y la segunda de tipo Text el texto propio de cada etiqueta <tema>
          strTemas += '<li onclick="muestraTema(' + 
            	temas[i].getAttribute('id') + ');">'
            	+ temas[i].childNodes[0].nodeValue + '</li>';
        }

        strTemas += '</ul>'; 
        // y la mostramos en la interfaz
        var el = document.getElementById('temas');
        el.innerHTML = strTemas;
      } 
      else 
        alert('Fallo al intentar obtener los temas');
   }
 }
 
 


 window.onload = inicializa;

