module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('genero_cinematograficos', 'nome', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface) =>
    queryInterface.removeColumn('genero_cinematograficos', 'nome'),
};
