/**
 * Read the json data from the url
 */
var onco=angular.module("myapp",[])
	onco.factory('PatientData', function($http,$q){
		var def =  $q.defer();

		$http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
		    .error(function(error){
				alert("error: Data is not loaded");
		    })

		return def.promise;
	});
