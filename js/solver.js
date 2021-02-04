importScripts("lib/glpk.min.js");

var output = "";
var model;

onmessage = function (oEvent) 
{
	model = oEvent.data;
	
	start();
};

function printOutput(value, filename)
{
	output += value + '\n';
}

function printLog(value)
{
	var message = new Object();
	message.type = 'log';
	message.data = value;
	postMessage(message);
}

function start()
{
	var lp = glp_create_prob();
	var tran = glp_mpl_alloc_wksp();
	
	glp_mpl_read_model_from_string(tran, 'MathProg Model', model);
	glp_mpl_generate(tran, null, printOutput);
	glp_set_print_func(printLog);
	glp_mpl_build_prob(tran, lp);

	var smcp = new SMCP({presolve: GLP_ON});

	glp_simplex(lp, smcp);
	glp_intopt(lp);

	if (lp) 
	{
		glp_mpl_postsolve(tran,lp,GLP_MIP);

		if (output.length > 0)
			output = "Minimum z = " + glp_mip_obj_val(lp) + '\n\n' + output;
		
		var message = new Object();
		message.type = 'output';
		message.data = output;
		postMessage(message);
	}
}