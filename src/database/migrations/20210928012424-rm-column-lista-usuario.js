module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('listas', 'usuario_id');
  },
};
