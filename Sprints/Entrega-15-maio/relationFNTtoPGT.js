const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('<appID>', '<javascriptKey>') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL



//Operação para copiar os dados da coluna "ID_FNT_ITT" para "id_fnt"
async function run() {
    let Opr = Parse.Object.extend("STG_PGT")
    let queryOpr = new Parse.Query(Opr)

    queryOpr.limit(20000)

    queryOpr.exists('ID_FNT_ITT')
    
    let results = await queryOpr.find()
    for (let i =0; i < results.length; i++ ){
        let object = results[i]
        object.set("id_fnt", object.get("ID_FNT_ITT"))
        await object.save()
        console.log(JSON.stringify(object))

    }
}


//Operação para criação das relations entre STG_PGT e STG_FNT_ITT

async function run() {
    let Operation = Parse.Object.extend("STG_PGT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.limit(20000)
    queryOperation.exists('id_fnt')

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_FNT_ITT')
        let Fonte = Parse.Object.extend("STG_FNT_ITT")
        let fonteQuery = new Parse.Query(Fonte)
    
        fonteQuery.equalTo("ID_STG_FNT_ITT", object.get("id_fnt"))
        let result = await fonteQuery.find()
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