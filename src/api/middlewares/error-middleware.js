module.exports = (err, _req, res, next) => {
  const { name, message } = err;

  switch (name) {
    case 'bad_request':
      res.status(400).json({ message });
      break;

    default:
      res.status(500).json({ message });
      break;
  }

  next();
};
