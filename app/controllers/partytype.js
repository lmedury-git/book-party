import Controller from '@ember/controller';
import { action } from '@ember/object';
import config from '../config/environment';

export default class PartytypeController extends Controller {
   
    check() {
        $('.error-text').remove();
        $.validator.addMethod("greaterThan", 
            function(value, element, params) {
                    return new Date(value) > new Date($(params).val());
            },'Must be greater than {0}.');

        $("#book-form").validate({
            rules: {
                attendees: "required",
                movie: "required",
                runtime: "required",
                water_temp: "required",
                start_time: "required",
                end_time: { "required": true,
                            "greaterThan": "#start_time"
                             }
                },
                messages: {
                    attendees: "Enter at least one attendee",
                    movie: "Movie name is required",
                    runtime: " Runtime is required",
                    water_temp: "Water temperature is required",
                    start_time: "Start Time is required",
                    end_time: { "required": "End Time is required",
                    "greaterThan": "End time must be greater than start time"
                        }
                },
                errorPlacement: function(error, element) {
                    // add error message only if not already added
                    if($(element[0]).hasClass('error') && !$(element[0]).parent().find('div').hasClass('error-text')) {
                        $(element[0]).parent().append('<div class="error-text col-md-4">' + error[0].innerText + '</div>');
                    }
            }
        });
    }  
    
    submitForm(partyObj) {
       
        var partyType = partyObj.partyType;
        delete partyObj.partyType;
        Object.keys(partyObj).forEach(function(k){
            partyObj[k] = (k == "rating" ? $('input[name="ratg"]:checked').val() : document.getElementById(k).value); // set data object with form inputs
        });
        // prepare data 
        if(partyObj.water_temp) {
            partyObj.water_temp = parseInt(partyObj.water_temp);
        }
        if(partyObj.runtime) {
            partyObj.runtime = parseInt(partyObj.runtime);
        }
        partyObj.attendees = (document.getElementById('attendees').value).split(',');
        partyObj.start_time = new Date(partyObj.start_time).toISOString();
        partyObj.end_time = new Date(partyObj.end_time).toISOString();
        // POST
        const url = config.partyApiUrl + 'bookpartyprod';
        const party = { 
            party_type: partyType,
            data: partyObj
        }; 
      
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(party),
            dataType: 'json'
        })
        .then(function (data) { 
            // returns UUID - use this to display success message; return to main page
            return data; 
        })
        .then( (data) => { 
            // route to homepage
           if(data.status == '200') {
                var self = this;
                self.transitionToRoute('partytypes');
            }
        });
    }
    
    @action
    bookParty(e) {
        e.preventDefault();
        const partyObj = this.get('model');
        // validate form
        this.check();
        //submit if valid
        if($("#book-form").valid()) {
            this.submitForm(partyObj);
        }
    }
}


