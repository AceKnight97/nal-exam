import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import _ from 'lodash';

const ArticleCard = (props) => {
  const {
    className, image, title, content, onClick, type,
  } = props;
  let modifier = '';
  switch (type) {
    case 'DETAIL':
      modifier = 'article-card--detail';
      break;

    default:
      break;
  }
  return (
    <button
      className={classnames('article-card', modifier, className)}
      onClick={onClick}
    >
      <LazyLoadImage
        ffect="blur"
        src={image}
        alt={title}
        className="article-card__image"
      />

      <div className="article-card__right">
        <div className="article-card__right__title">
          <span>{_.upperFirst(title)}</span>
        </div>
        <div className="article-card__right__content">
          <span>{_.upperFirst(content)}</span>
        </div>
      </div>

    </button>
  );
};
ArticleCard.defaultProps = {
  className: '',
  image: '',
  title: '',
  content: '',
  onClick: () => {},
  type: '',
};
ArticleCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default ArticleCard;
