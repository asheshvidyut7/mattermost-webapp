// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {incrementAnnouncementBarCount, decrementAnnouncementBarCount} from 'src/actions/views/announcement_bar';
import {getAnnouncementBarCount} from 'src/selectors/views/announcement_bar';

import AnnouncementBar from './announcement_bar.jsx';

function mapStateToProps(state) {
    return {
        announcementBarCount: getAnnouncementBarCount(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            incrementAnnouncementBarCount,
            decrementAnnouncementBarCount,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBar);
