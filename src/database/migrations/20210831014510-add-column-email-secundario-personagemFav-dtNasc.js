module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('usuarios', 'emailSecundario', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usuarios', 'personagemFav', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('usuarios', 'dtNascimento', {
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
