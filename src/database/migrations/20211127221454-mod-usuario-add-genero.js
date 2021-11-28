module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'genero', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface) =>
    queryInterface.removeColumn('usuarios', 'genero'),
};
