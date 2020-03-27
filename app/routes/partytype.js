import Route from '@ember/routing/route';
import config from '../config/environment';

export default class PartytypeRoute extends Route {
    async model(params) {
        let response = await fetch('http://frontend-api-exercise.herokuapp.com/partytype/' + params.party);
        let parsed = await response.json();
        parsed.partyType = params.party;
        
        return parsed;
        
    }
}
