import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() { 
  this.route('/');
  this.route('partytypes');
  this.route('bookparty');
  // partytype/{type name} : takes party name as param; sending to partytype route
  this.route('partytype', {path: '/partytype/:party'});
});
