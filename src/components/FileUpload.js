import React from "react";
import uploadImg from "../assets/upload-image.svg";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
function FileUpload({ file, handleUpload }) {
  return (
    <div className="upload-box">
      <label>
        {file ? (
          <ImageThumb image={file} />
        ) : (
          <img
            style={{
              padding: "50px 40px",
            }}
            src={uploadImg}
          />
        )}

        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*" /* this can be removed if we want to accept any input*/
          onChange={handleUpload}
        />
      </label>

    </div>
  );
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
  return (
    <img className="thumb" src={URL.createObjectURL(image)} alt={image.name} />
  );
};

export default FileUpload;
