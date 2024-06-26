## Invalid times in Neuropixels datasets
In some sessions, there were minor problems with data acquisition that did not necessitate failing the entire experiment, but invalidated some of the data during small time periods. During these periods, channel data is recorded as `NaN`.

`session.get_invalid_times()` returns a DataFrame with the start and stop time of intervals of invalid data and the associated probes.

Because these problems occur so rarely, built-in methods do not filter them out. One method for excluding them from analysis would be to filter out trials from the stimulus table with a `start_time` or `stop_time` that overlaps with any of the invalid intervals.