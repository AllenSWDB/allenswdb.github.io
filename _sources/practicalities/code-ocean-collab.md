# Collaborating using Code Ocean

It can be tricky to collaborate in Code Ocean. While you can share a capsule with other users, only one person can work in the capsule at one time. 
The approach that we've found works best for collaborating is via a shared GitHub repository. 

- [Create a repository](create-repo) using the previous instructions. 
- In GitHub, add collaborators to the repository. 

- Give all collaborators <b>write</b> access to the repository.
- In GitHub, each collaborator should make a separate branch of the repository

- In Code Ocean, each collaborator should [make a capsule using the clone from git option](capsule-clone).
- Each collaborator can select their own branch to work in.

- Merging Jupyter notebooks is chaotic, so each person should work in their own notebook within the shared repository.
- Code intended to be shared with others should be put into fuctions in python modules that can be imported and used in each others' notebooks.
- [Commit changes and sync to github](sync-github) to your own branch
- In GitHub, make a Pull Request from your branch to the main branch. Ask (at least) one of your collaborators to review your changes to make sure there are no unintended changes. Resolve any merge conflicts in GitHub.
