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
        $('body').keydown(function(e){
            if(e.keyCode == 32){
                if(rotacaoDeQueda <= -90)
                {
                    rotacaoDeQueda = -90;
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


    function IniciaJogo()
    {
        var posicaoPassaro = 0;
        var fps = 1;
        var pesoPassaro = 1; // Aumenta 1 == facil || 2 == normal || 3 == dificil
        var pesoPassaroBatidaDeAsa = 2
        var clicou = false;
        var milesimosDeJogo = 0;
        var milesimosDeJogoDpsDoClick = 0;
        var gameOverTop = -15;
        var gameOverDown = 490;
        var gameover = false;
        var r = Math.ceil(Math.random()*2);
        var rgo = Math.ceil(Math.random()*4);
        var audioBateAsas = new Audio('audios/voa'+r+'.wav');
        var audioGameOver = new Audio('audios/gameover'+rgo+'.wav');

        setInterval(function(e){
            if (gameover != true)
            {
                // Bloco de jogo
                milesimosDeJogo = milesimosDeJogo + 1;

                $('body').keydown(function(e){
                    if(e.keyCode == 32){
                        clicou = true
                        audioBateAsas.play();
                    }
                });

                if(posicaoPassaro > gameOverDown || posicaoPassaro < gameOverTop) // Bordas de GAMEOVER
                {
                    gameover = true;
                }

                if(clicou)
                {
                    //Calculo do intervalo de tempo para 1 segundo de voo do passaro
                    milesimosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick + 1;
                    var segundosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick / 1000;

                    if(segundosDeJogoDpsDoClick <= 0.06)
                    {
                        posicaoPassaro = posicaoPassaro - pesoPassaroBatidaDeAsa; // Quando bate as asas ele fica mais PESADO
                        $('#passaro').css("margin-top", posicaoPassaro);
                    }
                    else
                    {
                        clicou = false;
                        milesimosDeJogoDpsDoClick = 0;
                    }

                }
                else
                {
                    posicaoPassaro = posicaoPassaro + pesoPassaro;
                    $('#passaro').css("margin-top", posicaoPassaro);    
                    clicou = false;

                }


            }
            else
            {
                // Bloco de Game Over
                audioGameOver.play();
                alert(" --- Game Over --- ");
            }



            // Movimentação do background
            $('#tela').css('background','images/bird/bg.png');


        }, fps);
    
    }
    

    function ApresentaJogo()
    {
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

            if(posicaoPassaro > gameOverDown - 20) // Bordas de GAMEOVER
            {
                clicou = true
            }
            if(posicaoPassaro < gameOverTop-20) // Bordas de GAMEOVER
            {
                clicou = false
            }

            if(clicou)
            {
                //Calculo do intervalo de tempo para 1 segundo de voo do passaro
                milesimosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick + 1;
                var segundosDeJogoDpsDoClick = milesimosDeJogoDpsDoClick / 1000;

                if(segundosDeJogoDpsDoClick <= 0.06)
                {
                    posicaoPassaro = posicaoPassaro - pesoPassaroBatidaDeAsa; // Quando bate as asas ele fica mais PESADO
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


            // Movimentação do background
            $('#tela').css('background','images/bird/bg.png');




        }, fps);

    }





    // ApresentaJogo();

    // $('#btnLinkoStarto').click(function(){
        IniciaJogo();
    // });


        
});