---
execution:
  allow_errors: true
jupytext:
  notebook_metadata_filter: execution
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.2
kernelspec:
  display_name: python3
  language: python
  name: python3
---

# Diagnostics

```{code-cell} ipython3
:tags: [remove-input]

import subprocess
from datetime import datetime

print(f"Diagnostics report compiled at: {datetime.now()}")
```

## Databook Version Info

```{code-cell} ipython3
:tags: [remove-input]

origin_url = subprocess.run(['git', 'remote', 'get-url', 'origin'], capture_output=True).stdout.decode().strip()
branch = subprocess.run(['git', 'branch', '--show-current'], capture_output=True).stdout.decode().strip()
commit_id = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True).stdout.decode().strip()

print(f'{"Remote":<11}: {origin_url}')
print(f'{"Branch":<11}: {branch}')
print(f'{"Commit Hash":<11}: {commit_id}')
```

## Executable Pages
These pages contain executable Python code. Any failures will be listed here with an ❌. Hover over the failure icon to see what kind of error occurred.

```{nb-exec-table}
```

## Environment
### Python Version

```{code-cell} ipython3
:tags: [remove-input]

import sys
print(sys.version)
```

### Environments

```{code-cell} ipython3
:tags: [remove-input]

from IPython.display import display, Markdown, Code
from pathlib import Path

envs_dir = Path('/opt/envs')
venv_python = Path('./bin/python')
for folder in envs_dir.glob('*/'):
    display(Markdown(f'#### `{folder}`'))

    pkgs = subprocess.run([str(folder.joinpath(venv_python).absolute()), '-m', 'pip', 'freeze'], capture_output=True).stdout.decode().strip()
    display(Code(pkgs))
```
