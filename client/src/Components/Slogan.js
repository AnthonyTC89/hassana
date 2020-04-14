/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Slogan.css';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recipe: null,
    };
  }

  componentDidMount() {
    this.getSlogan();
  }

  async getSlogan() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_headers');
      const { recipe_id, location, key } = res.data[0];
      this.setState({
        recipe: { recipe_id, location, key },
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { recipe, loading } = this.state;
    return (
      <section className="slogan-section" id="home">
        {loading
          ? (
            <picture className="picture-loading">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          )
          : (
            <div>
              <picture className="picture-slogan">
                {recipe
                  ? <img className="image-slogan" src={recipe.location} alt={recipe.key} />
                  : null}
              </picture>
            </div>
          )}
      </section>
    );
  }
}

export default Slogan;
