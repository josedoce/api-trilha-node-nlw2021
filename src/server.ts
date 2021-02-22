import express from 'express';

const app = express();
/**
 * metodos
 * get=>busca
 * post=>salvar
 * put=>alterar
 * delete=>deletar
 * patch=>alteração especifica
 */
app.get('/',(req, res)=>{
    
    return res.json({mensagem: "oiee"});
});
app.post('/',(req, res)=>{
    return res.json({mensagem: "Os dados foram salvos com sucesso!"});
});

app.listen(3333, ()=>console.log("Rodando... :)"));