# Git

## Cheat Sheet
[Git Cheat Sheet](https://about.gitlab.com/images/press/git-cheat-sheet.pdf)

## Alternative Interfaces for Git

* [GitHub Desktop](https://desktop.github.com) (This is our recommendation for git beginners.)
* [Git for Windows](https://gitforwindows.org) includes a GUI interface.
* [Visual Studio Code](https://code.visualstudio.com) includes Git compatibility built-in.
* [PyCharm](https://www.jetbrains.com/pycharm/) includes Git compatibility built-in

# Basic Git Workflows

## Fork a repo (e.g. `swdb_2025_student`)

Navigate to the [swdb_2025_student](https://github.com/allenInstitute/swdb_2025_student) repo (or just scroll to the top of this page) and click "Fork" at the top right (or just scroll to the top of this page).


## Single-user repository -- clone a repository

Clone from GitHub:

`$ git clone https://github.com/username/swdb_2025_student # clones into ./swdb_2025_student`

## A useful trick
Install your local repo in python so that you can edit in place:

`$ pip install -e swdb_2025_student/`


## Single-user repository -- commit a specific set of files, push to server/remote

```
$ git pull # make sure we have the latest changes from the server
$ git add some_file # stage the file we want to commit
$ git add some_other_file # stage another file
$ git commit -m "your commit message" # commit staged files
$ git push # off we go
```

## Pull requests -- proposing changes to someone else's repository

navigate to the repo on Github and "open a pull request"

## Syncing upstream changes

```
$ git remote add upstream https://github.com/AllenInstitute/swdb_2025_student
$ git pull upstream main
$ git push origin main
$ # open a PR
```

## Feature branches -- keeping one set of changes isolated from another

```
$ git checkout main # just to make it clear which branch we start from
$ git checkout feature_branch
$ # ...edit...
$ git add some_file
$ git commit -m "your commit message"
$ git checkout main # change is committed, but not to main
```

## Feature branches -- these can be stored remotely too, of course

```
$ git checkout main
$ git checkout feature_branch
$ # ...edit...
$ git add some_file
$ git commit -m "your commit message"
$ git push origin feature_branch
$ git checkout main
```

## Feature branches -- merging your changes back in

```
$ git checkout feature_branch # make the new branch
$ # ...edit...
$ git commit -m "your commit message" # commit changes
$ git checkout main # when ready, head back to main
$ git merge feature_branch # merge feature_branch --> main.
```
