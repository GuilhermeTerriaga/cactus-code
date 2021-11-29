export default async (req, res, next) => {
  const { isAdmin } = req.body;
  if (isAdmin !== true) {
    return res.status(401).json({ error: 'Não é admin' });
  }
  return next();
};
