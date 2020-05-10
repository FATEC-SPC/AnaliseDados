const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

//Operação paa criação das relations entre STG_MDL e STG_OPR_ITT
async function run() {
    let Operation = Parse.Object.extend("STG_OPR_ITT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(1000)
    queryOperation.exists('cod_mdl')

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_MDL')
        let Fonte = Parse.Object.extend("STG_MDL")
        let fonteQuery = new Parse.Query(Fonte)
    
        fonteQuery.equalTo("COD_MDL", object.get("cod_mdl"))
        let result = await fonteQuery.find()
    
        relation.add(result)
        
        await object.save()
    }

}

//Operação para copiar os dados da coluna "ID_MDL" para "cod_ml"

/*async function run() {
    let Opr = Parse.Object.extend("STG_OPR_ITT")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(1000)

    queryOpr.doesNotExist("ID_MDL")
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("cod_mdl", object.get("ID_MDL"))
        object.save()

    }
}*/


//Operação paa criação das relations entre STG_MDL e STG_OPR_ITT
async function run() {
    let Operation = Parse.Object.extend("STG_OPR_ITT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(1000)
    queryOperation.exists('cod_mdl')

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_MDL')
        let Fonte = Parse.Object.extend("STG_MDL")
        let fonteQuery = new Parse.Query(Fonte)
    
        fonteQuery.equalTo("COD_MDL", object.get("cod_mdl"))
        let result = await fonteQuery.find()
    
        relation.add(result)
        
        await object.save()
    }

}

run()