import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import iconLoading from '../Images/loading.gif';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
      <section className="container-fluid testimonials-section" id="testimonials">
        <h2>Testimonios</h2>
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          ) : (
            <Carousel
              showStatus={false}
              showThumbs={false}
              useKeyboardArrows
              autoPlay
              infiniteLoop
              interval={5000}
              transitionTime={1000}
            >
              {testimonials.map((item) => (
                <article key={uuidv4()} className="row testimonial">
                  <picture className="col-12 col-sm-6 testimonial-picture">
                    <img className="testimonial-img" src={item.location} alt={item.key} />
                  </picture>
                  <div className="col-12 col-sm-6 testimonial-text">
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </Carousel>
          )}
      </section>
    );
  }
}

export default Testimonials;
