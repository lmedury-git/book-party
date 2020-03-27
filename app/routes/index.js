import Route from '@ember/routing/route';
import config from '../config/environment';

export default class IndexRoute extends Route {
    async model() {
        let response = await fetch('http://frontend-api-exercise.herokuapp.com/partytypes');
        let parsed = await response.json(); 
        
        return parsed;
    }
}
