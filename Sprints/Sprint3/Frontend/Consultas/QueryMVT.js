const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL


//Operação para coletar as informações dos Valores da Parcela, Valor total Faturamto e Quantidade de Movimentações.

async function run() {
    let Opr = Parse.Object.extend("STG_MVT_CRD")
    let queryOpr = new Parse.Query(Opr)
    queryOpr.limit(1000)
  
    let results = await queryOpr.find()
    let sumPcl = 0;
    let sumTot = 0;
    let sumMVT = 0;
    let sumSDO = 0;
    let sumMim = 0;
    for (let i = 0; i < results.length; i++ ){
        let object = results[i]
        if (object.get("VLR_PCL_FAT")){          
            sumPcl += Number.parseFloat(JSON.stringify(object.get("VLR_PCL_FAT")/100))
        }
        if (object.get("VLR_TOT_FAT")){          
            sumTot += Number.parseFloat(JSON.stringify(object.get("VLR_TOT_FAT")/100))
        }
        if (object.get("QTD_MVT")){          
            sumMVT += Number.parseFloat(JSON.stringify(object.get("QTD_MVT")))
        }
        if (object.get("VLR_SDO_UTZ_CRD_RTO")){          
            sumSDO += Number.parseFloat(JSON.stringify(object.get("VLR_SDO_UTZ_CRD_RTO")/100))
        }
        if (object.get("VLR_MIM_FAT")){          
            sumMim += Number.parseFloat(JSON.stringify(object.get("VLR_MIM_FAT")/100))
        }
    }


    console.log("Valor Total Utilizado por Remessa R$: " + sumSDO)
    console.log("Valor Total Fatura por Remessa R$: " + sumTot)
    console.log("Valor Total Mínimo por Remessa R$: " + sumMim)
    console.log("Valor Total Parcela por Remessa R$: " + sumPcl)
    console.log("Total de Movimentações por Remessa: " + sumMVT + " movimentações")

    if(sumPcl > sumTot){
        console.log("O valor total parecela por remessa é maior que o valor total fatura por remessa")
    }
    else if(sumMim > sumTot){
        console.log("O valor Total Mínimo por Remessa é maior que Valor Total Fatura por Remessa")
    }
    else if(sumTot > sumSDO){
        console.log("O Valor Total Fatura por Remessa é maior que o Total Utilizado por Remessa")
    }
    else {
        console.log("está tudo bem")
    }
}

run()