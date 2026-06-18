const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
  const ext = file.originalname.split('.').pop();
  const filename = `${uuidv4()}.${ext}`;
  const path = `blogs/${filename}`;

  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(path);

  return { url: data.publicUrl };
};

module.exports = { uploadImage };