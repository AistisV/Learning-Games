import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  width: '75%',
  height: '200px',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  padding: 4,
  width: 384,
  height: 216,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  width: 'auto',
  height: '100%'
};


function DragAndDrop(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject } = useDropzone({
      maxFiles: 1,
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        baseStyle.height = '50px'
      }
    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt=""
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]
  );

  return (
    <section className="container">
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default DragAndDrop