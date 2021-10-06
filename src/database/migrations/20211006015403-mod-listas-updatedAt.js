module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('listas', 'updateAt', 'updated_at');
  },
};
