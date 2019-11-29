import { Ensure, includes } from '@serenity-js/assertions';
import { WithStage } from '@serenity-js/core';
import { Navigate, UseAngular, Website } from '@serenity-js/protractor';

describe('serenity-js.org website', () => {

    it(`tells people what they're reading @wip`, function (this: WithStage) {
        return this.stage.theActorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            Ensure.that(Website.title(), includes('Serenity/JS')),
        );
    });
});
