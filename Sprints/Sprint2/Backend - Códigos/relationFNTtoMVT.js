const Parse = require ('parse/node')

//Inicialização do Parse
Parse.initialize('<appID>', '<javascriptKey>') //Credenciais do Parse App
Parse.serverURL = 'https://parseapi.back4app.com' //API URL

async function run() {
    let Operation = Parse.Object.extend("STG_MVT_CRD")
    let queryOperation = new Parse.Query(Operation)

    await queryOperation.equalTo('id_fnt', 67)
    //let count = await queryOperation.count()

    //console.log(count) //bateu com o valor do aggregate

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_FNT_ITT')
        let Fonte = Parse.Object.extend("STG_FNT_ITT")
        let fonteQuery = new Parse.Query(Fonte)
    
        fonteQuery.equalTo("ID_STG_FNT_ITT", 67)
        let result = await fonteQuery.find()
        
        relation.add(result)
        
        object.save()
        console.log(JSON.stringify(object))

    }

}

run()