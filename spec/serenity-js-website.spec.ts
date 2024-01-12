import 'jasmine';

import { Ensure, includes } from '@serenity-js/assertions';
import { actorCalled, engage } from '@serenity-js/core';
import { UseAngular } from '@serenity-js/protractor';
import { Navigate, Page } from '@serenity-js/web';

import { Actors } from '../src';

describe('serenity-js website', () => {

    beforeEach(() => engage(new Actors()));

    it(`tells people what they're reading @wip`, () =>
        actorCalled('Jasmine').attemptsTo(
            UseAngular.disableSynchronisation(),
            Navigate.to('https://serenity-js.org'),
            Ensure.that(Page.current().title(), includes('Serenity/JS')),
        ));
});
