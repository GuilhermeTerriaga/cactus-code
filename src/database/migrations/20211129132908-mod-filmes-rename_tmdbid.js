module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('filmes', 'tmdbId', 'tmdb_id');
  },
};
