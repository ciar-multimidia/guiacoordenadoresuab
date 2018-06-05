jQuery(document).ready(function($) {
  // sistema de fixar ao rolar
  var menuGlobal = $(".navegacao");
  var posicionaMenu = $(".posiciona-navegacao");
  var itemParaFixar = $(".item-para-fixar");
  var posicionaFixo = $(".posiciona-fixo");
  var containerInsta = $(".afcinstawgt");
  var blocoproduto = $('#bloco-produtos, #bloco-mapa');

  var posFixacao = {
    margemSeguranca : 25,
    topoMenuGlobal : 0,
    alturaMenuGlobal: 0,
    topoItemFixo : 0,
    alturaItemFixo: 0,
    scrollSumirRodape: 0,
    scrollSumirBloco: 0,
    scrollApareceBloco: 0,

  }

  var rolagemPodeAtualizar = true;

  var atualizarPosFixacao = function(veioDaRolagem){
    if (veioDaRolagem === undefined) {
      veioDaRolagem = false;
    }
    posFixacao.topoMenuGlobal = posicionaMenu.offset().top;
    posFixacao.alturaMenuGlobal = menuGlobal.height();
    if (itemParaFixar.length > 0) {
      posFixacao.topoItemFixo = 
        posicionaFixo.offset().top
        - posFixacao.margemSeguranca
        - posFixacao.alturaMenuGlobal;
      posFixacao.alturaItemFixo = itemParaFixar.height();
    }
    posFixacao.scrollSumirRodape = 
      containerInsta.offset().top 
      - posFixacao.alturaItemFixo 
      - posFixacao.alturaMenuGlobal
      - posFixacao.margemSeguranca*2;

    if (blocoproduto.length > 0) {
      posFixacao.scrollSumirBloco = 
        blocoproduto.offset().top
        - posFixacao.alturaMenuGlobal 
        - posFixacao.margemSeguranca*2
        - posFixacao.alturaItemFixo;

      posFixacao.scrollApareceBloco = 
        blocoproduto.offset().top
        + blocoproduto.height()
        - posFixacao.alturaMenuGlobal;  
    }

    if (veioDaRolagem) {
      setTimeout(function() {
        rolagemPodeAtualizar = true;
      }, 1000);
    }

    console.log('posicoes atualizadas');
  };  

  atualizarPosFixacao();

  var janela = $(window);
  var scrollAtual = janela.scrollTop();
  var timeOutAtualizarPos;



  janela.on('scroll', function(event) {

    if (rolagemPodeAtualizar) {
      atualizarPosFixacao(true);
      rolagemPodeAtualizar = false;
    }

    var thisScroll = $(this).scrollTop();
    if (thisScroll >= posFixacao.topoMenuGlobal) {
      menuGlobal.addClass('fixar visivel');
      posicionaMenu.css('height', posFixacao.alturaMenuGlobal+'px');

      if (itemParaFixar.length > 0) {
        if (thisScroll >= posFixacao.topoItemFixo && thisScroll <= posFixacao.scrollSumirRodape) {
          itemParaFixar.addClass('fixar').css('top', (posFixacao.alturaMenuGlobal+posFixacao.margemSeguranca)+'px');
        } else {
          itemParaFixar.removeClass('fixar').css('top', '');
        } 
      }

      if (blocoproduto.length > 0) {
        if (thisScroll >= posFixacao.scrollSumirBloco && thisScroll <= posFixacao.scrollApareceBloco) {
          itemParaFixar.addClass('esconder');
        } else {
          itemParaFixar.removeClass('esconder');
        }
      }

    } else {
      menuGlobal.removeClass('fixar visivel');
      posicionaMenu.css('height', '');
    }

    scrollAtual = thisScroll;
  });

  $(document).on('load', atualizarPosFixacao);


  ////////////////////////////////// eventos da janela
  $(window).resize(function(event){
    atualizarPosFixacao();
  });

});