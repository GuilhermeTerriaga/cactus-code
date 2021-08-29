module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resenhas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      veredito: {
        // diz se o usuário recomenda ou não
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      corpo: {
        type: Sequelize.STRING(550),
        allowNull: false,
      },
      nota: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('resenhas');
  },
};
