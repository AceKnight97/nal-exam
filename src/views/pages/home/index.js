import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { useMergeState, useUpdateEffect } from '../../../utils/hooks';
import { queryListOfArticles, queryAnArticle } from './helper';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ArticleCard from '../../../components/cards/articleCard';
import InputCT from '../../../components/inputs/inputCT';
import Pagination from '../../components/pagination';

const Home = (props) => {
  const deboundSearch = useRef(undefined);
  const [state, setState] = useMergeState({
    listArticles: [],
    article: {},
    page: 0,
    searchText: undefined,
    isEndOfData: false,
    sortOrder: undefined,

  });
  const { className } = props;

  const getListArticles = async (page = 1) => {
    const res = await queryListOfArticles(state, page, null, null, null);
    console.log({ res });
    setState(res);
  };

  const getAnArticle = async (id) => {
    const article = await queryAnArticle(id);
    console.log({ article });
    setState({ article });
  };

  useEffect(() => {
    getListArticles(1, null, null, null);
  }, []);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  const {
    listArticles, page, article, searchText, isEndOfData, sortOrder,
  } = state;

  const pages = Math.ceil(listArticles?.length / 10);
  console.log({ pages });

  useUpdateEffect(() => {
    if (deboundSearch.current) {
      clearTimeout(deboundSearch.current);
    }
    deboundSearch.current = setTimeout(async () => {
      const res = await queryListOfArticles(state, null, null, searchText, false);
      _.assign(res, { page: 0, sortOrder: undefined });
      setState(res);
    }, 300);
  }, [searchText]);

  const onClickArticle = (id = '') => {
    getAnArticle(id);
  };

  const onClickChangePage = async (newPage) => {
    console.log({ newPage });
    if (newPage >= pages) {
      const res = await queryListOfArticles(state, newPage + 1, null, null, true);
      _.assign(res, { page: newPage });
      console.log({ res });
      setState(res);
    } else {
      setState({ page: newPage });
    }
  };

  const onClickSortType = async (order) => {
    const res = await queryListOfArticles(state, null, order, null, false);
    _.assign(res, { page: 0, sortOrder: order });
    console.log({ res });
    setState(res);
  };
  const onClickBack = () => {
    setState({ article: {} });
  };

  const renderMainBody = () => (
    <>
      <div className="home__filter">
        <InputCT
          name="searchText"
          placeholder="Search..."
          value={searchText}
          onChange={onChange}
          className="home__filter__search"
        />
        <div className="home__filter__sort">
          <Button
            type={sortOrder === 'asc' ? 'primary' : ''}
            onClick={() => onClickSortType('asc')}
          >
            Sort as asc
          </Button>
          <Button
            className="ml-24"
            type={sortOrder === 'desc' ? 'primary' : ''}
            onClick={() => onClickSortType('desc')}
          >
            Sort as desc
          </Button>
        </div>
      </div>

      <div className="home__body">
        {
          listArticles?.length === 0 && searchText
            ? (
              <div className="home__body__not-found">
                <span>Not Found</span>
              </div>
)

            : _.map(listArticles?.slice(page * 10, (page + 1) * 10), (x, i) => (
              <ArticleCard
                key={i}
                image={x.image}
                title={x.title}
                content={x.content}
                onClick={() => onClickArticle(x.id)}
                className={`mt-16 ${i % 2 !== 0 ? 'ml-24' : ''}`}
              />
            ))
  }
        {
    pages !== 0 && (
    <Pagination
      pages={pages}
      current={page + 1}
      onClick={onClickChangePage}
      isEndOfData={isEndOfData}
    />
    )
  }
      </div>
    </>
  );

  const renderArticle = () => (
    <div className="home__article">
      <ArticleCard
        image={article.image}
        title={article.title}
        content={article.content}
        type="DETAIL"
        onClick={onClickBack}
      />
    </div>
  );


  return (
    <div className={classnames('home', className)}>
      <Header />

      {
        _.isEmpty(article) ? renderMainBody() : renderArticle()
      }

      <Footer />
    </div>
  );
};
Home.defaultProps = {
  className: '',
};
Home.propTypes = {
  className: PropTypes.string,
};

export default Home;
