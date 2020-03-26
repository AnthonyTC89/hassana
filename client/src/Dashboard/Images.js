import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { uploadFile, deleteFile } from 'react-s3';
import { messages } from '../PageInfo.json';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap.css';
import './Images.css';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      msg: '',
      loading: false,
      allImages: props.recipes,
    };
    this.configS3 = {
      bucketName: process.env.REACT_APP_S3_BUCKET,
      region: process.env.REACT_APP_S3_BUCKET_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleUploadS3 = this.handleUploadS3.bind(this);
  }

  componentDidMount() {
    // this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const recipes = await axios.get('/api/recipes');
      this.setState({
        loading: false,
        allImages: recipes.data,
      });
    } catch (err) {
      this.setState({
        loading: false,
        msg: messages['006'],
      });
    }
  }

  handleChangeFile(e) {
    this.setState({
      file: e.currentTarget.files[0],
      msg: '',
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
    // if the file is not an image
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
      loading: true,
    });
    try {
      const data = await uploadFile(file, this.configS3);
      const { bucket, key, location } = data;
      const res = await axios.post('/api/recipes', { bucket, key, location });
      const newImage = { id: res.data.id, bucket, key, location };
      this.setState((prevState) => ({
        msg: messages['003'],
        loading: false,
        allImages: [...prevState.allImages, newImage],
      }));
    } catch (err) {
      this.setState({
        msg: messages['004'],
        loading: false,
      });
    }
  }

  async handleDeleteFile(image) {
    this.setState({
      loading: true,
    });
    try {
      await axios.delete(`api/recipes/${image.id}`);
      await deleteFile(image.key, this.configS3);
      this.setState((prevState) => ({
        loading: false,
        msg: messages['008'],
        allImages: prevState.allImages.filter((item) => item.id !== image.id),
      }));
    } catch (err) {
      this.setState({
        loading: false,
        msg: messages['009'],
      });
    }
  }

  render() {
    const { loading, msg, allImages } = this.state;
    const title = `Imagenes (${allImages.length})`;
    return (
      <section className="container">
        <h2>{title}</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        <form onSubmit={this.handleUploadS3}>
          <input type="file" accept="image/*" multiple={false} onChange={this.handleChangeFile} />
          <button type="submit">Guardar</button>
          <p>{msg}</p>
        </form>
        <div className="row">
          {allImages.map((img) => (
            <div key={uuidv4()} className="card border-success col-6 col-sm-4 col-md-3 col-lg-2">
              <h6>{img.key}</h6>
              <img className="card-img-top card-img" src={img.location} alt="hassana-file" />
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => this.handleDeleteFile(img)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

Images.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default Images;
