import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div className="card mb-4">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            {author ? `By ${author}` : ''} - {new Date(date).toLocaleDateString()}
          </small>
        </p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
};

export default NewsItem;