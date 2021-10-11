/* eslint-disable react/prop-types */
import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { push } from "react-router-redux";
import { t } from "ttag";

import ArchiveModal from "metabase/components/ArchiveModal";

import * as Urls from "metabase/lib/urls";

import Collection from "metabase/entities/collections";

const mapDispatchToProps = {
  setCollectionArchived: Collection.actions.setArchived,
  push,
};

@connect(
  null,
  mapDispatchToProps,
)
@Collection.load({
  id: (state, props) => props.params.collectionId,
})
@withRouter
class ArchiveCollectionModal extends React.Component {
  archive = async () => {
    const { setCollectionArchived, params } = this.props;
    await setCollectionArchived({ id: params.collectionId }, true);
  };
  close = () => {
    const { onClose, object, push } = this.props;
    // close the modal
    onClose();
    const parentId =
      object.effective_ancestors.length > 0
        ? object.effective_ancestors.pop().id
        : null;
    // redirect to the proper parent collection
    push(Urls.collection(parentId));
  };
  render() {
    return (
      <ArchiveModal
        title={t`Archive this collection?`}
        message={t`The dashboards, collections, and pulses in this collection will also be archived.`}
        onClose={this.close}
        onArchive={this.archive}
      />
    );
  }
}

export default ArchiveCollectionModal;
