TO-DO: NodeMailer(usar o email do cinefy),
       Listas -> modificar de corpo string para corpo de filmes (lista n-n filmes) - > Create lista cria somente a lista, usar await addFilme(url do filme)
       Admin -> codar controller pra ele parecido com providers do antigo projeto
       Seguir usuario -> codar e pensar a respeito
       gênero cinematográfico -> classe com campo url e é isso
       filme -> classe com campo url
       N para N não tem classe tabela associativa, apenas HasMany em cada classe que tem muitos]
       Classe.belongsToMany(Child, {
         as: 'Nome',
        through: 'tabela virtual',
        foreignKey: 'Parent_parentId'
})
