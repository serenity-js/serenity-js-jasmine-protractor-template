import 'jasmine';

import { Ensure, includes } from '@serenity-js/assertions';
import { actorCalled, engage } from '@serenity-js/core';
import { Navigate, Page } from '@serenity-js/web';
import { UseAngular } from '@serenity-js/protractor';

import { Actors } from '../src';

describe('serenity-js.org website', () => {

    beforeEach(() => engage(new Actors()));

    it(`tells people what they're reading @wip`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            Ensure.that(Page.current().title(), includes('Serenity/JS')),
        ));
});
