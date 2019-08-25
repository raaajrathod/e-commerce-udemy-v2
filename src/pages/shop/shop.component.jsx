import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {fetchCollectionStartAsync} from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {isCollectionLoaded, isFetching} from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  match,
  isFetching,
  fetchCollectionStartAsync,
  isCollectionLoaded
}) => {
  useEffect(() => {
    fetchCollectionStartAsync();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={props => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap))
// });

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: isCollectionLoaded,
  isFetching: isFetching
});

export default connect(
  mapStateToProps,
  {fetchCollectionStartAsync}
)(ShopPage);
