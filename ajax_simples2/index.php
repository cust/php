<html>
<head>
<title>Ejemplo de manejo de Ajax</title>

<script type="text/JavaScript">
var conexion;

function crearXMLHttpRequest() {
  var xmlHttp=null;
  if (window.ActiveXObject) 
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  else 
    if (window.XMLHttpRequest) 
      xmlHttp = new XMLHttpRequest();
  return xmlHttp;
}

function consultar(valor) {
    conexion=crearXMLHttpRequest();
    conexion.onreadystatechange = procesarEventos;
    conexion.open('GET', 'meses.php?num=' + valor, true);
    conexion.send(null);
}

function procesarEventos() {
  var detalles = document.getElementById("resultado");
  if(conexion.readyState == 4) {
    detalles.innerHTML = conexion.responseText;
  } else {
    detalles.innerHTML = 'Cargando...';
  }
}
</script>
</head>
<body>
    <input type="text" id="valor" name="valor"> 
    <input type="button" value="Consultar" onclick="javascript: consultar(valor.value);">
<div id="resultado"></div>
</body>
</html>
