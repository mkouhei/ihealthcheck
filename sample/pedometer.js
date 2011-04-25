$(function() {

    var uri = "http://localhost:8080/api/pedometer/mkouhei";
    $.getJSON(uri,
	      function(data){
		  var items = [];
	          var distance = [];
	          var walk_mins = [];
	          var ex_steps = [];
	          var number_steps = [];
	          var suff_mins = [];
	          var cal = [];
	          var bodyfat_quantity = [];
		  var suff_steps = [];
		  var ex = []
	          var ctime = [];
	          var hour = [];
	          var isoweekday = [];
	          var month = [];
	          var second = [];
	          var microsecond = [];
	          var isocalendar = [];
	          var timetuple = [];
	          var year = [];
	          var epoch = [];
	          var isoformat = [];
	          var day = [];
	          var minute = [];
	    
	          $.each(data, function(key, val) {
		      $.each(val, function(key2, val2) {
			  if (key2 == "measure_datetime") {
	                      $.each(val2, function(key3, val3) {
				  switch(key3) {
				  case "epoch":
				      epoch.push(val3); break;
				  case "ctime":
				      ctime.push(val3); break;
				  case "isocalendar":
				      isocalendar.push(val3); break;
				  case "isoformat":
				      isoformat.push(val3); break;
				  case "day":
				      day.push(val3); break;
				  case "month":
				      month.push(val3); break;
				  case "year":
				      year.push(val3); break;
				  }
	                      });
			  } else { 
	                      switch(key2) {
	                      case "distance":
				  distance.push(val2); break;
	                      case "walk_mins":
				  walk_mins.push(val2); break;
	                      case "ex_steps":
				  ex_steps.push(val2); break;
			      case "number_steps":
				  number_steps.push(val2); break;
			      case "suff_mins":
				  suff_mins.push(val2); break;
			      case "cal":
				  cal.push(val2); break;
			      case "bodyfat_quantity":
				  bodyfat_quantity.push(val2); break;
			      case "suff_steps":
				  suff_steps.push(val2); break;
			      case "ex":
				  ex.push(val2); break;
			      }
			  }
		      });
		  });
		  var arr_distance = new Array(epoch.length);
		  var arr_walk_mins = new Array(epoch.length);
		  var arr_ex_steps = new Array(epoch.length);
		  var arr_number_steps = new Array(epoch.length);
		  var arr_suff_mins = new Array(epoch.length);
		  var arr_cal = new Array(epoch.length);
		  var arr_bodyfat_quantity = new Array(epoch.length);
		  var arr_suff_steps = new Array(epoch.length);
		  var arr_ex = new Array(epoch.length);
		  var arr_datetime = new Array(epoch.length);
		  for(var i = 0; i < epoch.length; i++) {
		      arr_distance[i] = [epoch[i], distance[i]];
		      arr_walk_mins[i] = [epoch[i], walk_mins[i]];
		      arr_ex_steps[i] = [epoch[i], ex_steps[i]];
		      arr_number_steps[i] = [epoch[i], number_steps[i]];
		      arr_suff_mins[i] = [epoch[i], suff_mins[i]];
		      arr_cal[i] = [epoch[i], cal[i]];
		      arr_bodyfat_quantity[i] = [epoch[i], bodyfat_quantity[i]];
		      arr_suff_steps[i] = [epoch[i], suff_steps[i]];
		      arr_ex[i] = [epoch[i], ex[i]];
		      // xaxis format of y value.
		      arr_datetime[i] = [epoch[i], year[i]+"/"+month[i]+"/"+day[i]];
		  }
		  
		  $.jqplot.config.enablePlugins = true;
		  $.jqplot('pedometer',
			   [
			       arr_distance,
			       arr_walk_mins,
			       arr_ex_steps,
			       arr_number_steps,
			       arr_suff_mins,
			       arr_cal,
			       arr_bodyfat_quantity,
			       arr_suff_steps,
			       arr_ex
			   ],
			   { title:'歩数計',
			     seriesDefault: {showMarker:false},
			     series:[{},
				     {yaxis:'y2axis'},
				     {yaxis:'y3axis'},
				     {yaxis:'y4axis'},
				     {yaxis:'y5axis'},
				     {yaxis:'y6axis'},
				     {yaxis:'y7axis'},
				     {yaxis:'y8axis'},
				     {yaxis:'y9axis'}
				    ],
	                     axesDefaults: {useSeriesColor: true, autoscale:true},
	                     axes:{xaxis:{ticks:arr_datetime},
				   yaxis:{label:'距離(km)'},
				   y2axis:{label:'歩行時間(分)',tickOptions:{formatString:'%d'}},
				   y3axis:{label:'EX歩数',tickOptions:{formatString:'%d'}},
				   y4axis:{label:'歩数',tickOptions:{formatString:'%d'}},
				   y5axis:{label:'しっかり歩行時間(分)',tickOptions:{formatString:'%d'}},
				   y6axis:{label:'消費カロリー(kcal)',tickOptions:{formatString:'%d'}},
				   y7axis:{label:'燃焼脂肪量(g)'},
				   y8axis:{label:'しっかり歩数',tickOptions:{formatString:'%d'}},
				   y9axis:{label:'EX量(Ex)'}
				  }
			   });
	      });
}); 
