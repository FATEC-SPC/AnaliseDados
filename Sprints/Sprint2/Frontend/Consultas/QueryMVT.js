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
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        console.log("Valores da Parcela, Valor total Faturamto e Quantidade de Movimentações, respectivamente:")
        console.log("R$ " + JSON.stringify(object.get("VLR_PCL_FAT")/100) + " " + JSON.stringify(object.get("VLR_TOT_FAT")/100) + " " + JSON.stringify(object.get("QTD_MVT")))
    }
}

run()