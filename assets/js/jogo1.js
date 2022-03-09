function start() { 
 //sintaxe do jquery
	$("#inicio").hide();	//hide - oculta a div inicio

	//criando divs para quando inicio for ocultado
	//usar aspas simples no id e no class
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	//append - sobrepoe imagens
	//funcao foi chamada com onclick no html, poderia tb chamar por aqui com o addEventListener("click" , start())


	//principais variaveis do jogo
	var jogo = {}
	var velocidade=5;
	var posicaoY = parseInt(Math.random() * 334);	//a posiçao no eixo y estara entre 0 e 334px
	var podeAtirar=true;
	var fimdejogo=false;

	//Game Loop

	jogo.timer = setInterval(loop,30);	//chama a funçao loopig a cada 30milissegundos
	
	function loop() {
	
	movefundo();
	movejogador()
	moveinimigo1();
	moveinimigo2();
	moveamigo();
	colisao();

	}

	function movefundo() {
		//parseInt - converte string num inteiro
		esquerda = parseInt($("#fundoGame").css	("background-position"));//.css pq background-position é uma funçao do css
		$("#fundoGame").css("background-position",esquerda-1);	//anda 1px a cada 30milissegundos

//ERRO - ver porque quando coloca mais rapido(ex:5miliss), tem hora que volta para 30(como um bug)
		}

//CRIANDO TECLAS
var TECLA = {
	W: 87,	//valor numerico correspondente a cada tecla
	S: 83,	//no arquivo pdf keycode na pasta jogosHtml5/codigos
	D: 68	//tem todas as teclas e seus respectivos valores num.
	}

	jogo.pressionou = [];

//Verifica se o usuario pressionou alguma tecla	
	$(document).keydown(function(e){
	jogo.pressionou[e.which] = true;
	});	//keydown - se pressionou algo no teclado


	$(document).keyup(function(e){
       jogo.pressionou[e.which] = false;
	});	//se nao precionou

	movejogador();
//para o caso de ter apertado alguma tecla
	function movejogador() {
	
	if (jogo.pressionou[TECLA.W]) {
		var topo = parseInt($("#jogador").css("top"));	//top - move para cima ou para baixo usando o top da margin como referencia
		$("#jogador").css("top",topo-10);	//-1 ele vai se aproximar do topo
	
		if (topo<=0) {
		
			$("#jogador").css("top",topo+10);
		}
	}
	
	if (jogo.pressionou[TECLA.S]) {
		
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);	
	}
	
		if (jogo.pressionou[TECLA.D]) {
		//chama a funçao disparo
		disparo();
		
		}

		else if (topo>=434) {
		
			$("#jogador").css("top",topo-10);
		}
	}
	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX-velocidade);
		$("#inimigo1").css("top",posicaoY); //usa top como referencia quer dizer q ele vai variar usando o topo do background como referencia
			
			if (posicaoX<=0) { //ate onde vai para voltar a posição de saida 694
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
			}
	}
	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",775);
					
		}
	}
	function moveamigo() {
	
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+1); //cria a posiçaoX para poder fazer a conta, pois posicaoX se torna um numero inteiro, diferente do "left", que é so uma referencia do css
					
			if (posicaoX>906) {
				
			$("#amigo").css("left",0);
						
			}
	
	}
	function disparo() {
	
		if (podeAtirar==true) {
			
		podeAtirar=false;	//para nao poder disparar novamente, a nao ser que sejam ateniadas novas condicoes(tiro chegar ao fim da tela)
	
		topo = parseInt($("#jogador").css("top"))
		posicaoX= parseInt($("#jogador").css("left"))
		tiroX = posicaoX + 190;	//para o tiro sair tendo o jogador1(apache) como referencia
		topoTiro=topo+37;
		$("#fundoGame").append("<div id='disparo'></div");	//criando a div no html
		$("#disparo").css("top",topoTiro);
		$("#disparo").css("left",tiroX);
		
		var tempoDisparo=window.setInterval(executaDisparo, 30);
		
		}//Fecha podeAtirar
 
		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left",posicaoX+15); 
	
					if (posicaoX>900) {	//limpar disparo da tela quando for essa fosiçao
							
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#disparo").remove();
				podeAtirar=true;	//pode atirar novamente, o tiro chegou ao fim da tela
						
					   }
		} // Fecha executaDisparo()
	}
	function colisao() {

		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		// (collision)jogador com o inimigo1 usando o jqueryCollision
	
		//console.log(colisao1);	mostra que quando ocorre colisao a variavel colisao1 recebe diversas informações. usando a primissa de que quando colide ela esta preenchida, podemos fazer uma condição de que ocorreu a colisao
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		if (colisao1.length>0) {	//caso tenha tamanho na colisao1
		
			inimigo1X = parseInt($("#inimigo1").css("left"));//captura posicao do inimigo 1 para gerar uma nova div "explosao1"
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X,inimigo1Y);
		
			posicaoY = parseInt(Math.random() * 334);	//como ocorreu a colisao esta reposicionando o inimigo 1
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
		}
		// jogador com o inimigo2 
		if (colisao2.length>0) {
	
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao1(inimigo2X,inimigo2Y);
					
			$("#inimigo2").remove();
				
			reposicionaInimigo2();
				
		}	
		// Disparo com o inimigo1
		
		if (colisao3.length>0) {
		
		
		inimigo1X = parseInt($("#inimigo1").css("left"));
		inimigo1Y = parseInt($("#inimigo1").css("top"));
			
		explosao1(inimigo1X,inimigo1Y);
		$("#disparo").css("left",950);
			
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",694);
		$("#inimigo1").css("top",posicaoY);
			
		}
	
		// Disparo com o inimigo2
			
		if (colisao4.length>0) {
			
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		$("#inimigo2").remove();
	
		explosao1(inimigo2X,inimigo2Y);
		$("#disparo").css("left",950);
		
		reposicionaInimigo2();
			
		}
		// jogador com o amigo
		
		if (colisao5.length>0) {
		
		reposicionaAmigo();
		$("#amigo").remove();
		}
		//Inimigo2 com o amigo
		
		if (colisao6.length>0) {
	    
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX,amigoY);
			$("#amigo").remove();
			
			reposicionaAmigo();
			
		}

	}
	function explosao1(inimigo1X,inimigo1Y) {
		$("#fundoGame").append("<div id='explosao1'></div");//criando div
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");	//imagem tem que ser criada no js, pois ela so vai existir devido a uma condicao
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");//animate(funçao do jQuery), opacity(começa com 100 e vai ate 0 que faz sumir),width de 15px(css) ate 200(tamanho da explosao) e some.
	
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
		
			function removeExplosao() {	//remover a div, para desaparecer quando ocorrer
				
				div.remove();
				window.clearInterval(tempoExplosao);
				tempoExplosao=null;
				
			}
			
	}
	//Reposiciona Inimigo2
	//Explos�o3
	
	function explosao3(amigoX,amigoY) {
		$("#explosao3").css("top",amigoY);
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		$("#explosao3").css("left",amigoX);
		$("#explosao3").remove();
		function resetaExplosao3() {
			tempoExplosao3=null;
			window.clearInterval(tempoExplosao3);
			
		}
	
	}	
	
	function reposicionaInimigo2() {
	
		var tempoColisao4=window.setInterval(reposiciona4, 5000);
			//so sera reposicionado em 5segundos
			
			function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
				
				if (fimdejogo==false) {	//recria inimigo 2 se nao tiver acabado o jogo ainda
				
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
	}	
	//Reposiciona Amigo
	
	function reposicionaAmigo() {
	
		var tempoAmigo=window.setInterval(reposiciona6, 6000);
		
			function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo=null;
			
			if (fimdejogo==false) {
			
			$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
			
			}
			
		}
		
	}
}
