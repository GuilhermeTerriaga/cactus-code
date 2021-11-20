module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('filmes', 'url', {
        type: Sequelize.STRING,
        allowNull: false,
      }),

      await queryInterface.addColumn('filmes', 'urlimagem', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('filmes', 'url'),
      queryInterface.removeColumn('filmes', 'urlimagem'),
    ]);
  },
};
