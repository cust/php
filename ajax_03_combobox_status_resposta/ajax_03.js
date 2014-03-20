// Referencia al objeto global XMLHttpRequest
var objXML = false;

function CreaXHR() {
	var ref = false;

	try { // Procedimiento para crear un objeto
		// XMLHttpRequest compatible entre distintos
		ref = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e1) { // navegadores Web
		try {
			ref = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (e2) {
			objXML = false;
		}
	}

	if (!ref && (typeof XMLHttpRequest != 'undefined' || window.XMLHttpRequest))
		ref = new XMLHttpRequest();

	return ref;
}

// Funciï¿½n ejecutada al cambiar la selecciï¿½n en la lista de tï¿½tulos de
// libros
function RecuperaDescripcion() {
	objXML = CreaXHR();

	// Creamos el URL para solicitar la descripciï¿½n que corresponda
	var URL = 'Des' + document.getElementById('disco').value + '.html';

	if (objXML) // Si tenemos el objeto
	{
		// Enviamos la solicitud al servidor
		objXML.open('GET', URL, true);
		objXML.onreadystatechange = ProcesaRespuesta;
		objXML.send(null);
	}
}

// Funciï¿½n que se ejecuta al recibir la respuesta del servidor
function ProcesaRespuesta() {
	// mostramos los diferentes estados del objeto en ventanas que al llegar al
	// estado 4 se traduce en una visualizaciÃ³n de los datos recibidos
	alert("El valor del estado actual de la solicitud HTTP (objeto XMLHttpRequest) es "
			+ objXML.readyState);

	if (objXML.readyState == 4)
		// solo si codigo HTTP = 200
		if (objXML.status == 200) {
			// mostramos las cabeceras con su propio preformato
			document.getElementById("cabeceras").innerHTML = '<pre>'
					+ objXML.getAllResponseHeaders() + '</pre>';

			// obtenemos la descripcion y
			var texto = objXML.responseText;
			// la introducimos en la pagina
			document.getElementById("descripcion").innerHTML = texto;
		} else if (objXML.status == 401)
			alert("Usuario no  autorizado");
		else {
			alert("La respuesta del servidor es " + objXML.status);
			document.getElementById("descripcion").innerHTML = '';
			document.getElementById("cabeceras").innerHTML = '';
			alert("Selecciona un disco para ver su contenido");
		}

}
