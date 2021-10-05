module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('usuarios', 'arquivo_id', {
      type: Sequelize.INTEGER,
      references: { model: 'arquivos', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
      unique: true,
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn('usuarios', 'avatar_id'),
};
