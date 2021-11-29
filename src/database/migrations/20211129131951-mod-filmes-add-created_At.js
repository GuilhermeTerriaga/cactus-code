module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('filmes', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      await queryInterface.addColumn('filmes', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },
};
