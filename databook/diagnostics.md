# Diagnostics

## Executable Pages
These pages contain executable Python code. Any failures will be listed here with an ❌. Hover over the failure icon to see what kind of error occurred.

```{nb-exec-table}
```

## Module List

```{code-cell} ipython3
from pip._internals import main as pipmain
pipmain('freeze')
```