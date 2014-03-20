/*
 * ----------------------------------
 * Para simplificar algumas atribuições
 *
 * url: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
 */
(function() {
	// First, checks if it isn't implemented yet.
	if (!String.prototype.format) {
		String.prototype.format = function() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined' ? args[number]
						: match;
			});
		};
	}
})();

/*
 * ---------------------------------- Alterna estado da barra de navegação
 * 
 */
function barraAlterna() {
	// Verifica estado da barra
	// if ($("#navBarra").hasClass("hidden"))
	// $("#navBarra").removeClass("hidden");
	// else
	// $("#navBarra").addClass("hidden");

	// estas 4 linhas podem ser substrituídas por
	$("#navBarra").toggleClass("hidden");
}

/*
 * ---------------------------------- Carrega lista de sessões
 * 
 */
function campoSessaoCarrega() {
	// Obtém elementos
	var lCampoSessao = $("#ddSessao");

$.ajax({
		// Metodo da solicitação
		method : 'get',
		// URL a ser requisitada
		url : 'ListarDias.php',
		// Tipo de resposta
		dataType : 'json',
		// Retorno positivo
		success : function(pResposta) {

			// Declara variáveis locais
			var llOpcao;

			// Verifica resposta
			if (!(pResposta instanceof Array)) {// Resposta inválida?
				console.log("pResposta não é Array()");
				// Retorna
				return;
			}

			// Percorre itens
			for (var llI = 0; llI < pResposta.length; llI++) {
				// Verifica item
				if (pResposta[llI].codigo === undefined
						|| pResposta.codigo === null
						|| pResposta[llI].descricao === undefined
						|| pResposta.descricao === null) // Item inválido?
				// Itera laço
					continue;

				// Cria opção
				llOpcao = document.createElement("option");
				llOpcao.value = pResposta[llI].codigo;
				llOpcao.text = "({0}) {1}".format(pResposta[llI].codigo,
						pResposta[llI].descricao);

				// Inclui opção na dropdown list
				lCampoSessao.append(llOpcao);
			}
		},
		// Retorno negativo
		error : function(pResposta) {
			console.log(pResposta);
		}
	});
}

/*
 * ---------------------------------- Atualiza contagem
 * 
 */
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
	if (lValorTipo < 1 || lValorSessao < 1) { // Algum item inválido
												// selecionado?
	// Atualiza mostrador
		lDivContagemParcial.innerHTML = "-";
	} else {
		// Solicita contagem parcial
		lJqxhr = $.get("ContagemDia.php?acao=" + lValorTipo.toString()
				+ "&sessao=" + lValorSessao.toString(), function(pResposta) {
			// Variáveis locais
			var llContagem = 0;

			// Verifica resposta
			if (pResposta !== null) { // Resposta válida?
				if (pResposta.contagem !== undefined
						&& pResposta.contagem !== null) { // Campo presente?
				// Atualiza variável de contagem
					llContagem = Number(pResposta.contagem);
				}
			}

			// Atualiza mostrador
			lDivContagemParcial.innerHTML = llContagem.toString();
		});

		// Evento de falha
		lJqxhr.fail(function() {
			// Atualiza mostrador
			lDivContagemParcial.innerHTML = "###";
		});
	}

	// Solicita contagem total
	lJqxhr = $.get("ContagemTotal.php",
			function(pResposta) {
				// Variáveis locais
				var llContagem = 0;

				// Verifica resposta
				if (pResposta !== null) { // Resposta válida?
					if (pResposta.contagem !== undefined
							&& pResposta.contagem !== null) { // Campo
																// presente?
					// Atualiza variável de contagem
						llContagem = Number(pResposta.contagem);
					}
				}

				// Atualiza mostrador
				lDivContagemTotal.innerHTML = llContagem.toString();
			});

	// Evento de falha
	lJqxhr.fail(function() {
		// Atualiza mostrador
		lDivContagemTotal.innerHTML = "###";
	});
}

/*
 * ---------------------------------- rotina de inicialização
 * 
 */
(function() {
	// Carrega sessões
	campoSessaoCarrega();

	// Atualiza mostrador de contagem
	contagemAtualiza();

	// Cria temporizador
	window.setInterval(function() {
		contagemAtualiza();
	}, 3000);
})();