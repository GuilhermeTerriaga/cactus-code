module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('listas', 'dados_listas'),

      await queryInterface.addColumn('listas', 'titulo', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      await queryInterface.addColumn('listas', 'corpo', {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('listas', 'dados_listas', {
        type: Sequelize.JSON,
      }),
      queryInterface.removeColumn('listas', 'titulo'),
      queryInterface.removeColumn('listas', 'corpo'),
    ]);
  },
};
