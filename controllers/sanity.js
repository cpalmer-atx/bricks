exports.sanityCheck = (req, res) => {
  res
    .status(200)
    .json({ success: true, sanity_check: 'Passed!' });
};