const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('<appID>', '<javascriptKey>') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL


//Operação para copiar os dados da coluna "QTD_CLI_CAD_POS" para "cli_pos"
async function run() {
    let Opr = Parse.Object.extend("STG_MVT_CRD")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(20000)

    queryOpr.exists('QTD_CLI_CAD_POS')
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("cli_pos", object.get("QTD_CLI_CAD_POS"))
        await object.save()
        console.log(JSON.stringify(object))

    }
}

//Operação para criação das relations entre STG_MVT_CRD e STG_PGT
async function run() {
    let Operation = Parse.Object.extend("STG_MVT_CRD")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(20000)
    queryOperation.exists("cli_pos")
    let results = await queryOperation.find()
    
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation("QTD_CLI_CAD_POS")
        let Operacao = Parse.Object.extend("STG_PGT")
        let operacaoQuery = new Parse.Query(Operacao)

        operacaoQuery.equalTo("cli_pos", object.get("cli_pos"))       

        let result = await operacaoQuery.find()
        for (let j = 0; j < result.length; j++){
            if (result){
                relation.add(result)
                object.save()
                console.log(JSON.stringify(result))
            }
        }
    }

}

run()