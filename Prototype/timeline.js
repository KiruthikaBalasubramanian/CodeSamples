/**
 * plot treatment span and date of biopsy in a timeline
 */

	onco.controller('timelineController',function($scope,PatientData){
		PatientData.then(function(data){
		    $scope.patientInfo = data;
		    var events = [];
		    // Reading treatment dates from the data
		    for(var i=0; i< data.treatmentList.length; i++){
		      $scope.startDay = data.treatmentList[i].startDate.substring(4,6);
		      $scope.startMonth = new Date(data.treatmentList[i].startDate.substring(0,4)+'-1-01').getMonth();
		      $scope.startYear = data.treatmentList[i].startDate.substring(8,12);
		      $scope.endDay = data.treatmentList[i].endDate.substring(4,6);
		      $scope.endMonth = new Date(data.treatmentList[i].endDate.substring(0,4)+'-1-01').getMonth();    
		      $scope.endYear = data.treatmentList[i].endDate.substring(8,12);

		      events.push({dates: [new Date($scope.startYear, $scope.startMonth, $scope.startDay),new Date($scope.endYear, $scope.endMonth, $scope.endDay)], title: data.treatmentList[i].treatmentDescription, section: i});

		    }
		    //Reading biopsy dates from the data
		    for(var j=0; j< data.genomicProfileList.length; j++){
			      $scope.biostartDay = data.genomicProfileList[j].dateOfBiopsy.substring(4,6);
			      $scope.biostartMonth = new Date(data.genomicProfileList[j].dateOfBiopsy.substring(0,4)+'-1-01').getMonth();
			      $scope.biostartYear = data.genomicProfileList[j].dateOfBiopsy.substring(8,12);
			      events.push({dates: [new Date($scope.biostartYear, $scope.biostartMonth, $scope.biostartDay),new Date($scope.biostartYear, $scope.biostartMonth, $scope.biostartDay)], title:data.genomicProfileList[j].tissueType, section:j});
		    }

		    $scope.startTimelineDay = events[0].dates[0].toString().substring(8,10);
		    $scope.startTimelineYear = events[0].dates[0].toString().substring(11,15);
		    $scope.startTimelineMonth = new Date(events[0].dates[0].toString().substring(4,7)+'-1-01').getMonth();

           //Plotting the dates in the timeline using chronoline
		    var timeline1 = new Chronoline(document.getElementById("target1"), events,{
				visibleSpan: DAY_IN_MILLISECONDS * 366,
		        animated: true,
		        tooltips: true,
		        defaultStartDate: new Date($scope.startTimelineYear, $scope.startTimelineMonth-1, $scope.startTimelineDay),
		        sectionLabelAttrs: {'fill': '#997e3d', 'font-weight': 'bold'},
		        labelInterval: isHalfMonth,
		        hashInterval: isHalfMonth,
		        scrollLeft: prevQuarter,
		        scrollRight: nextQuarter,
		        floatingSubLabels: false,
		        draggable:true
		    });
		   
		});

	});
