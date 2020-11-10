// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {ModalIdentifiers} from 'src/utils/constants';
import {isModalOpen} from 'src/selectors/views/modals';

import {GlobalState} from 'src/types/store';

import TeamSettingsModal from './team_settings_modal';

function mapStateToProps(state: GlobalState) {
    const modalId = ModalIdentifiers.TEAM_SETTINGS;
    return {
        show: isModalOpen(state, modalId),
    };
}

export default connect(mapStateToProps)(TeamSettingsModal);
