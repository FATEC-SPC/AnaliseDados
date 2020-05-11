const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

//Operação para copiar os dados da coluna "QTD_CLI_CAD_POS" para "cli_pos"
/*
async function run() {
    let Opr = Parse.Object.extend("STG_OPR_ITT")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(20000)

    queryOpr.exists('QTD_CLI_CAD_POS')
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("cli_pos", object.get("QTD_CLI_CAD_POS"))
        await object.save()

    }
}
*/

//Operação para criação das relations entre STG_MDL e STG_PGT
async function run() {
    let Operation = Parse.Object.extend("STG_OPR_ITT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(1000)
    queryOperation.exists('cli_pos')
    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('QTD_CLI_CAD_POS')
        let Operacao = Parse.Object.extend("STG_PGT")
        let operacaoQuery = new Parse.Query(Operacao)
        operacaoQuery.limit(20000)
   
        operacaoQuery.equalTo("cli_pos", object.get("cli_pos"))       

        let result = await operacaoQuery.find()
        
        relation.add(result)
        
        object.save()
        console.log(object)
    }

}

run()