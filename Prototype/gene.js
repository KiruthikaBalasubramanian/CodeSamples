/**
 * To  display the mutated genes using d3js
 */
onco.controller('geneController',function($scope,PatientData){
	$scope.method={};
    $scope.method.geneList=[];
    $scope.method.biopsy=[];
	PatientData.then(function(data){
		$scope.method.patient=data;
		for (var i = 0; i < $scope.method.patient.genomicProfileList.length; i++) {
		     for (var j = 0; j < $scope.method.patient.genomicProfileList[i].mutationList.length; j++) {
		       $scope.method.geneList.push($scope.method.patient.genomicProfileList[i].mutationList[j].geneSymbol);
		     };
		};
		 var tooltip = d3.select("body .container-fluid").append("div").attr("class","tooltip")
		  .style("position","absolute")
		  .style("padding","0 10px")
		  .style("background","white")
		  .style("opacity",0);
		  //Redundant genes are removed
		$scope.method.unique = function(m){
		    var prev = m[0];
		    var m_sort = [];
		    m_sort.push(prev);
		    for (var i = 0; i < m.length; i++) {
		      if(m[i] != prev){
		        m_sort.push(m[i]);
		        prev = m[i];
		      }
		    };
		    return m_sort;
		 }
		 $scope.method.geneList = $scope.method.unique($scope.method.geneList.sort());
		//making data according to the biopsies in the order of geneList
		  var biopsyInfo = [];
		  for (var i = 0; i < $scope.method.patient.genomicProfileList.length; i++) {
		    biopsyInfo.push({biopsy:i+1,gene:[]});
		    for (var j = 0; j < $scope.method.geneList.length; j++) {
		     biopsyInfo[i].gene.push({gene:$scope.method.geneList[j],status:"NP"})
		       for (var k = 0; k < $scope.method.patient.genomicProfileList[i].mutationList.length; k++) {
		        if($scope.method.geneList[j] == $scope.method.patient.genomicProfileList[i].mutationList[k].geneSymbol){
		          biopsyInfo[i].gene[j].status = "P";
		      }
		    }
		  }
		}
		//drawing d3 graphs
		var margin = {top:20,bottom:20,left:20,right:0};
		var w = 550 - margin.left - margin.right;
		var h = 8000 - margin.top - margin.bottom;
        
		// x axis text 
		d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+50)+")")
		   .selectAll("text").data(biopsyInfo).enter().append("text").attr("id","geneinfotext").text(function(d,i){ return "Biopsy "+(i+1);}).attr({
		    x:0,
		    y:function(d,i){ return i*100;},
		    "font-size":"14px",
		    "font-weight":"bold",
		});
		$scope.drawScatterNorm = function(k){
			var r = 12;
			// y axis text 
			d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+margin.left+","+(margin.top+104)+")")
			.selectAll("text").data($scope.method.geneList).enter().append("text").text(function(d){ return d;}).attr({
			    x:0,
			    y:function(d,i){return i*30; },
			    "font-size":"14px",
		    });
			//drawing circles
			d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+100)+")")
			    .selectAll("circle").data(biopsyInfo[k].gene).enter().append("circle").attr({
			        cx:k*100,
			        cy:function(d,i){ return i*30; },
			        r:r,
			        "fill":function(d){
						if(d.status == "P"){
							return "#000000";
						} else {
							return "#CCCCCC";
						}
			        }
			    }) 
			    .on("mouseover",function(d){
			        d3.select(this).style("opacity",".8");
			        tooltip.style("opacity","1")
			        tooltip.html(d.gene)
			        .style("left",(d3.event.pageX)+"px")
			        .style("top",(d3.event.pageY)-15+"px")
			    })
			    .on("mouseout",function(d){
			        d3.select(this).style("opacity","1");
			        tooltip.style("opacity","0")
			    });
			}
		    //calling d3 functions
		    for (var k = 0; k < $scope.method.patient.genomicProfileList.length; k++) {
		    $scope.drawScatterNorm(k);
		    };

	});
});
