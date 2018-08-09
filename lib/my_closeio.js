const async = require('async');
const sprintf = require("sprintf-js").sprintf;
const axios = require('axios');


var MyCloseIO = function(){
	var _this = this;
	var _closeio_key = "b09f099d31a97deee6d0e431e997e5bf396d1ec3c320be0b1c4d4801";
	var _base_url = "https://app.close.io/api/v1";
	
	const _custom_account_id = "custom.Company_ID_Unhidden";
	const _custom_nif = "custom.";
	const _custom_cae = "custom.";
	
	const _CLOSEIO_CONFIG = {
		auth: {
			username: _closeio_key,
			password: 'X'
		}
	}	

	this.listCustomFields = function(callback){
		var url = _base_url + "/custom_fields/lead/";		
		axios.get(url, _CLOSEIO_CONFIG).then(function(response){
			var results = {};
			// console.log(response.data);
			for (var i in response.data.data){
				var cf = response.data.data[i];
				// console.log(cf);
				results[cf.name] = cf.id;
			}

			response.total_results == 0 ? callback(null) : callback(results);			
		});		
	}

	this.getCustomFieldId = function(field){
		switch(field.toLowerCase()){
			case "nif": return _custom_nif;
			case "cae": return _custom_cae;
		}
		return null;
	}

	this.getLeadByAccountId = function(account_id, callback){
		var query = '?query=' + '"custom.Account Id"=' + account_id ;
		var url = _base_url + "/lead/" + query;
		// console.log(url);

		axios.get(url, _CLOSEIO_CONFIG).then(function(response){
			response.total_results == 0 ? callback(null) : callback(response.data.data[0]);			
		});
	}

	this.addContactToLead = function(lead_id, contact, callback){
		var url = _base_url + "/contact/";
		var params = contact;
		params.lead_id = lead_id;
		axios.post(url, params, _CLOSEIO_CONFIG ).then(function(response){ callback();}).catch(function(error){console.log(error.response);});
	}

	this.updateFieldsOnLead = function(lead_id, fields, callback){
		var url = _base_url + "/lead/" + lead_id + "/";
		axios.put(url, fields, _CLOSEIO_CONFIG ).then(function(response){ callback();}).catch(function(error){console.log(error.response);});
	}

	this.writeNoteOnLead = function(lead_id, note, callback){
		var url = _base_url + "/activity/note/";
		var params = { lead_id: lead_id, note: note};
		axios.post(url, params, _CLOSEIO_CONFIG ).then(function(response){ callback();}).catch(function(error){console.log(error.response);});
	}	

}


module.exports = exports = MyCloseIO;