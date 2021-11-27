module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('lista', 'usuario_id');
  },
};
