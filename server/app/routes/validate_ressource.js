const validate = (schema) => async (req, res, next) => {
  try {
    await conversationSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    });
    return next();
  } catch (err) {
    res.status(400).json({message: 'Your request is invalid', error: err.errors});
  }
}

module.exports = { validate };