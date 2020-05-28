const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL


//Operação para coletar as informações dos Valores da Parcela, Valor total Faturamto e Quantidade de Movimentações.

async function run() {
    let Opr = Parse.Object.extend("STG_PGT")
    let queryOpr = new Parse.Query(Opr)
    queryOpr.limit(16000)
  
    let results = await queryOpr.find()
    let sumPgt = 0;
    let sumTot = 0;
    let sumOpr = 0;
    let sumSDO = 0;
    let hoje = new Date().toDateString();
    for (let i = 0; i < results.length; i++ ){
        let object = results[i]
        if (object.get("VLR_PGT_FAT")){          
            sumTot += Number.parseFloat(JSON.stringify(object.get("VLR_PGT_FAT")/100))
        }
        if (object.get("QTD_PGT")){          
            sumPgt += Number.parseFloat(JSON.stringify(object.get("QTD_PGT")))
        }
        if (object.get("DAT_VCT")){
            
            sumPgt += Number.parseFloat(JSON.stringify(object.get("DAT_VCT")))
            if(hoje > sumPgt){
                console.log("tá funfando as data tudo?")
            }
        }
        
    }
    
    console.log("Valor Total Pagamento por Remessa R$: " + sumTot.toFixed(2))
    console.log("Quantidade de Pagamentos por remessa: " + sumPgt + " pagamentos")
    console.log("Quantidade de registros vencidos por remessa: " + sumPgt + " registros")
    
    console.log("a data tá funfando?" + hoje)
/*    if(sumPcl > sumTot){
        console.log("O valor total parecela por remessa é maior que o valor total fatura por remessa")
    }
    else if(sumSDO > sumTot){
        console.log("O valor total Saldo Devedor por remessa é maior que o valor total fatura por remessa")
    }
    else {
        console.log("está tudo bem")
    }
*/
}

run()