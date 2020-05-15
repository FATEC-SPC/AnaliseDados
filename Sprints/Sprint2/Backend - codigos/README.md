No que tange às relações, seguem comentários e processos seguidos:

<b> Arquivo: "Sprints/Entrega-15-maio/relationFNTtoMVT.js". </b>

Neste arquivo, a relação foi feita partindo da classe "STG_FNT_ITT" para a "STG_MVT_CRD".

Descrição das classes:

    * STG_FNT_ITT: Stage Fonte 
    * STG_MVT_CRD: Stage Movimentacao

O relacionamento foi feito a partir Identificação da Fonte que enviou os dados.

<b> Arquivo: "Sprints/Entrega-15-maio/relationFNTtoOPR.js". </b>

Neste arquivo, a relação foi feita partindo da classe "STG_FNT_ITT" para a "STG_OPR_ITT".

Descrição das classes:

    * STG_FNT_ITT: Stage Fonte
    * STG_OPR_ITT: Stage Operacao

<b> Arquivo: "Sprints/Entrega-15-maio/relationFNTtoPGT.js". </b>

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


Preferimos manter os campos com dados passíveis de relacionamento com o mesmo nome, e, como confirmamos que nas classes relacionadas pelos arquivos acima possuíam um único registro, foi criada um campo temporário chamado "id_fnt", onde replicamos os valoes dos campos originais, para então, criarmos os campos relacionados com os nomes assim fornecidos, por conta disso, há nos três arquivos este código "queryOperation.equalTo('id_fnt', 67)".



<b> Arquivo: "Sprints/Entrega-15-maio/relationMVTtoMDL.js". </b>

Neste arquivo, a relação foi feita entre as classes "STG_MVT_CRD" e "STG_MDL", referente ao Código da Modalidade.

Coluna relacionada: Código da Modalidade / Identificação da Modalidade

Descrição das classes:

    * STG_MDL: Stage Modalidade
    * STG_MVT_CRD: Stage Movimentação de Crédito

Os valores foram movidos temporariamente do coluna "COD_MDL" para "cod_mdl" da classe STG_MVT_CRD.

Posteriormente, foi criado um novo campo relacionado à "STG_MDL" chamado "ID_MDL".


<b> Arquivo: "Sprints/Entrega-15-maio/relationOPRtoMDL.js". </b>

Coluna relacionada: Código da Modalidade / Identificação da Modalidade

Neste arquivo, a relação foi feita entre as classes "STG_OPR_ITT" e "STG_MDL".

Descrição das classes:

    * STG_MDL: Stage Modalidade
    * STG_OPR_ITT: Stage Operação de Crédito

Os valores foram movidos temporariamente do coluna "ID_MDL" para "cod_mdl" da classe STG_OPR_ITT.

Posteriormente, foi recriado o campo relacionado à "STG_MDL" chamado "ID_MDL".


<b> Arquivo: "Sprints/Entrega-15-maio/relationPGTtoMDL.js". </b>

Neste arquivo, a relação foi feita entre as classes "STG_PGT" e "STG_MDL".

Coluna relacionada: Código da Modalidade / Identificação da Modalidade

Descrição das classes:

    * STG_MDL: Stage Modalidade
    * STG_PGT: Stage Pagamento


Os valores foram movidos temporariamente do coluna "COD_MDL" para "id_mdl" da classe STG_PGT.

Posteriormente, foi recriado o campo relacionado à "STG_MDL" chamado "ID_MDL".
