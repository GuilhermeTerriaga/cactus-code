module.exports = {
  up: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('usuarios', 'genero_id'),
      queryInterface.dropTable('listas'),
      queryInterface.dropTable('genero_cinematograficos'),
    ]);
  },
};
