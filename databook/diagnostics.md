---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.16.2
  kernelspec:
    display_name: allensdk
    language: python
    name: allensdk
  execution:
    allow_errors: true
---

# Diagnostics

```python tags=["remove-input"]
import subprocess
```


## Databook Version Info

```python tags=["remove-input"]
branch = subprocess.run(['git', 'branch', '--show-current'], capture_output=True).stdout.decode().strip()
commit_id = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True).stdout.decode().strip()

print(f'{"Branch":<11}: {branch}')
print(f'{"Commit Hash":<11}: {commit_id}')
```


## Executable Pages
These pages contain executable Python code. Any failures will be listed here with an ❌. Hover over the failure icon to see what kind of error occurred.

```{nb-exec-table}
```
## Python Version

```python tags=["remove-input"]
import sys
print(sys.version)
```

## Installed Modules

```python tags=["remove-input"]
print(subprocess.run(['pip', 'freeze'], capture_output=True).stdout.decode())
```

## Attached Data

```python tags=["remove-input"]
from pathlib import Path

data = Path.cwd() / 'data'

if not data.exists():
    print("No data attached")
else:
    base = len(data.parts)
    for f in data.glob('**'):
        depth = len(f.parts) - base
        print(' ' * depth + f.name)
```
