module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('usuarios', 'lista_id');
  },
};
