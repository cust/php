<!DOCTYPE html>
<html>
	<head>
		<title>Contagem de público</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Bootstrap -->
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen" />

		<!-- jQuery -->
		<script src="jquery/jquery-1.10.2.min.js"></script>

		<!-- Plugins compilados do Bootstrap -->
		<script src="bootstrap/js/bootstrap.min.js"></script>

		<!-- Declarações de funções e variáveis -->
		<script>
			// Alterna estado da barra de navegação
			function barraAlterna() {
				// Verifica estado da barra
				if ($("#navBarra").hasClass("hidden")) $("#navBarra").removeClass("hidden");
				else $("#navBarra").addClass("hidden");
			}
			
			// Carrega lista de sessões
			function campoSessaoCarrega() {
				// Obtém elementos
				var lCampoSessao = document.getElementById("ddSessao");
				
				// Solicita dados
				var lJqxhr = $.get("ListarDias.php", function (pResposta) {
					// Declara variáveis locais
					var llOpcao;
					
					// Verifica resposta
					if (!(pResposta instanceof Array)) // Resposta inválida?
						// Retorna
						return;
					
					// Percorre itens
					for (var llI = 0; llI < pResposta.length; llI++) {
						// Verifica item
						if (
							pResposta[llI].codigo === undefined || pResposta.codigo === null ||
							pResposta[llI].descricao === undefined || pResposta.descricao === null
						) // Item inválido?
							// Itera laço
							continue;
						
						// Cria opção
						llOpcao = document.createElement("option");
						llOpcao.value = pResposta[llI].codigo;
						llOpcao.text = "(" + pResposta[llI].codigo + ") " + pResposta[llI].descricao;
						
						// Inclui opção na dropdown list
						lCampoSessao.add(llOpcao);
					}
				});
			}
			
			// Atualiza contagem
			function contagemAtualiza() {
				// Variáveis locais
				var lJqxhr;
				
				// Obtém elementos
				var lDivContagemParcial = document.getElementById("divContagemParcial");
				var lDivContagemTotal = document.getElementById("divContagemTotal");
				var lCampoTipo = document.getElementById("ddTipo");
				var lCampoSessao = document.getElementById("ddSessao");
				
				// Obtém valores
				var lValorTipo = Number(lCampoTipo.options[lCampoTipo.selectedIndex].value);
				var lValorSessao = Number(lCampoSessao.options[lCampoSessao.selectedIndex].value);
				
				// Verifica campos
				if (lValorTipo < 1 || lValorSessao < 1) { // Algum item inválido selecionado?
					// Atualiza mostrador
					lDivContagemParcial.innerHTML = "-";
				}
				else {
					// Solicita contagem parcial
					lJqxhr = $.get("ContagemDia.php?acao=" + lValorTipo.toString() + "&sessao=" + lValorSessao.toString(), function (pResposta) {
						// Variáveis locais
						var llContagem = 0;

						// Verifica resposta
						if (pResposta !== null) { // Resposta válida?
							if (pResposta.contagem !== undefined && pResposta.contagem !== null) { // Campo presente?
								// Atualiza variável de contagem
								llContagem = Number(pResposta.contagem);
							}
						}

						// Atualiza mostrador
						lDivContagemParcial.innerHTML = llContagem.toString();
					});

					// Evento de falha
					lJqxhr.fail(function () {
						// Atualiza mostrador
						lDivContagemParcial.innerHTML = "###";
					});
				}
				
				// Solicita contagem total
				lJqxhr = $.get("ContagemTotal.php", function (pResposta) {
					// Variáveis locais
					var llContagem = 0;
					
					// Verifica resposta
					if (pResposta !== null) { // Resposta válida?
						if (pResposta.contagem !== undefined && pResposta.contagem !== null) { // Campo presente?
							// Atualiza variável de contagem
							llContagem = Number(pResposta.contagem);
						}
					}
					
					// Atualiza mostrador
					lDivContagemTotal.innerHTML = llContagem.toString();
				});
				
				// Evento de falha
				lJqxhr.fail(function () {
					// Atualiza mostrador
					lDivContagemTotal.innerHTML = "###";
				});
			}
		</script>
		
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
		<!-- Script de inicialização -->
		<script>
			$(document).ready(function () {
				// Carrega sessões
				campoSessaoCarrega();
				
				// Atualiza mostrador de contagem
				contagemAtualiza();
				
				// Cria temporizador
				window.setInterval(function () { contagemAtualiza(); }, 3000);
			});
		</script>
		
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
	</body>
</html>