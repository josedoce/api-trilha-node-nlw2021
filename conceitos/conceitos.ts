//UUID => universally unique identifier

// function enviarEmail(para,id, assunto, texto){
//     //biblioteca de envio de emails
//     console.log(para, id, assunto, texto);
// }

// class EnviarEmailParaUsuario{
//     send(){
//         enviarEmail("jose@gmail.com",9899,"Olá","tudo bem?");
//     }
// }

interface DadosDeEnvioEmail{
    para:string;
    id:string;
    assunto:string;
    texto:string;
}
//forma 1 de aplicar uma interface.
//function enviarEmail(dados:DadosDeEnvioEmail){//opção de parametro unico
function enviarEmail({para, id, assunto, texto}:DadosDeEnvioEmail){//opção de parametro desestruturado
    //biblioteca de envio de emails
    // console.log(dados.para, dados.id, dados.assunto, dados.texto);
    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario{
    send(){
        enviarEmail({
            para:"jose@gmail.com",
            id: "9899",
            assunto: "Olá",
            texto: "tudo bem?"
        });
    }
}