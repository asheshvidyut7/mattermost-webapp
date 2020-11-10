// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    closeRightHandSide,
    toggleRhsExpanded,
} from 'src/actions/views/rhs';
import {getIsRhsExpanded} from 'src/selectors/rhs';

import SearchResultsHeader from './search_results_header.jsx';

function mapStateToProps(state) {
    return {
        isExpanded: getIsRhsExpanded(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeRightHandSide,
            toggleRhsExpanded,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsHeader);
