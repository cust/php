
//Todas las funciones siguientes sirven para preparar los datos del formulario y ser recibidos correctamente por HTTP
//El mÃ©todo open del objeto HMLHttpRequest debe recibir los datos correctamente para que los entienda
//Para ello debemos prepararle los datos previamente con estas funciones

//Todo esto se aplica siempre que utilicemos el mÃ©todo GET del formulario para pasar datos
//o sea, para pasar los datos por HTTP hay que prepararlos primero
//http://localhost/aplicacion?parametro1=valor1&parametro2=valor2&parametro3=valor3

//Para que la peticiÃ³n no sea igual si la repetimos y el navegador no tire de la cachÃ© de la pÃ¡gina:
//concatenamos al final del mÃ©todo GET: +"&nocache="+Math.random();
//Esto concatena una peticiÃ³n nueva con un nÃºmero aleatorio para que vuelva a refrescar la pÃ¡gina obligatoriamente


function codifica()
 {
  var strTexto = document.getElementById('texto').value;
//Aplicamos la funciÃ³n escape() a la variable strTexto el cual:
//Devuelve la cadena pasada por parÃ¡metro con las transformaciones nescesarias 
//para ser enviada en una transacciÃ³n HTTP. 
//La cadena es devuelta en formato Unicode, 
//todos los caracteres no ASCII son sustituidos por su notaciÃ³n %XX, donde XX es su equivalente hexadecimal. 
  var strEscape = escape(strTexto);
//encodeURI=Codifica un Identificador de Recurso Uniforme (Uniform Resource Identifier, URI) 
//reemplazando cada instancia de ciertos carÃ¡cteres por uno, dos o tres secuencias de escape 
//representando el carÃ¡cter codificado en UTF-8.
  var strEncode = encodeURI(strTexto);
//encodeURIComponent funciona igual que encodeURI pero solo con una porciÃ³n de la URI
  var strEncodeComponent = encodeURIComponent(strTexto);
  // las funciones inversas a estas son decodeURI y decodeURICompononent
  var elemento =  document.getElementById('resultado');
    
  elemento.innerHTML =
    '<p>Texto original: <b>' + strTexto + 
    '</b></p><p>Texto tratado con <code>' +
    'escape()</code>: <b>' + strEscape + 
    '</b></p><p>Texto tratado con <code>' +
    'encodeURI()</code>: <b>' + strEncode + 
    '</b></p><p>Texto tratado con <code>' +
    'encodeURIComponent()</code>: <b>' + 
    strEncodeComponent + '</b></p>';
    
  return false;
 }

/*
 Enviar una solicitud con un ï¿½nico valor con caracteres especiales
	objXML.open('GET',URL + '?variable' + encodeURIComponent(valor), true);
*/
 