<!DOCTYPE html 
  PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" 
      xml:lang="es" lang="es">
 <head>
   <title>   Ajax002 - Objeto XMLHttp</title>
   <meta http-equiv="Content-type" content="text/html;charset=ISO-8859-1" />
   <script type="text/javascript"     src="ajax_03.js">   </script>
   <link rel="stylesheet" href="ajax_03.css" type="text/css" />
 </head>
 <body>

 <div   id="Principal">

   <img src="discos.jpg" width="100" height="170" name="logo1" border="0" id="ImagenI">
   <img src="discos.jpg" width="100" height="170" name="logo1" border="0" id="ImagenD">
   <form id="Formulario"   action="index.html" method="GET">
     <h1>Novedades</h1>
     <p>Seleccione  el t&iacute;tulo de un   disco.</p>
     <p>
     <select id="disco"  onchange="RecuperaDescripcion()" >
       <option value="00">
        SELEECIONA DISCO
       </option>
       <option value="01">
        Papito - Miguel Bos&eacute;
       </option>
       <option value="02">
        Not too late - Norah Jones
       </option>
       <option value="03">
        Follow the city lights - Dover
       </option>
     </select>
     </p>
   </form>
   <div  id="Datos" style="width:60%; ">
     <span id="descripcion"></span>
     <span id="cabeceras"></span>
   </div>

   </div>
 </body>
</html>
