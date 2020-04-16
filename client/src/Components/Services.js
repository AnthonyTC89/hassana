import React from 'react';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import iconLoading from '../Images/loading.gif';
import BenefitsModal from './BenefitsModal';
import './Services.css';

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      modalVisible: false,
      serviceSelected: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  async getInfo() {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios.get('/api/full_services');
      this.setState({
        services: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  openModal(serviceSelected) {
    this.setState({
      modalVisible: true,
      serviceSelected,
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { services, loading, modalVisible, serviceSelected } = this.state;
    if (services.length === 0) { return null; }
    return (
      <section className="container services-section bg-hassana" id="services">
        <h2>Servicios</h2>
        {modalVisible
          ? (
            <BenefitsModal
              item={serviceSelected}
              modalVisible={modalVisible}
              closeModal={this.closeModal}
            />
          )
          : null}
        {loading
          ? (
            <picture className="row mx-auto">
              <img className="icon-loading" src={iconLoading} alt="icon-loading" />
            </picture>
          ) : (
            <div className="row">
              {services.map((item) => (
                <article key={uuidv4()} className="col-12 col-sm-6 col-md-4 service">
                  <picture className="service-picture">
                    <img className="service-img" src={item.location} alt={item.key} />
                  </picture>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  {item.benefits === ''
                    ? null
                    : (
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => this.openModal(item)}
                      >
                        Beneficios
                      </button>
                    )}
                </article>
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default Services;
