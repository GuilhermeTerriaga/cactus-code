module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('filmes', 'tmdbId', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([queryInterface.removeColumn('filmes', 'url')]);
  },
};
