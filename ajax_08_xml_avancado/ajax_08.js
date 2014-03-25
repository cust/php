 
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
//   alert ('XMLHttpRequest');
   }
   
  return ref;
}

function muestraDatos(dato) {

//	  	alert (dato);


 		// var Libros = datosXML.getElementsByTagName('Libros');
		var Libros = datosXML.getElementsByTagName('libro');
		
// ojo a esto que va por impares 01,3 que seria el titulo, etc. hay que investigar mÃ¡s y terminarlo
		alert (Libros[0].childNodes[1].nodeName);
		alert (Libros[0].childNodes[3].nodeName);
		alert (Libros[0].childNodes[5].nodeName);
		alert (Libros[0].childNodes[1].childNodes[0].nodeValue);
//		libros[i].childNodes[1].childNodes[0].nodeValue


//										Funciona pero lo mejoramos
//creamos varias arrays de nodos
		var titulos = datosXML.getElementsByTagName('titulo');
		var isbns = datosXML.getElementsByTagName('isbn');
		var autores = datosXML.getElementsByTagName('autor');
		var fechas = datosXML.getElementsByTagName('fecha');
		var editoriales = datosXML.getElementsByTagName('editorial');			
		 
		var final = new Array();

		for ( j=0; j < titulos.length; j++)
			if (titulos[j].childNodes[0].nodeValue == dato)
			{
				final [0] = isbns[j].childNodes[0].nodeValue;
				final [1] = autores[j].childNodes[0].nodeValue;
				final [2] = fechas[j].childNodes[0].nodeValue;
				final [3] = editoriales[j].childNodes[0].nodeValue;							
			}
			
        var strTemas = '<table><tbody>';
        for( i=0 ; i < final.length; i++)					 
          	strTemas += '<tr><td>' + final[i] + '</td></tr>';		
        strTemas += '</tbody></table>'; 

/*
        var strTemas = '<table><tbody>';
        for( i=0 ; i < Libros.length; i++)	
		alert (Libros[i].childNodes[1].nodeName + ': ' + Libros[i].childNodes[1].childNodes[0].nodeValue);	
		  if (Libros[i].childNodes[1].childNodes[0].nodeValue == dato)							 
          		strTemas += '<tr><td>' + final[0] + '</td></tr>';		
        strTemas += '</tbody></table>'; 
*/

        var el = document.getElementById('datos');
        el.innerHTML = strTemas;
}

function muestraTitulos(tema) {

//		alert (tema);

	    var temas = datosXML.getElementsByTagName('genero');				
		var titulos = datosXML.getElementsByTagName('titulo');				
		 
		var libros = new Array();

		for ( j=0,i=0; j < temas.length; j++)
			if (temas[j].childNodes[0].nodeValue == tema)
			{
				libros [i] = titulos[j].childNodes[0].nodeValue;
				i++;
			}
			
		libros.sort();

        var strTemas = '<table><tbody>';
        for( i=0 ; i < libros.length; i++)
		{ 			 
          	strTemas += '<tr><td onclick="muestraDatos(\'' 
				+ libros[i] + '\');">' 
				+ libros[i] + '</td></tr>';
		}
        strTemas += '</tbody></table>'; 

        var el = document.getElementById('titulos');
        el.innerHTML = strTemas;
}



  // Obtener la lista de temas disponibles 
 function inicializa() 
 {
   var objXML = CreaXHR();
   if(objXML) 
   { // si tenemos un XMLHttpRequest
      // solicitamos el archivo temas.xml
      objXML.open('GET', 'ajax_08.xml', false);
      objXML.send(null);
      if(objXML.status == 200) 
	{
//esta variable debe ser global asÃ­ que la definimos fuera de esta funciÃ³n
        datosXML = objXML.responseXML;

        var temas = datosXML.getElementsByTagName('genero');				
		 
		var generos = new Array();
		//generos [0] = temas[0].childNodes[0].nodeValue;	
		for ( j=0; j < temas.length; j++)
			generos [j] = temas[j].childNodes[0].nodeValue;
		generos.sort();
	
        // Vamos a generar una lista XHTML
        var strTemas = '<table><tbody>';
        // recorriendo los elementos existentes		

        for( i=0 ; i < generos.length; i++) 
		{	
//aquÃ­ volvemos a jugar a la comillas. Esta vez anteponemos el carÃ¡cter de escape para poder solucionarlo
//a la funciÃ³n le debemos pasar un literal entrecomillado teniendo cuidado con no cerrar las dobles comillas
//con las que comenzamos el onclick lo cual nos presenta el problema que hemos solucionado con slash	
		  if (generos[i+1] != generos[i])
          	strTemas += '<tr><td onclick="muestraTitulos(\'' 
				+ generos[i] + '\');">' 
				+ generos[i] + '</td></tr>';			  
        }

        strTemas += '</tbody></table>'; 
//alert('<<<<<<<<<<<'+strTemas+'>>>>>>>>>>');
        // y la mostramos en la interfaz
        var el = document.getElementById('temas');
        el.innerHTML = strTemas;
      } 
      else 
        alert('Fallo al intentar obtener los generos');
   }
 }

 var datosXML = null;
 window.onload = inicializa;