const logSomethingToTheConsole = (req, res, next) => {
  console.log(
    "This is a middleware function that logs something to the console"
  );

  next();
};

module.exports = logSomethingToTheConsole;
