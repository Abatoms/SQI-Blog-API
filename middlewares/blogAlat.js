const blogAlat = (req, res, next) => {
  console.log(`The ip of the request is ${req.ip}`);

  next();
};

module.exports = blogAlat;
