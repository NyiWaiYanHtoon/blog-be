const commentRepository = require('../repositories/comment_repo');

const getAllComments = async (status) => {
  const validStatuses = ['pending', 'approved', 'rejected'];
  if (status && !validStatuses.includes(status))
    throw new Error('Invalid status filter');
  return commentRepository.findAll(status);
};

const approveComment = async (id) => {
  const comment = await commentRepository.findById(id);
  if (!comment) throw new Error('Comment not found');
  if (comment.status === 'approved') throw new Error('Comment is already approved');
  return commentRepository.updateStatus(id, 'approved');
};

const rejectComment = async (id) => {
  const comment = await commentRepository.findById(id);
  if (!comment) throw new Error('Comment not found');
  if (comment.status === 'rejected') throw new Error('Comment is already rejected');
  return commentRepository.updateStatus(id, 'rejected');
};

module.exports = { getAllComments, approveComment, rejectComment };