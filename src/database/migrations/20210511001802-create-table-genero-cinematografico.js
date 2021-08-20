module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('genero_cinematograficos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('genero_cinematograficos');
  },
};
