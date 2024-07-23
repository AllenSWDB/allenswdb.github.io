---
execution:
  allow_errors: true
jupytext:
  notebook_metadata_filter: execution
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.1
kernelspec:
  display_name: allensdk
  language: python
  name: allensdk
---

# Diagnostics

```{code-cell}
:tags: [remove-input]

import subprocess
```

## Databook Version Info

```{code-cell}
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

```{code-cell}
:tags: [remove-input]

import sys
print(sys.version)
```

### Installed Modules

```{code-cell}
:tags: [remove-input]

print(subprocess.run(['pip', 'freeze'], capture_output=True).stdout.decode())
```
