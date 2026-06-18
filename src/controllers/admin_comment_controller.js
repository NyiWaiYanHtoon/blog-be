const adminCommentService = require('../services/admin_comment_service');

const getAllComments = async (req, res) => {
  try {
    const comments = await adminCommentService.getAllComments(req.query.status);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const approveComment = async (req, res) => {
  try {
    const comment = await adminCommentService.approveComment(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const rejectComment = async (req, res) => {
  try {
    const comment = await adminCommentService.rejectComment(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllComments, approveComment, rejectComment };