const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

//Operação para copiar os dados da coluna "ID_MDL" para "cod_ml"
/*
async function run() {
    let Opr = Parse.Object.extend("STG_MVT_CRD")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(1000)

    queryOpr.exists("COD_MDL")
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("cod_mdl", object.get("COD_MDL"))
        object.save()

    }
}
*/

//Operação para criação das relations entre STG_MVT_CRD e STG_MDL
async function run() {
    let Operation = Parse.Object.extend("STG_MVT_CRD")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(1000)
    queryOperation.exists('cod_mdl')

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_MDL')
        let Modalidade = Parse.Object.extend("STG_MDL")
        let modalidadeQuery = new Parse.Query(Modalidade)
    
        modalidadeQuery.equalTo("COD_MDL", object.get("cod_mdl"))
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