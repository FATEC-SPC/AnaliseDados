A tecnologia utilizada para o desenvolvimento do banco de dados é MongoDB + NodeJS.

Além desta tecnologia, utilizamos a Back4App, uma plataforma de Backend as a Service que utiliza o Parse Server, uma ferramenta openSource para acelerar o processo de desenvolvimento do Backend.

Para conexão e visualização do banco e seus relacionamentos, é necessário ter instalado o MongoDB instalado no computador.

A connection string para conectar ao banco é:

```
mongodb://readuser:aQGO17bAVT379Bea9p5uevCA@mongodb.back4app.com:27017/31c414544a5149229dc9f00349627126
```

Por questões de segurança, foi criado um usuário com permissões de leitura, somente.

No que tange às relações, seguem comentários e processos seguidos:

<b> Arquivo: "Entrega-15-maio/relationFNTtoMVT.js". </b>

Neste arquivo, a relação foi feita partindo da classe "STG_FNT_ITT" para a "STG_MVT_CRD".

Descrição das classes:
    * STG_FNT_ITT: Stage Fonte 
    * STG_MVT_CRD: Stage Movimentacao

O relacionamento foi feito a partir Identificação da Fonte que enviou os dados.

<b> Arquivo: "Entrega-15-maio/relationFNTtoOPR.js". </b>

Neste arquivo, a relação foi feita partindo da classe "STG_FNT_ITT" para a "STG_OPR_ITT".

Descrição das classes:
    * STG_FNT_ITT: Stage Fonte
    * STG_OPR_ITT: Stage Operacao

<b> Arquivo: "Entrega-15-maio/relationFNTtoPGT.js". </b>

Neste arquivo, a relação foi feita partindo da classe "STG_FNT_ITT" para a "STG_PGT".

Descrição das classes:
    * STG_FNT_ITT: Stage Fonte
    * STG_PGT: Stage Pagamento

Os relacionamentos trazem uma melhor confiabilidade dos dados e uma melhor performance do banco de dados, além de uma melhor organziação das informações disponíveis.

Nos três arquivos mencionados acima, antes da realização dos relacionamentos, tomamos o cuidado de verificar os dados, para isso, realizamos uma operação no banco com o método aggregate, para verificarmos se havia mais de um ID em cada classe, ou se tratavam de dados únicos para serem relacionados.

Também realizamos uma contagem no banco pelos scripts para fins de confirmação.

Um exemplo de comando executado direto pelo banco está aprentado abaixo.

```
db.getCollection("STG_OPR_ITT").aggregate([{
	$group: {
		_id: {
			ID_FNT_ITT: "$ID_FNT_ITT"
		},
		uniqueIds: {
			$addToSet: "$_id"
		},
		count: {
			$sum: 1
		}
	}
}, {
	$match: {
		count: {
			"$gt": 1
		}
	}
}]);
```

Este exemplo refere-se à consulta realizada na classe referente ao Stage Operação.

Preferimos manter os campos com dados passíveis de relacionamento com o mesmo nome, e, como confirmamos que nas classes relacionadas pelos arquivos acima possuíam um único registro, foi criada um campo temporário chamado "id_fnt", onde replicamos os valoes dos campos originais, para então, criarmos os campos relacionados com os nomes assim fornecidos, por conta disso, há nos três arquivos este código <blockquote>queryOperation.equalTo('id_fnt', 67)</blockquote>.