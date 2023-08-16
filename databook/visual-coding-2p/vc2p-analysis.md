# Analysis files and cell specimens table

## Analysis file
There are analysis files that accompany each session that contain derived data that might be useful to build upon. However, this should be used with some caution described below. 

For each stimulus, there are two dataframes of `sweep_response` and `mean_sweep_response` that quantify the individual trial responses of each neuron. The sweep_response dataframe contains the DF/F for each neuron for each trial. The index of the dataframe matches the stimulus table for the stimulus, and the columns are the cell indexes (as strings). 
For this dataframe, DF/F was computed using the mean fluorescence in the 1 second prior to the start of the trial as the Fo. The sweep response contains this DF/F for each neuron spaning from 1 second before the start of the trial to 1 second after the end of the trial. In addition to the responses of each neuron, there is one additional column that captures the running speed of the mouse during the same time span of each trial. This column is titled 'dx'.
The mean_sweep_response (with the same index and columns as sweep_response) calculates the mean value of the DF/F in the sweep response dataframe during each trial for each neuron. The column titled 'dx' averages the running speed in the same way.

In addition to these dataframes there is a numpy array titled `response` that captures the mean response to each stimulus condition. For example, for the drifting grating stimulus, this array has the shape of (8,6,3,number_cells+1). The first dimension is the stimulus direction, the second dimension is the temporal frequency plus the blank sweep. The third dimension is [mean response, standard deviation of the response, number of trials of the condition that are significant]. And the last dimension is all the neurons plus the running speed in the last element. So the mean response of, say, cell index 17, to the blank sweep is located at response[0,0,0,17].

The `signal_correlation` and `noise_correlation` are arrays of the signal and noise correlations of all the neurons in a session for specific stimuli.

## Cell specimen table
In addition the the analysis tables, there are response metrics that have been computed for each neuron using the responses that are stored in the analysis files. These are defined below. Each metric name has a suffix that is the abbreviation of the stimulus it was computed from (e.g. dg=drifting gratings, lsn=locally sparse noise)

These metrics include:

dsi_dg
: Direction selectivity of a neuron. This is the preferred metric for direction selectivity.

g_dsi_dg
: The "global" direction selectivity of a neuron computed using circular variance. This is a less preferred metric for direction selectivity.

g_osi_dg
: The "global" orientation selectivity of a neuron, computed using circular variance. This is the preffered metric for orientation selectivity.

pref_dir_dg
: The direction of the stimulus condition for which a neuron has its largest mean response. I.e. there is one stimulus condition (direction & temporal frequency) for which the neuron has it's largest mean response. This is the direction of that condition.

pref_tf_dg
: The temporal frequency of the stimulus condition for which a neuron has its largest mean response.

