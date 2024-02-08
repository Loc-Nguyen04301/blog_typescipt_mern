export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"];
  let error = "";
  if (!file) return (error = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    error = "The largest image size is 1mb";
  if (!types.includes(file.type)) error = "The image type is png / jpeg";

  return error;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "u5nfpr4b");
  formData.append("cloud_name", "dr98sm712");
  // calling the upload API.
  const res = await fetch("https://api.cloudinary.com/v1_1/dr98sm712/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return { data: data, public_id: data.public_id, url: data.secure_url };
};
