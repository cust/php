<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Hola Mundo con AJAX</title>
 
<script type="text/javascript">
function descargaArchivo() {
  // Obtener la instancia del objeto XMLHttpRequest
  if(window.XMLHttpRequest) {
  // lo primero es comprobar si el objeto existe en el DOM del navegador utilizado
    peticion_http = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
  // si no existe el objeto XMLHttpRequest utilizamos el primer objeto de IE que se creo con esta funcionalidad
    peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
  }
 
  // Preparar la funcion de respuesta:
  // No ponemos los parÃ©ntesis puesto que no queremos llamar a la funciÃ³n sino asociarla a la propiedad del objeto
  // Como es habitual, la referencia a la funciÃ³n se indica mediante su nombre sin parÃ©ntesis, ya que de otro modo
  // se estarÃ­a ejecutando la funciÃ³n y almacenando el valor devuelto en la propiedad onreadystatechange.
  // esto en C serÃ­a un puntero a una funciÃ³n
  peticion_http.onreadystatechange = muestraContenido;
 
  // Realizar peticion HTTP
  // Esta peticiÃ³n HTTP ha de ser la misma que la llamada en la barra del navegador
  // o sea, si llamamos por localhost deberÃ­amos sustituir localhost por esta IP,
  // pero si llamamos por 192.168.1.213 aquÃ­ deberÃ­amos sustituir esta IP por localhost.
  // el problema estÃ¡ en que se resuelve localhost por 127.0.0.1 y no por la propia IP del ordenador
  // sintaxis mÃ©todo open (metodo GET Ã³ POST, URI, boolean sobre Â¿comunicaciÃ³n asÃ­ncrona?)
  peticion_http.open('GET', 'olamundo.txt', true);
  // podemos sustituir el fichero de texto por otro html:
		// peticion_http.open('GET', 'http://192.168.1.213/index.html', true);
  // send permite un parÃ¡metro sobre solicitudes del mÃ©todo POST, al ser GET debe ser null
  // esta sitaxis es obligatoria, primero un open y a continuaciÃ³n el send
  // send es el que ejecuta la peticiÃ³n cuyos parÃ¡metros se han declarado con open
  // en PHP estas dos funciones se juntan en la que serÃ­a header
  peticion_http.send(null);
 
  function muestraContenido() {
    if(peticion_http.readyState == 4) {
  // los valores de readyState son de 0 a 4 (peticiÃ³n realizada y devoluciÃ³n de datos completada)
  // la funciÃ³n muestraContenido se ejecuta en todos los estados anteriores hasta llegar al 4
      if(peticion_http.status == 200) {
  // status es la devoluciÃ³n del servidor http (200 significa que la respuesta es satisfactoria, 402 no)
  // si se cumplen ambas condiciones efectua el alert
         alert(peticion_http.responseText);
  //podemos cambiar el alert y visualizar el contenido de esta otra forma:
		  // window.document.write(peticion_http.responseText);
  // la propiedad responseText es la respuesta del servidor en forma de texto
  // puede ser un fichero de texto como en nuestro ejemplo o una pÃ¡gina HTML en otros casos 
      }
    }
  }
}
  // llamamos al mÃ©todo onload del objeto window que es lo que sucede al cargar la pÃ¡gina
  // le asignamos una funciÃ³n directamente por nombre al igual que hemos hecho arriba con muestraContenido
  // es una sintaxis especial que al igual que arriba serÃ­a lo mismo que puntero a funciÃ³n en C
  // primero se ejecuta el cÃ³digo HML y luego el de JavaScript, en este caso lo que tengamos asociado a onload
  // digamos que asociamos a estos mÃ©todos que gestionan eventos una funciÃ³n. Los eventos harÃ¡n de disparadores
  // los punteros de funciones en C son el nombre de la funciÃ³n sin parÃ©ntesis 
  // digamos que los mÃ©todos onload y onreadystatechange son mÃ©todos especiales que gestionan eventos y a ellos
  // puedo asociar funciones que se dispararÃ¡n con los eventos. Si pongo los parÃ©ntesis ejecuto la funciÃ³n, sino
  // la ejecuciÃ³n estÃ¡ gestionanda por los propios eventos de estos mÃ©todos
  // esto es mÃ¡s conflictivo en el mÃ©todo onreadystatechange, puesto que con onload funcionan los parÃ©ntesis tambiÃ©n  
window.onload = descargaArchivo;
</script>
 
</head>
<body>
Fonte: http://eduardo.homelinux.net/ajax/Ajax000.html
</body>
</html>
