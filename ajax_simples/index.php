<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Ajax - PHP exemplo - Sistema Básico</title>
</head>
<body>

<script language="javascript" type="text/javascript">
// pegando o HTTP Object
function getHTTPObject(){ 
    if (window.ActiveXObject)
    {
        return new ActiveXObject("Microsoft.XMLHTTP"); // IE
    }
    else if (window.XMLHttpRequest)
    {
        return new XMLHttpRequest(); // Outros Navegadores
    }
    else{
        alert("Seu Navegador não suporta AJAX."); // Navegadores antigos
        return null;
    } 
}
 
// Mudando o valor do campo 'saida'
function setOutput(){ 
    if (httpObject.readyState == 4)
    {
        document.getElementById('saida').value = httpObject.responseText;
    } 
}
 
// Implementando a função que envia os dados digitados no primeiro campo para o PHP
function enviaKey(){ 
    httpObject = getHTTPObject(); 
    if (httpObject != null)
    {
        httpObject.open("GET", "upperCase.php?entrada="+document.getElementById('entrada').value, true);
        httpObject.send(null);
        httpObject.onreadystatechange = setOutput;
    } 
}
 
var httpObject = null;
 </script>
 
<form name="testForm">
		ENTRADA: <input type="text" onkeydown="enviaKey();" name="entrada" id="entrada" /> SAÍDA: <input type="text" name="saida" id="saida" />
</form>
<br>Fonte: http://www.sistemabasico.com.br/2012/02/17/ajax-e-php-tutorial-basico-e-simples-sobre-ajax-e-php/</br>
</body>
</html>