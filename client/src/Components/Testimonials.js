import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/pre-loader.gif';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './Testimonials.css';

class Testimonials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_testimonials');
      this.setState({
        testimonials: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { testimonials, loading } = this.state;
    if (testimonials.length === 0) { return null; }
    return (
      <section className="container testimonials-section" id="testimonials">
        <h2>Testimonios</h2>
        {loading
          ? <img className="icon-loading" src={iconLoading} alt="icon-loading" />
          : null}
        {testimonials.map((item) => (
          <article key={uuidv4()} className="row testimonial">
            <picture className="col-12 col-sm-6">
              <img className="testimonial-img" src={item.location} alt={item.key} />
            </picture>
            <div className="col-12 col-sm-6 testimonial-text">
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    );
  }
}

export default Testimonials;
