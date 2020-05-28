const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL


//Operação para coletar as informações dos Valores da Parcela, Valor total Faturamto e Quantidade de Movimentações.

async function run() {
    let Opr = Parse.Object.extend("STG_OPR_ITT")
    let queryOpr = new Parse.Query(Opr)
    queryOpr.limit(1000)
    let results = await queryOpr.find()

    let sumPcl = 0;
    let sumTot = 0;
    let sumOpr = 0;
    let sumSDO = 0;

    for (let i = 0; i < results.length; i++ ){
        let object = results[i]
        if (object.get("VLR_CTRD_CSC")){          
            sumTot += Number.parseFloat(JSON.stringify(object.get("VLR_CTRD_CSC")/100))
        }
        if (object.get("QTD_PCL")){          
            sumPcl += Number.parseFloat(JSON.stringify(object.get("QTD_PCL")))
        }
        if (object.get("VLR_SDO_DDR")){          
            sumSDO += Number.parseFloat(JSON.stringify(object.get("VLR_SDO_DDR")/100))
        }
        if (object.get("QTD_OPR")){          
            sumOpr += Number.parseFloat(JSON.stringify(object.get("QTD_OPR")))
        }
    }
    
    console.log("Valor Total Contratado por Remessa R$: " + sumTot.toFixed(2))
    console.log("Quantidade de Parcelas por remessa: " + sumPcl + " parcelas")
    console.log("Valor Total Saldo Devedor R$: " + sumSDO.toFixed(2))
    console.log("Quantidade de Operações por remessa: " + sumOpr + " operações")

    if(sumPcl > sumTot){
        console.log("ERRO!! O valor total parcela por remessa é maior que o valor total fatura por remessa")
    }
    else if(sumSDO > sumTot){
        console.log("ERRO!! O valor total Saldo Devedor por remessa é maior que o valor total fatura por remessa")
    }
    else {
        console.log("está tudo bem")
    }
}

run()