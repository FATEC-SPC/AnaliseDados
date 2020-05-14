const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('<appID>', '<javascriptKey>') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL

//Operação para copiar os dados da coluna "ID_MDL" para "cod_ml"

async function run() {
    let Opr = Parse.Object.extend("STG_OPR_ITT")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(1000)

    queryOpr.doesNotExist("ID_MDL")
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("cod_mdl", object.get("ID_MDL"))
        object.save()
        console.log(JSON.stringify(object))

    }
}

//Operação para criação das relations entre STG_MDL e STG_OPR_ITT
async function run() {
    let Operation = Parse.Object.extend("STG_OPR_ITT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(1000)
    queryOperation.exists('cod_mdl')

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_MDL')
        let Modalidade = Parse.Object.extend("STG_MDL")
        let modalidadeQuery = new Parse.Query(Modalidade)
    
        modalidadeQuery.equalTo("COD_MDL", object.get("id_mdl"))
        let result = await modalidadeQuery.find()
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