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
		      arr_datetime[i] = isoformat[i].replace("T", " ");
		      arr_distance[i] = [arr_datetime[i], distance[i]];
		      arr_walk_mins[i] = [arr_datetime[i], walk_mins[i]];
		      arr_ex_steps[i] = [arr_datetime[i], ex_steps[i]];
		      arr_number_steps[i] = [arr_datetime[i], number_steps[i]];
		      arr_suff_mins[i] = [arr_datetime[i], suff_mins[i]];
		      arr_cal[i] = [arr_datetime[i], cal[i]];
		      arr_bodyfat_quantity[i] = [arr_datetime[i], bodyfat_quantity[i]];
		      arr_suff_steps[i] = [arr_datetime[i], suff_steps[i]];
		      arr_ex[i] = [arr_datetime[i], ex[i]];
		  }
		  
		  $.jqplot.config.enablePlugins = true;
		  // 歩数, しっかり歩数, EX歩数
		  $.jqplot('pedometer',
			   [arr_suff_steps,arr_ex_steps,arr_number_steps],
			   { legend:{show:true},
			     title:'歩数',
			     stackSeries:true,
			     seriesDefaults: {showMarker:false,fill:true,fillAlpha:0.8},
			     series:[{label:'しっかり歩数', yaxis:'y3axis'},
				     {label:'EX歩数', yaxis:'y2axis'},
				     {label:'歩数', yaxis:'yaxis'},
			    ],
	                     axesDefaults: {
				 useSeriesColor: false,
				 tickOptions:{fontSize:'xx-small'},
				 labelOptions:{fontSize:'xx-small'},
				 showTicks:false
			     },
	                     axes:{xaxis:{renderer: $.jqplot.DateAxisRenderer,
					  tickInterval:'3 day',
					  rendererOptions:{tickRenderer:$.jqplot.CanvasAxisTickRenderer},
					  tickOptions:{
					      formatString:'%#m/%#d',
					      fontSize:'10px',
					      fontFamily:'Tahoma',
					      angle:-30
					  },
					  label:'日付(UTC)'
					 },
				   y3axis:{tickOptions:{formatString:'%d'},min:0,max:50000},
				   y2axis:{tickOptions:{formatString:'%d'},min:0,max:50000},
				   yaxis:{showTicks:true,tickOptions:{formatString:'%d'},min:0,max:50000}
				  },
			     cursor: {
				 showVerticalLine: true,
				 showHorizontalLine: false,
				 showCursorLegend: false,
				 showTooltip: false
			     },
			     highlighter: {show:true}
			   });

		  // 距離, 歩行時間, しっかり歩行時間
		  $.jqplot('pedometer2',
			   [
			       arr_distance,
			       arr_walk_mins,
			       arr_suff_mins
			   ],
			   { legend:{show:true},
			     title:'距離・歩行時間',
			     stackSeries:false,
			     seriesDefaults: {showMarker:false,fill:true,fillAlpha:0.8},
			     series:[{label:'距離', yaxis:'yaxis',fill:false},
				     {label:'歩行時間', yaxis:'y2axis'},
				     {label:'しっかり歩行時間', yaxis:'y3axis'}
				    ],
	                     axesDefaults: {
				 useSeriesColor: false,
				 autoscale:true,
				 tickOptions:{fontSize:'xx-small'},
				 labelOptions:{fontSize:'xx-small'}
			     },
	                     axes:{xaxis:{renderer: $.jqplot.DateAxisRenderer,
					  tickInterval:'3 day',
					  rendererOptions:{tickRenderer:$.jqplot.CanvasAxisTickRenderer},
					  tickOptions:{
					      formatString:'%#m/%#d',
					      fontSize:'10px',
					      fontFamily:'Tahoma',
					      angle:-30
					  },
					  label:'日付(UTC)'
					 },
				   yaxis:{label:'距離(km)',min:0},
				   y2axis:{label:'歩行時間(分)',tickOptions:{formatString:'%d'},min:0,max:500},
				   y3axis:{showTicks:false,tickOptions:{formatString:'%d'},min:0,max:500}
				  },
			     cursor: {
				 showVerticalLine: true,
				 showHorizontalLine: false,
				 showCursorLegend: false,
				 showTooltip: false
			     },
			     highlighter: {show:true}
			   });

		  // EX量, 消費カロリー, 燃焼脂肪量
		  $.jqplot('pedometer3',
			   [
			       arr_ex,
			       arr_cal,
			       arr_bodyfat_quantity
			   ],
			   { legend:{show:false},
			     title:'EX量、消費カロリー、燃焼脂肪量',
			     stackSeries:true,
			     seriesDefaults: {showMarker:false,fill:false},
			     series:[{label:'EX量', yaxis:'yaxis'},
				     {label:'消費カロリー', yaxis:'y2axis'},
				     {label:'燃焼脂肪量', yaxis:'y3axis'}
				    ],
	                     axesDefaults: {
				 useSeriesColor: true,
				 autoscale:true,
				 tickOptions:{fontSize:'xx-small'},
				 labelOptions:{fontSize:'xx-small'}
			     },
	                     axes:{xaxis:{renderer: $.jqplot.DateAxisRenderer,
					  tickInterval:'3 day',
					  rendererOptions:{tickRenderer:$.jqplot.CanvasAxisTickRenderer},
					  tickOptions:{
					      formatString:'%#m/%#d',
					      fontSize:'10px',
					      fontFamily:'Tahoma',
					      angle:-30
					  },
					  label:'日付(UTC)'
					 },
				   yaxis:{label:'EX量(Ex)',min:0},
				   y2axis:{label:'消費カロリー(kcal)',tickOptions:{formatString:'%d'},min:0},
				   y3axis:{label:'燃焼脂肪量(g)',min:0}
				  },
			     cursor: {
				 showVerticalLine: true,
				 showHorizontalLine: false,
				 showCursorLegend: false,
				 showTooltip: false
			     },
			     highlighter: {show:true}
			   });
	      });
}); 
