$(function() {
    
    var uri = "http://localhost:8080/api/bodyCompost/mkouhei";
    $.getJSON(uri,
	      function(data){
		  var items = [];
	          var body_age = [];
	          var weight = [];
	          var basal_metabolism = [];
	          var bmi = [];
	          var skeltal_mascle_percentage = [];
	          var bodyfat_percentage = [];
	          var bodyfat_lv = [];
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
	                      case "body_age":
				  body_age.push(val2); break;
	                      case "weight":
				  weight.push(val2); break;
	                      case "basal_metabolism":
				  basal_metabolism.push(val2); break;
			      case "bmi":
				  bmi.push(val2); break;
			      case "skeltal_mascle_percentage":
				  skeltal_mascle_percentage.push(val2); break;
			      case "bodyfat_percentage":
				  bodyfat_percentage.push(val2); break;
			      case "bodyfat_lv":
				  bodyfat_lv.push(val2); break;
			      }
			  }
		      });
		  });

		  var arr_body_age = new Array(epoch.length);
		  var arr_weight = new Array(epoch.length);
		  var arr_bodyfat_percentage = new Array(epoch.length);
		  var arr_skeltal_mascle_percentage = new Array(epoch.length);
		  var arr_bmi = new Array(epoch.length);
		  var arr_bodyfat_lv = new Array(epoch.length);
		  var arr_basal_metabolism = new Array(epoch.length);
		  var arr_datetime = new Array(epoch.length);

		  for(var i = 0; i < epoch.length; i++) {
		      arr_datetime[i] = isoformat[i].replace("T", " ");
		      arr_body_age[i] = [arr_datetime[i], body_age[i]];
		      arr_weight[i] = [arr_datetime[i], weight[i]];
		      arr_bodyfat_percentage[i] = [arr_datetime[i], bodyfat_percentage[i]];
		      arr_skeltal_mascle_percentage[i] = [arr_datetime[i], skeltal_mascle_percentage[i]];
		      arr_bmi[i] = [arr_datetime[i], bmi[i]];
		      arr_bodyfat_lv[i] = [arr_datetime[i], bodyfat_lv[i]];
		      arr_basal_metabolism[i] = [arr_datetime[i], basal_metabolism[i]];
		  }
		  $.jqplot.config.enablePlugins = true;
		  $.jqplot('body_compost',
			   [
			       arr_body_age,
			       arr_weight,
			       arr_bodyfat_percentage,
			       arr_skeltal_mascle_percentage,
			       arr_bmi,
			       arr_bodyfat_lv,
			       arr_basal_metabolism
			   ],
			   { legend:{show:true, location:'e'},
			     title:'体組成計測',
			     seriesDefaults: {showMarker:true},
			     series:[{label:'体年齢', yaxis:'yaxis'},
				     {label:'体重', yaxis:'y2axis'},
				     {label:'体脂肪率', yaxis:'y3axis'},
				     {label:'骨格筋率', yaxis:'y4axis'},
				     {label:'BMI', yaxis:'y5axis'},
				     {label:'体脂肪レベル', yaxis:'y6axis'},
				     {label:'基礎代謝', yaxis:'y7axis'}
				    ],
	                     axesDefaults: {
				 useSeriesColor: true,
				 autoscale:true,
				 tickOptions:{fontSize:'xx-small'},
				 labelOptions:{fontSize:'xx-small'}
			     },
	                     axes:{xaxis:{renderer: $.jqplot.DateAxisRenderer,
					  tickInterval: '1 day',
					  rendererOptions:{tickRenderer:$.jqplot.CanvasAxisTickRenderer},
					  tickOptions:{
					      formatString:'%#m/%#d',
					      fontSize:'10px',
					      fontFamily:'Tahoma',
					      angle:-30
					  },
					  label:'日時(UTC)',
					 },
				   yaxis:{label:'体年齢(歳)',tickOptions:{formatString:'%d'}},
				   y2axis:{label:'体重(kg)'},
				   y3axis:{label:'体脂肪率(%)'},
				   y4axis:{label:'骨格筋率(%)'},
				   y5axis:{label:'BMI'},
				   y6axis:{label:'体脂肪レベル',tickOptions:{formatString:'%d'}},
				   y7axis:{label:'基礎代謝(kcal)',tickOptions:{formatString:'%d'}}
				  },
			     cursor: {
				 showVerticalLine: true,
				 showHorizontalLine: false,
				 showCursorLegend: true,
				 showTooltip: false
			     }
			   });
	      });
}); 
