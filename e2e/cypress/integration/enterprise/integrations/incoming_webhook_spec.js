// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. # Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

// Group: @incoming_webhook

import {
    enableElasticSearch,
} from '../elasticsearch_autocomplete/helpers';

describe('Incoming webhook', () => {
    let testTeam;
    let testChannel;
    let incomingWebhook;
    let sysadminUser;

    before(() => {

        // # Create and visit new channel and create incoming webhook
        cy.apiInitSetup().then(({team, channel, user}) => {
            testTeam = team;
            testChannel = channel;

            const newIncomingHook = {
                channel_id: channel.id,
                channel_locked: false,
                description: 'Incoming webhook - basic formatting',
                display_name: 'basic-formatting',
            };

            cy.apiCreateWebhook(newIncomingHook).then((hook) => {
                incomingWebhook = hook;
            });
        });

        cy.apiGetMe().then(me => {
            sysadminUser = me.user;
        });

        enableElasticSearch();
    });

    it('MM-T633 Text in Slack-style attachment is searchable', () => {
        const id = 'MM-T633';

        const payload = {
            "title": "Title", "attachments": [{
                "type": "slack_attachment", "color": "#7CD197", "fields": [{"short": false, "title": "Area", "value": "This is a test post from the Integrations tab of release testing that will be deleted by someone who has the admin level permissions to do so."}],
                text: `${id} This is the text of the attachment. This text should be searchable. Findme.`
            }],
        };

        cy.visit(`/${testTeam.name}/channels/${testChannel.name}`);

        cy.postIncomingWebhook({url: incomingWebhook.url, data: payload});

        cy.get('#searchBox').wait(100).type('findme').type('{enter}', {force: true});

        cy.get('#search-items-container').within((el) => {
            cy.get('.attachment__body').should('contain', id);
            cy.get('.attachment__body').should('contain', 'Findme.');
        })
    });
});
