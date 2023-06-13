# GIT WORKFLOW

Please adhere to the following workflow when working in this repository:
1. Clone the main branch to your machine
2. Open the folder in your IDE (code editor)
3. Open a new terminal and run "git checkout develop"
4. If you are working on an existing feature with an existing branch, make sure to git checkout into the relevant    branch
4. If you are creating a new feature, run "git checkout -b feature/[name-of-new-feature] (i.e. feature/find-image-type)
5. Perform your work making meaningful commits (git commit -am "[your-message-here]" AND THEN git push -u origin feature/[name-of-new-feature])
6. If your work is done, tested, and working, run "git checkout develop" AND THEN "git merge feature/[name-of-new-feature]"
7. If your work is in-progress, untested, or not a pre-approved feature, do NOT merge branches

# FILE DIRECTORIES AND FILE NAMES

Please make sure that all image files are located in the ../src/assets directory. All vector graphics will be stored in the /assets/SVG directory.

When naming files you are adding to the project, please give them semantic names so they are easy to find and reference while working. All file names should be all lower case with dashes between words (i.e. dixie-header-img).
