<!DOCTYPE html>
<html>
	<head>
		<title>Contagem de público</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Bootstrap -->
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen" />

		<!-- Estilo -->
		<style>
			#divConteudo {
				margin-top: 180px;
			}
			
			#divConteudo > div {
				padding: 15px;
				background: #428BCA;
				color: white;
				border-width: 0px;
				border-radius: 10px;
				height: 142px;
			}
			
			#divConteudo > div + div {
				margin-top: 10px;
			}
			
			#divConteudo > div > div.rotulo {
				display: inline;
				font-size: 40px;
				font-weight: bolder;
			}
			
			#divConteudo > div > div.contador {
				display: inline;
				float: right;
				background: white;
				color: black;
				border-width: 0px;
				border-radius: 80px;
				padding: 4px 20px;
				font-size: 72px;
				font-weight: bolder;
				font-family: monospace;
			}
			
			#patrocinio {
				margin-top: 30px;
				margin-left: auto;
				margin-right: auto;
			}
		</style>
	</head>
	<body>
		<!-- Menu principal -->
		<nav class="navbar navbar-default navbar-static-top" role="navigation" id="navBarra">
			<!-- Cabeçalho -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navBarraCorpo">
					<span class="sr-only">Alternar barra de navegação</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Contagem</a>
			</div>

			<!-- Corpo -->
			<div class="collapse navbar-collapse" id="navBarraCorpo">
				<form id="frmContagem" class="navbar-form navbar-left">
					<div class="form-group">
						<select class="form-control" name="ddTipo" id="ddTipo">
							<option value="-1">[Tipo]</option>
							<option value="1">Controle de acesso</option>
							<option value="2">Contagem de público</option>
						</select>
					</div>
					
					<div class="form-group">
						<select class="form-control" name="ddSessao" id="ddSessao">
							<option value="-1">[Sessão]</option>
						</select>
					</div>
					
					<div class="form-group">
						<button class="btn btn-default" id="btnAtualizar" type="button" onclick="contagemAtualiza();">Atualizar</button>
					</div>
				</form>
			</div>
		</nav>
		
		<!-- Corpo da página -->
		<div class="row" onclick="barraAlterna();">
			<div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1">
				
				<div id="divConteudo">
					<div>
						<div class="rotulo">Público do dia</div>
						<div class="contador" id="divContagemParcial"></div>
					</div>

					<div>
						<div class="rotulo">Público total do evento</div>
						<div class="contador" id="divContagemTotal"></div>
					</div>
				</div>
				<img class="img-responsive" id="patrocinio" src="imagem.png" />
			</div>
		</div>

		<!-- jQuery -->
		<script src="jquery/jquery-1.10.2.min.js"></script>
		<!-- Plugins compilados do Bootstrap -->
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<!-- Funções próprias -->
		<script src="scripts_eder.js"></script>

	</body>
</html>

