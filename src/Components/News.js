import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  updateNews = async (page) => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3fa5fbcda42a4c2ab4893ee078a7e873&page=${page}&pageSize=${this.props.pageSize}`;
    try {
      let response = await fetch(url);
      let parsedData = await response.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        page,
      });
    } catch (error) {
      console.error('Error fetching the news:', error);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.updateNews(this.state.page);
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.updateNews(this.state.page - 1);
    }
  }

  handleNextClick = () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.updateNews(this.state.page + 1);
    }
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </>
    );
  }
}

export default News;
