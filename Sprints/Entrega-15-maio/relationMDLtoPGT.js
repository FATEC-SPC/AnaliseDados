const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

//Operação para copiar os dados da coluna "COD_MDL" para "id_mdl"
/*
async function run() {
    let Opr = Parse.Object.extend("STG_PGT")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(20000)

    queryOpr.exists('COD_MDL')
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("id_mdl", object.get("COD_MDL"))
        await object.save()

    }
}*/

//Operação para criação das relations entre STG_MDL e STG_PGT
async function run() {
    let Operation = Parse.Object.extend("STG_PGT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(20000)
    queryOperation.exists('id_mdl')
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
                console.log(result)
            }
        }
    }

}

run()