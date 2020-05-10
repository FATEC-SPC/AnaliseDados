const Parse = require ('parse/node')

Parse.initialize('a9pZ8Txk8zBJgGxg63DhXzUn5raHKHa2WjYi0Fh8', 'VCxS0OoyLyCsahzui1p9Zrm53xyq0r91DEMpqeQK')
Parse.serverURL = 'https://parseapi.back4app.com'

async function run() {
    let Operation = Parse.Object.extend("STG_OPR_ITT")
    let queryOperation = new Parse.Query(Operation)

    queryOperation.equalTo('id_fnt', 67)
    queryOperation.limit(1000)

    let results = await queryOperation.find()
    for (let i = 0; i < results.length; i++){
        let object = results[i]
        let relation = object.relation('ID_FNT_ITT')
        let Fonte = Parse.Object.extend("STG_FNT_ITT")
        let fonteQuery = new Parse.Query(Fonte)
    
        fonteQuery.equalTo("ID_STG_FNT_ITT", 67)
        let result = await fonteQuery.find()
    
        relation.add(result)
        
        await object.save()
    }

}

run()