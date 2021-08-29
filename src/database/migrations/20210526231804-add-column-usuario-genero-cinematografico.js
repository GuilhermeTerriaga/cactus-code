module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('usuarios', 'genero_id', {
      type: Sequelize.INTEGER,
      references: { model: 'genero_cinematograficos', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn('usuarios', 'genero_id'),
};
