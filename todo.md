TO-DO:filme -> classe com campo url ok
       N para N não tem classe tabela associativa, apenas HasMany em cada classe que tem muitos]
       Classe.belongsToMany(Child, {
         as: 'Nome',
        through: 'tabela virtual',
        foreignKey: 'Parent_parentId'
})
1 filme, n resenhas


