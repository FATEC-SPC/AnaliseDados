const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

async function run() {
    let Operation = Parse.Object.extend("STG_MVT_CRD")
    let queryOperation = new Parse.Query(Operation)

    await queryOperation.equalTo('id_fnt', 67)
    //queryOperation.limit(20000)
    //let count = await queryOperation.count()

    //console.log(count) //bateu com o valor do aggregate

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_FNT_ITT')
        let Fonte = Parse.Object.extend("STG_FNT_ITT")
        let fonteQuery = new Parse.Query(Fonte)
    
        await fonteQuery.equalTo("ID_STG_FNT_ITT", 67)
        let result = await fonteQuery.find()
    
        await relation.add(result)
        
        await object.save()
    }

}

run()