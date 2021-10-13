function userParser(req, res, next) {
  if (!req.headers.authorization) return next();

  const token = req.headers.authorization.trim().split(' ')[1]; // Bearer asdfasdfasdfas
  const base64String = token.split('.')[1]; /// asdfasdfasdfasdf.asdfasdfasdfasdf.asdfasdfasdfasd
  const decodedValue = JSON.parse(
    Buffer.from(base64String, 'base64').toString('ascii')
  );
  req.user = decodedValue;
  return next();
}
module.exports = userParser;
