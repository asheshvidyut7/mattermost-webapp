// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {
    getCurrentChannel,
    getMyCurrentChannelMembership,
    isCurrentChannelReadOnly,
} from 'mattermost-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl} from 'mattermost-redux/selectors/entities/teams';
import {isChannelMuted} from 'mattermost-redux/utils/channel_utils';

import {
    closeRightHandSide as closeRhs,
    closeMenu as closeRhsMenu,
} from 'src/actions/views/rhs';
import {close as closeLhs} from 'src/actions/views/lhs';

import {getIsRhsOpen} from 'src/selectors/rhs';

import ChannelHeaderMobile from './channel_header_mobile';

const isCurrentChannelMuted = createSelector(
    getMyCurrentChannelMembership,
    (membership) => isChannelMuted(membership),
);

const mapStateToProps = (state) => ({
    user: getCurrentUser(state),
    channel: getCurrentChannel(state),
    isMuted: isCurrentChannelMuted(state),
    isReadOnly: isCurrentChannelReadOnly(state),
    isRHSOpen: getIsRhsOpen(state),
    currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        closeLhs,
        closeRhs,
        closeRhsMenu,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelHeaderMobile);
