import 'jasmine';
import { serenity } from '@serenity-js/core';
import { Actors } from '../../src';

beforeEach(function () {
    this.stage = serenity.callToStageFor(new Actors());
});
