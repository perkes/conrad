# conrad
A shift scheduling tool

 What is this? . 

Conrad is a tool that can help you plan the shift distribution scheme for your team, based on a target distribution and a set of restrictions. 

The basic premise is this: you tell Conrad how many people you would like to have working for each hour of the day, and Conrad will tell you what shifts your team members should cover in order to get the best approximation to what you want (it's very likely that the solution proposed by Conrad won't match exactly what you want, but it will be the best approximation, guaranteed).

It's highly unlikely that your team members will be available to work just any shift, that's what restrictions are for (more on that later).

We'll go over each of the fields used to set the problem's data.

 Team members 

This field should just include the names (or ldaps, or whatever you like to use as id for your team members) of the team members separated by commas. 

 Target distribution .

How do we represent this "target distribution" and what does it mean?

 It's represented as 24 numbers separated by commas, each number representing the ideal amount of people in a given hour. For instance, this target distribution:

1,1,1,1,2,2,2,2,3,3,3,4,4,4,4,3,3,3,3,2,2,2,2,2

would mean that during hours 0,1,2 and 3 we'd ideally need one team member (the first number represents the ideal amount of people in hour 0, the second the same for hour 1 and so on); 2 for hours 4,5,6 and 7; 3 for hours 8,9 and 10 and so on.

Determining the target distribution is out of the scope of this tool, but we'll check some possibilities at the end of this doc. It will be generally related to workload.
 .

 Minimum number of team members 

An integer representing the minimum number of team members during every hour of the day (default is 0). For instance, if you set it to 1, the proposed shift distribution will have at least 1 team member during each hour of the day. This is a restriction on the model and could result in an incompatible system, for instance, if this number is 2 and you have just one team member, there’s no possible solution.

 Maximum number of shifts

You might not want to have all your team members working different shifts, a possible solution to this is having at most a specific number of shifts (i.e. the maximum number of shifts). The default value is 24 (every possible shift), you may enter any integer between 1 and 24 in this field. This is a restriction on the model.

 Shifts to exclude .

You might also want to exclude some shifts from the calculation (default is no shifts are excluded), for instance you may not want anyone working the second or third shifts, in that case you should enter "2,3" in this field (the number of the excluded shifts, separated by commas). Shift 1 here represents the shift starting at 01.00, Shift 15 starts at 15.00 and so on. All shifts are 9 hours long. This is a restriction on the model.

 Team members' restrictions

By clicking the "New restriction" button, you can add a new team member restriction.

These restrictions are of the form "team member" can or can't work during a given set of shifts.

The steps to follow are:


Select the name of the team member using the drop down menu.
Enter the number of the shifts, separated by commas.
Use the radio buttons to indicate if the team member can or can not work those shifts.

You may delete a restriction by clicking the 'x' at the top right corner.

 Computing the solution 

If you followed the previous steps you should be ready to click "Solve" to start computing the solution. Once the model is solved, the solution will be written in the "Solution" text box. You may check the progress in the "Log" text box (just click the "Log" tab).

If you don't want to enter all this information, you can check the models in the models directory (check Saving and loading the model).

Analyzing the solution (the solution that results from solving the first example, "Simple problem"):

Minimum z = 132

Achieved distribution: [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,3,2,2,2,2,2,2,2,3,]
jperkes => shift_7
manuelreyes => shift_15
lucmatos => shift_15
jummartinez => shift_23

Minimum Z represents the difference between the target distribution and the distribution that results from the proposed solution (achieved distribution), which means lower is better.


Achieved distribution is the distribution that results from the proposed solution. In this case means that given the proposed shifts, we'd have 1 team member during the first seven hours (0 through 6), two team members on hour 7, and so on.


The rest of the lines just assign a shift to every team member. That would be the proposed solution, i.e. jperkes will be working the seventh shift, manuelreyes the fifteenth and so on.


 Saving and loading the model

You can save the current model by clicking the "download" button (this will download a txt file representing the model's data). You can also quickly share your model by clicking "Save to URL", just copy the resulting URL and send it to whoever you want to share it with. URLs longer than 2048 characters (like those resulting from complex models with lots of restrictions) won't work in most browsers.

The "Clear" button will just clear every field. The "Help" button will bring you to this document.

 Getting the right target distribution

There are many ways to do this, one possible approach is setting an amount of team members for each hour that's directly proportional to the amount of work in that hour. The amount of work could be represented by the amount of cases received, grouped by hour.
