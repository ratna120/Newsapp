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
      error: null,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily News`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  updateNews = async (page) => {
    this.setState({ loading: true, error: null });

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=3fa5fbcda42a4c2ab4893ee078a7e873&page=${page}&pageSize=${this.props.pageSize}`;

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let parsedData = await response.json();
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'API request failed');
      }
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        page,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({
        loading: false,
        error: error.message || 'Failed to fetch news. Please try again later.',
        articles: [],
      });
    }
  };

  componentDidMount() {
    this.updateNews(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.category !== prevProps.category ||
      this.props.country !== prevProps.country
    ) {
      console.log('Category changed to:', this.props.category); // Debugging log
      this.setState({ articles: [], page: 1, error: null }, () => {
        this.updateNews(1);
      });
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily News`;
    }
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.updateNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.updateNews(this.state.page + 1);
    }
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Spinner />}
        {this.state.error && (
          <div className="text-center text-danger">
            <p>{this.state.error}</p>
          </div>
        )}
        {!this.state.loading && !this.state.error && this.state.articles.length === 0 && (
          <div className="text-center">
            <p>No articles available for this category.</p>
          </div>
        )}

        <div className="container">
          <div className="row">
            {!this.state.loading &&
              !this.state.error &&
              this.state.articles.map((element) => (
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
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            ← Prev
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next →
          </button>
        </div>
      </>
    );
  }
}

export default News;