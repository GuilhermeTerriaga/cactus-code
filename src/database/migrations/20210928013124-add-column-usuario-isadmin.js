module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('usuarios', 'is_admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: async (queryInterface) =>
    queryInterface.removeColumn('usuarios', 'is_admin'),
};
