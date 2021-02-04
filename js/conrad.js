var conrad = angular.module('conrad', []);

function conradController($scope, $http) 
{
	var _model = "set TSS;\r\nset HOURS;\r\nset SHIFTS;\r\n\r\nparam IDEAL_NUMBER_OF_TSS{i in HOURS};\r\nparam M;\r\nparam MAX_SHIFTS;\r\nparam MIN_TSS;\r\n\r\nvar tss_working_at_hour{h in HOURS} >= 0, integer;\r\nvar tss_working_at{t in TSS, s in SHIFTS} >= 0, binary;\r\nvar y{h in HOURS} >= 0, binary;\r\nvar shift_active{s in SHIFTS} >= 0, binary;\r\nvar abs_tss_difference{h in HOURS} >= 0, integer;\r\n\r\nminimize z: sum{h in HOURS} abs_tss_difference[h];\r\n\r\ns.t. everyone_works_one_shift{t in TSS}: sum{s in SHIFTS} tss_working_at[t,s] = 1;\r\ns.t. full_coverage{h in HOURS}: tss_working_at_hour[h] >= MIN_TSS;\r\ns.t. active_shifts{s in SHIFTS}: sum{t in TSS}(tss_working_at[t,s]) <= M * shift_active[s]; \r\ns.t. max_shifts: sum{s in SHIFTS} shift_active[s] <= MAX_SHIFTS;\r\ns.t. abs_condition_left{h in HOURS}:  tss_working_at_hour[h] >= - M * (1 - y[h]) + IDEAL_NUMBER_OF_TSS[h];\r\ns.t. abs_condition_right{h in HOURS}: tss_working_at_hour[h] <= y[h] * M + IDEAL_NUMBER_OF_TSS[h];\r\ns.t. abs_lte{h in HOURS}: (IDEAL_NUMBER_OF_TSS[h] - tss_working_at_hour[h] - M * y[h]) <= abs_tss_difference[h];\r\ns.t. abs_gte{h in HOURS}: (tss_working_at_hour[h] - IDEAL_NUMBER_OF_TSS[h] - M * (1 - y[h])) <= abs_tss_difference[h];\r\n\r\ns.t. tss_per_hour_00: tss_working_at_hour[00] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_01: tss_working_at_hour[01] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_02: tss_working_at_hour[02] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_03: tss_working_at_hour[03] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_04: tss_working_at_hour[04] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_05: tss_working_at_hour[05] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_06: tss_working_at_hour[06] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_07: tss_working_at_hour[07] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_23\"]);\r\n\t tss_per_hour_08: tss_working_at_hour[08] = sum{t in TSS} (tss_working_at[t, \"shift_0\"] + tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"]+ tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"]);\r\n\t tss_per_hour_09: tss_working_at_hour[09] = sum{t in TSS} (tss_working_at[t, \"shift_1\"] + tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"]);\r\n\t tss_per_hour_10: tss_working_at_hour[10] = sum{t in TSS} (tss_working_at[t, \"shift_2\"] + tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"]);\r\n\t tss_per_hour_11: tss_working_at_hour[11] = sum{t in TSS} (tss_working_at[t, \"shift_3\"] + tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"]);\r\n\t tss_per_hour_12: tss_working_at_hour[12] = sum{t in TSS} (tss_working_at[t, \"shift_4\"] + tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"]);\r\n\t tss_per_hour_13: tss_working_at_hour[13] = sum{t in TSS} (tss_working_at[t, \"shift_5\"] + tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"]);\r\n\t tss_per_hour_14: tss_working_at_hour[14] = sum{t in TSS} (tss_working_at[t, \"shift_6\"] + tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"]);\r\n\t tss_per_hour_15: tss_working_at_hour[15] = sum{t in TSS} (tss_working_at[t, \"shift_7\"] + tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"]);\r\n\t tss_per_hour_16: tss_working_at_hour[16] = sum{t in TSS} (tss_working_at[t, \"shift_8\"] + tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"]);\r\n\t tss_per_hour_17: tss_working_at_hour[17] = sum{t in TSS} (tss_working_at[t, \"shift_9\"] + tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"]);\r\n\t tss_per_hour_18: tss_working_at_hour[18] = sum{t in TSS} (tss_working_at[t, \"shift_10\"] + tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"]);\r\n\t tss_per_hour_19: tss_working_at_hour[19] = sum{t in TSS} (tss_working_at[t, \"shift_11\"] + tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"]);\r\n\t tss_per_hour_20: tss_working_at_hour[20] = sum{t in TSS} (tss_working_at[t, \"shift_12\"] + tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"]);\r\n\t tss_per_hour_21: tss_working_at_hour[21] = sum{t in TSS} (tss_working_at[t, \"shift_13\"] + tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"]);\r\n\t tss_per_hour_22: tss_working_at_hour[22] = sum{t in TSS} (tss_working_at[t, \"shift_14\"] + tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"]);\r\n\t tss_per_hour_23: tss_working_at_hour[23] = sum{t in TSS} (tss_working_at[t, \"shift_15\"] + tss_working_at[t, \"shift_16\"] + tss_working_at[t, \"shift_17\"] + tss_working_at[t, \"shift_18\"] + tss_working_at[t, \"shift_19\"] + tss_working_at[t, \"shift_20\"] + tss_working_at[t, \"shift_21\"] + tss_working_at[t, \"shift_22\"] + tss_working_at[t, \"shift_23\"]);\r\n\r\n#TMR\r\n\r\n#{exclude_shift_0}s.t. exclude_shift0{t in TSS}: tss_working_at[t, \"shift_0\"] = 0;\r\n#{exclude_shift_1}s.t. exclude_shift1{t in TSS}: tss_working_at[t, \"shift_1\"] = 0;\r\n#{exclude_shift_2}s.t. exclude_shift2{t in TSS}: tss_working_at[t, \"shift_2\"] = 0;\r\n#{exclude_shift_3}s.t. exclude_shift3{t in TSS}: tss_working_at[t, \"shift_3\"] = 0;\r\n#{exclude_shift_4}s.t. exclude_shift4{t in TSS}: tss_working_at[t, \"shift_4\"] = 0;\r\n#{exclude_shift_5}s.t. exclude_shift5{t in TSS}: tss_working_at[t, \"shift_5\"] = 0;\r\n#{exclude_shift_6}s.t. exclude_shift6{t in TSS}: tss_working_at[t, \"shift_6\"] = 0;\r\n#{exclude_shift_7}s.t. exclude_shift7{t in TSS}: tss_working_at[t, \"shift_7\"] = 0;\r\n#{exclude_shift_8}s.t. exclude_shift8{t in TSS}: tss_working_at[t, \"shift_8\"] = 0;\r\n#{exclude_shift_9}s.t. exclude_shift9{t in TSS}: tss_working_at[t, \"shift_9\"] = 0;\r\n#{exclude_shift_10}s.t. exclude_shift10{t in TSS}: tss_working_at[t, \"shift_10\"] = 0;\r\n#{exclude_shift_11}s.t. exclude_shift11{t in TSS}: tss_working_at[t, \"shift_11\"] = 0;\r\n#{exclude_shift_12}s.t. exclude_shift12{t in TSS}: tss_working_at[t, \"shift_12\"] = 0;\r\n#{exclude_shift_13}s.t. exclude_shift13{t in TSS}: tss_working_at[t, \"shift_13\"] = 0;\r\n#{exclude_shift_14}s.t. exclude_shift14{t in TSS}: tss_working_at[t, \"shift_14\"] = 0;\r\n#{exclude_shift_15}s.t. exclude_shift15{t in TSS}: tss_working_at[t, \"shift_15\"] = 0;\r\n#{exclude_shift_16}s.t. exclude_shift16{t in TSS}: tss_working_at[t, \"shift_16\"] = 0;\r\n#{exclude_shift_17}s.t. exclude_shift17{t in TSS}: tss_working_at[t, \"shift_17\"] = 0;\r\n#{exclude_shift_18}s.t. exclude_shift18{t in TSS}: tss_working_at[t, \"shift_18\"] = 0;\r\n#{exclude_shift_19}s.t. exclude_shift19{t in TSS}: tss_working_at[t, \"shift_19\"] = 0;\r\n#{exclude_shift_20}s.t. exclude_shift20{t in TSS}: tss_working_at[t, \"shift_20\"] = 0;\r\n#{exclude_shift_21}s.t. exclude_shift21{t in TSS}: tss_working_at[t, \"shift_21\"] = 0;\r\n#{exclude_shift_22}s.t. exclude_shift22{t in TSS}: tss_working_at[t, \"shift_22\"] = 0;\r\n#{exclude_shift_23}s.t. exclude_shift23{t in TSS}: tss_working_at[t, \"shift_23\"] = 0; \r\n\r\nsolve;\r\n\r\nprintf \"Achieved distribution: [\";\r\nprintf {h in HOURS} \"%s,\", tss_working_at_hour[h];\r\nprintf \"]\\n\";\r\nprintf {t in TSS, s in SHIFTS: tss_working_at[t,s]} \"%s => %s\\n\", t, s;\r\n\r\ndata;\r\n\r\nset SHIFTS := shift_0 shift_1 shift_2 shift_3 shift_4 shift_5 shift_6 shift_7 shift_8 shift_9 shift_10 shift_11 shift_12 shift_13 shift_14 shift_15 shift_16 shift_17 shift_18 shift_19 shift_20 shift_21 shift_22 shift_23;\r\n\r\nset HOURS := 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23;\r\n\r\nset TSS := ${agents};\r\n\r\nparam M := 1000;\r\nparam MAX_SHIFTS := ${max_shifts};\r\nparam MIN_TSS := ${min_agents};\r\n\r\nparam IDEAL_NUMBER_OF_TSS := \r\n\t0\t${ideal_0}\r\n\t1\t${ideal_1}\r\n\t2\t${ideal_2}\r\n\t3\t${ideal_3}\r\n\t4\t${ideal_4}\r\n\t5\t${ideal_5}\r\n\t6\t${ideal_6}\r\n\t7\t${ideal_7}\r\n\t8\t${ideal_8}\r\n\t9\t${ideal_9}\r\n\t10\t${ideal_10}\r\n\t11\t${ideal_11}\r\n\t12\t${ideal_12}\r\n\t13\t${ideal_13}\r\n\t14\t${ideal_14}\r\n\t15\t${ideal_15}\r\n\t16\t${ideal_16}\r\n\t17\t${ideal_17}\r\n\t18\t${ideal_18}\r\n\t19\t${ideal_19}\r\n\t20\t${ideal_20}\r\n\t21\t${ideal_21}\r\n\t22\t${ideal_22}\r\n\t23\t${ideal_23};\r\n\r\nend;";

	var hermes_quotes = ['Sweet lion of Zion!', 'Sweet manatee of Galilee!', 'Sweet llamas of the Bahamas!', 'Sweet gorilla of Manila!', 'Sweet something... of... someplace...', 'Great cow of Moscow!', 'Sweet giant anteater of Saint Anita!', 'Sweet ghost of Babylon!', 'Sacred boa of West and Eastern Samoa!', 'Sacred hog of Prague!', 'Cursed bacteria of Liberia!', 'Sweet guinea pig of Winnipeg!', 'Great bonda of Uganda!', 'Sweet three-toed sloth of the ice planet Hoth!', 'Sweet honey bee of infinity!', 'Sweet yeti of the Serengeti!', 'Sweet bongo of the Congo!', 'Sweet squid of Madrid!', 'Sweet kookaburra of Edinburgh!', 'Sweet topology of cosmology!', 'Sweet coincidence of Port-au-Prince', 'Sweet orca of Mallorca!', 'Sweet candelabra of Le Havre, LaBarbara!'];

	function getRandInt(min, max) 
	{
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function Restriction(agent_id, restricted_shifts, can_work)
	{
		if (agent_id == undefined)
			agent_id = "";

		if (restricted_shifts == undefined)
			restricted_shifts = "";

		if (can_work == undefined)
			can_work = "yes";

		this.agent_id = agent_id;
		this.restricted_shifts = restricted_shifts;
		this.can_work = can_work;
	}

	Restriction.prototype.toString = function() 
	{
	    return '{agent_id:' + this.agent_id + ', restricted_shifts:' + this.restricted_shifts + ', can_work:' + this.can_work + '}';
	};

	$scope.restrictions = [];
	$scope.messages = [];

	var readQueryVariables = function()
	{
		var query = window.location.search.substring(1);
		var vars = query.split("&");

		for (var i=0; i < vars.length; i++) 
		{
			var pair = vars[i].split("=");
			var key = pair[0];
			var value = decodeURIComponent(pair[1]);

			if (key == 'restrictions')
				value = JSON.parse(value);
			else if (key == 'min_agents' || key == 'max_shifts')	
				value = parseInt(value);
			
			$scope[key] = value;
		}  
	};

	readQueryVariables();

	$(document).ready( function() 
	{
		var load_file = document.getElementById('load_file');

		var load_file_callback = function(e)
		{ 
		    var file = load_file.files[0];
			var reader = new FileReader(); 
			
			reader.onload = function (e) 
			{ 
				var scope;
	
				try
				{
					scope = JSON.parse(reader.result);

					$scope.restrictions = scope.restrictions;
					$scope.agents_text = scope.agents_text;
					$scope.ideal_distribution = scope.ideal_distribution;
					$scope.min_agents = scope.min_agents;
					$scope.max_shifts = scope.max_shifts;
					$scope.shifts_to_exclude = scope.shifts_to_exclude;

					$scope.$apply();
				}
				catch (e)
				{
					alert("Invalid file.");
				}
	        } 

	        reader.readAsText(file);
		};

		load_file.addEventListener('change', load_file_callback);
	});
	
	var addAgents = function()
	{
		$scope.model = $scope.model.replace("${agents}", $scope.agents_text.split(',').join(' '));
	};

	var addShiftRestrictions = function()
	{
		var len_restrictions = $scope.restrictions.length;
		
		for (var i = 0; i < len_restrictions; i++)
		{
			var restriction = $scope.restrictions[i];
			var agent_id = restriction.agent_id;
			var shifts = restriction.restricted_shifts.split(',');
			var restriction_text = "s.t. " + agent_id + "_" + restriction.can_work + " : ";
			var len_shifts = shifts.length;

			for (var j = 0; j < len_shifts; j++)
			{
				restriction_text += "tss_working_at[\"" + agent_id + "\"," + "\"shift_" + shifts[j] + "\"]";

				if (j < len_shifts - 1)
					restriction_text += " + "; 
			}

			restriction_text += (restriction.can_work == "yes") ? " = 1;" : " = 0;";
			
			$scope.model = $scope.model.replace("#TMR", "#TMR\n" + restriction_text);
		}
	};

	var excludeShifts = function()
	{
		if ($scope.shifts_to_exclude)
		{
			var shifts_to_exclude = $scope.shifts_to_exclude.split(',');
			var len_shifts_to_exclude = shifts_to_exclude.length;

			for (var i = 0; i < len_shifts_to_exclude; i++)
			{
				var str_to_replace = "#{exclude_shift_" + shifts_to_exclude[i] + "}";
				$scope.model = $scope.model.replace(str_to_replace, "");
			}
		}
	};

	var setIdealDistribution = function()
	{
		for (var i = 0; i <= 23; i++)
		{
			var str_to_replace = "${ideal_" + i + "}";
			$scope.model = $scope.model.replace(str_to_replace, $scope.ideal_distribution.split(',')[i]);
		}
	};

	var setMaxShifts = function()
	{
		if (!$scope.max_shifts)
			$scope.max_shifts = "24";

		$scope.model = $scope.model.replace("${max_shifts}", $scope.max_shifts);
	};

	var setMinAgents = function()
	{
		if (!$scope.min_agents)
			$scope.min_agents = "0";

		$scope.model = $scope.model.replace("${min_agents}", $scope.min_agents);
	};

	var addMessage = function(message_text, severity)
	{
		var message = new Object();

		message.message_text = message_text;
		message.severity = severity;

		$scope.messages = [];
		$scope.messages.push(message);
	};

	var solveModel = function() 
	{
		var solver;

		if(typeof(solver) == "undefined")
		{
			solver = new Worker("js/solver.js");
			solver.postMessage($scope.model);
		}
		
		solver.onmessage = function(event) 
		{
			switch (event.data.type)
			{
				case 'log':
					$scope.console += event.data.data + '\n';
					var console = document.getElementById('console');
					console.scrollTop = console.scrollHeight;
					$scope.$apply();
					break;
				case 'output':
					$scope.output = event.data.data;

					if ($scope.output.length > 90)
						addMessage('Exciting news people! Problem solved!', 'success');
					else
					{
						$scope.output = "";
						addMessage(hermes_quotes[getRandInt(0, hermes_quotes.length - 1)] + ' Can\'t solve the problem under the given conditions!', 'danger');
					}
						
					$scope.$apply();
					solver.terminate();
					break;
					
				default:break;
			}
		};
	}

	var clearConsoleAndLog = function()
	{
		$scope.output = "";
		$scope.console = "";
	}

	$scope.processModel = function()
	{
		clearConsoleAndLog();
		addMessage('This might take a while...\nYou can check the log to keep track of progress.', 'warning');
		$scope.model = _model;
		addAgents();
		setMinAgents();
		setMaxShifts();
		setIdealDistribution();
		excludeShifts();
		addShiftRestrictions();
		solveModel();
	};
	
	$scope.saveToFile = function()
	{
		var saveData = (function () 
		{
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			return function (data, fileName) 
			{
				var json = JSON.stringify(data),
				    blob = new Blob([json], {type: "octet/stream"}),
				    url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
    		};
		}());

		var scope = new Object();

		scope.restrictions = $scope.restrictions;
		scope.agents_text = $scope.agents_text;
		scope.ideal_distribution = $scope.ideal_distribution;
		scope.min_agents = $scope.min_agents;
		scope.max_shifts = $scope.max_shifts;
		scope.shifts_to_exclude = $scope.shifts_to_exclude;

		saveData(scope, "model.txt");
	};

	$scope.addRestriction = function()
	{
		var restriction = new Restriction();
		
		$scope.restrictions.push(restriction);
	};

	$scope.clearModel = function()
	{
		$scope.restrictions = [];
		$scope.messages = [];
		$scope.agents_text = "";
		$scope.ideal_distribution = "";
		$scope.min_agents = null;
		$scope.max_shifts = null;
		$scope.shifts_to_exclude = "";
		$scope.output = "";
		$scope.console = "";
		document.getElementById('load_file').value = "";
	};

	$scope.clearRestriction = function(index)
	{
		$scope.restrictions.splice(index, 1);
	};

	$scope.showHelpDoc = function()
	{
		window.open("https://docs.google.com/a/google.com/document/d/1JHj7YHT2NPJ7giIM7D-iEszibAaczqwFaNyRHYC09eU", "_blank");
	};

	$scope.createLink = function () 
	{
    	var dialog_message = window.location + 
					'?restrictions=' + encodeURIComponent(JSON.stringify($scope.restrictions)) + 
					'&agents_text=' + encodeURIComponent($scope.agents_text) +
					'&ideal_distribution=' + encodeURIComponent($scope.ideal_distribution) +
					'&min_agents=' + encodeURIComponent($scope.min_agents.toString()) +
					'&max_shifts=' + encodeURIComponent($scope.max_shifts.toString()) +
					'&shifts_to_exclude=' + encodeURIComponent($scope.shifts_to_exclude);

		dialog_message += "\n\nCopy and paste this link into email, web page, or other web document.";

   		BootstrapDialog.show(
		{
			type: BootstrapDialog.TYPE_SUCCESS,
			title : "Create link...",
            message: dialog_message,
            buttons: 
			[ 
				{
                	label: 'Close',
                	action: function (dialogItself) { dialogItself.close(); }
          		}
			]
        });
	}
	
	$scope.sortFunction = function(item) 
	{
		if(isNaN(item[$scope.sortExpression]))
			return item[$scope.sortExpression];
			
		return parseInt(item[$scope.sortExpression]);
	}
}