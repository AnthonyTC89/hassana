import React from 'react';
import axios from 'axios';
import { uploadFile } from 'react-s3';
import { messages, images } from '../PageInfo.json';
import 'bootstrap/dist/css/bootstrap-grid.css';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      msg: 'mensaje',
      uploading: false,
      allImages: images,
    };
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleUploadS3 = this.handleUploadS3.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    try {
      const recipes = await axios.get('/api/recipes');
      this.setState({
        allImages: recipes.data,
      });
    } catch (err) {
      this.setState({
        msg: messages['006'],
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleChangeFile(e) {
    this.setState({
      file: e.currentTarget.files[0],
    });
  }

  async validateUploadFile(file) {
    const { allImages } = this.state;
    // if the file is null
    if (!file) {
      this.setState({
        msg: messages['005'],
      });
      return false;
    }
    // if the name of the file exists
    if (allImages.some((img) => img.key === file.name)) {
      this.setState({
        msg: messages['007'],
      });
      return false;
    }
    if (file.type.substring(0, 5) !== 'image') {
      this.setState({
        msg: messages['008'],
      });
      return false;
    }
    return true;
  }

  async handleUploadS3(e) {
    e.preventDefault();
    const { file } = this.state;
    const valid = await this.validateUploadFile(file);
    if (!valid) {
      return;
    }
    this.setState({
      uploading: true,
    });
    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET,
      region: process.env.REACT_APP_S3_BUCKET_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };
    try {
      const data = await uploadFile(file, config);
      const { bucket, key, location } = data;
      await axios.post('/api/recipes', { bucket, key, location });
      this.setState({
        msg: messages['003'],
        uploading: false,
      });
    } catch (err) {
      this.setState({
        msg: messages['004'],
        uploading: false,
      });
    }
  }

  render() {
    const { uploading, msg, allImages } = this.state;
    const title = `Imagenes (${allImages.length})`;
    return (
      <section className="container">
        <h2>{title}</h2>
        <form onSubmit={this.handleUploadS3}>
          <input type="file" accept="image/*" multiple={false} onChange={this.handleChangeFile} />
          <button type="submit">Upload</button>
          <p>{uploading}</p>
          <p>{msg}</p>
        </form>
      </section>
    );
  }
}

export default Images;
