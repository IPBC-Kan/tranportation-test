# How to clone azure-repos and change their name for begging of new project

Detailed Commands in Sequence

Here's the full sequence of commands you might run in a terminal:

# Clone the new repository:

1. git clone https://github.com/your-username/Combined-Repo.git
2. cd Combined-Repo

## Add the first repository:

1. git remote add repo1 https://github.com/IPBC-Kan/Azure-Auth-React.git
2. git fetch repo1
3. mkdir PROJECT_NAME
4. git read-tree --prefix=PROJECT_NAME/ -u repo1/main
5. git commit -m "Add Azure-Auth-React as a subdirectory and named it PROJECT_NAME"

## Add the second repository:

1. git remote add repo2 https://github.com/IPBC-Kan/Azure-Auth-NodeJS.git
2. git fetch repo2
3. mkdir PROJECT_NAME
4. git read-tree --prefix=PROJECT_NAME/ -u repo2/main
5. git commit -m "Add Azure-Auth-NodeJS as a subdirectory and named it PROJECT_NAME"

## Push the combined repository:

1. git push -u origin main

By the end of these steps, your new GitHub repository should contain the contents of both original repositories, each in its own subdirectory.
