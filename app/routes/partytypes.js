import Route from '@ember/routing/route';
import config from '../config/environment';

export default class PartytypesRoute extends Route {
    async model() {
        let response = await fetch(config.partyApiUrl + 'partytypes');
        let parsed = await response.json(); 
        
        return parsed;
    }
}
