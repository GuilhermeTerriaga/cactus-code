module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('filmes', 'nome'),
      queryInterface.addColumn('resenhas', 'filmes_id', {
        type: Sequelize.INTEGER,
        references: { model: 'filmes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        unique: false,
      }),
    ]);
  },
};
