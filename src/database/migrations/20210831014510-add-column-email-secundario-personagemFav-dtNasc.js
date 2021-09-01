module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('usuarios', 'email_secundario', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }),
      queryInterface.addColumn('usuarios', 'personagem_fav', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usuarios', 'dt_nascimento', {
        type: Sequelize.DATEONLY,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('usuarios', 'emailSecundario'),
      queryInterface.removeColumn('usuarios', 'personagemFav'),
      queryInterface.removeColumn('usuarios', 'dtNascimento'),
    ]);
  },
};
