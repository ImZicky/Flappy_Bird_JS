$(document).ready(function(){

    var imgPassaro = 1;
    var tempoBateAsas = 150;
    var rotacaoDeQueda = 1;
    setInterval(function(){

        // Batida de asas e rotacionamento
        if(imgPassaro == 1){
            $('#passaro').attr("src","images/bird/passaro-fecha-asas.png");
            imgPassaro = 0;
            rotacaoDeQueda = rotacaoDeQueda + 10;
        }
        else
        {
            $('#passaro').attr("src","images/bird/passaro-bate-asas.png");
            imgPassaro = 1;
            rotacaoDeQueda = rotacaoDeQueda + 10;
        }
        

        // Rotacionamento do passaro para o chão
        $('body').keyup(function(e){
            if(e.keyCode == 32){
                if(rotacaoDeQueda <= -90)
                {
                    rotacaoDeQueda = 0;
                }
                else
                {
                    rotacaoDeQueda = rotacaoDeQueda - 10;
                }
            }
        });
        $('#passaro').css('transform','rotate('+rotacaoDeQueda+'deg)');
    

        
       }, tempoBateAsas
    );


    function Inicia()
    {
        console.log("INICIOU A GRAVIDADE");

        var posicaoPassaro = 0;
        var fps = 1;
        var pesoPassaro = 1; // Aumenta 1 == facil || 2 == normal || 3 == dificil
        var pesoPassaroBatidaDeAsa = 2
        var clicou = false;
        var milesimosDeJogo = 0;
        var milesimosDeJogoDpsDoClick = 0;
        var gameOverTop = -15;
        var gameOverDown = 490;

        setInterval(function(e){
            milesimosDeJogo = milesimosDeJogo + 1;

            $('body').keyup(function(e){
                if(e.keyCode == 32){
                    clicou = true
                }
            });

            if(posicaoPassaro > gameOverDown || posicaoPassaro < gameOverTop) // Bordas de GAMEOVER
            {
                alert("perdeu");
            }

            if(clicou)
            {
                //Calculo do intervalo de tempo para 1 segundo de voo do passaro
                milesimosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick + 1;
                var segundosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick / 1000;

                console.log(milesimosDeJogoDpsDoClick);
                if(segundosDeJogoDpsDoClick <= 0.06)
                {
                    posicaoPassaro = posicaoPassaro - pesoPassaroBatidaDeAsa; // Quando bate as asas ele fica mais leve
                    $('#passaro').css("margin-top", posicaoPassaro);
                }
                else
                {
                    clicou = false;
                    milesimosDeJogoDpsDoClick = 0;
                }

            }else
            {
                posicaoPassaro = posicaoPassaro + pesoPassaro;
                $('#passaro').css("margin-top", posicaoPassaro);    
                clicou = false;

            }






        }, fps);

    }
    




    Inicia(true);


        
});