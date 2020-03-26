import Model, { attr } from '@ember-data/model';

export default class PartyModel extends Model {
    @attr('string') partyType;

    @attr('string') attendees;
    @attr('date') startTime;
    @attr('date') endTime;

    @attr('string') movie;
    @attr('string') rating;
    @attr('string') runTime;

    @attr('string') waterTemp;

    @attr('string') dinner;
    @attr('string') dessert;


}
