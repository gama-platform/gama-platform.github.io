---
title:  Using Git from GAMA to version and share models
---


## Install the Git client [Tested on the GAMA 1.8.2]

The Git client for GAMA needs to be installed as an external plugin.
1. Help > Install new plugins...
2. Add the following address in the text field "Work with": `https://download.eclipse.org/egit/updates`. (press Enter key)
3. In the available plugins to install, choose `Git integration for Eclipse` > `Git integration for Eclipse`
4. Click on the Next button and follow the instructions (GAMA will be relaunched).

## Open the Git view

To use Git in GAMA select Views -> Other... -> Show View -> Other... 

In the Show view window that appears select Git -> Git Repositories and click on *Open*.

![Show View Window](/resources/images/recipes/gitWithGama/ShowViewWindow.png)

## Create a Local Repository

With Git you can easily create local repositories to version your work locally. First, you have to create a GAMA project (e.g ***GitNewProject***) that you want to share via your local repository. 

After you have created your GAMA project, go to the Git Repository view and click on *Create a new local Git repository*. 

![Create New Local Git Repository](/resources/images/recipes/gitWithGama/CreateLocalGitRepository.png)

In the following window specify the directory for the new repository (select the folder of the created GAMA project - ***GitNewProject*** -), throught the button Browse...

![Select folder new local Repository](/resources/images/recipes/gitWithGama/SelectRepositoryFolder.png)

then hit the Create button.

![Create Button](/resources/images/recipes/gitWithGama/CreateRepositoryButton.png)

Now your local repository is created, you can add models and files into your GAMA project. As you  selected the folder of the new created GAMA Project, the repository will not be empty. So, it will be initialized with all the folders and files of the GAMA project. Note the changed icons: the project node will have a repository icon, the child nodes will have an icon with a question mark.

![Changed icons](/resources/images/recipes/gitWithGama/ChangedIcons.png)

Before you can commit the files to your repository, you need to add them. Simply right click the shared project's node and navigate to Team -> Add to Index. 

![Add Ignore Commit from Menu](/resources/images/recipes/gitWithGama/AddIgnoreCommit.png)

After this operation, the question mark should change to a plus symbol.

![Icons Changed after add](/resources/images/recipes/gitWithGama/ChangeIconsAfterAddGit.png)

To set certain folders or files to be ignored by Git, right click them and select Team -> Ignore. The ignored items will be stored in a file called .gitignore, which you should add to the repository.


## Commit

Now you can modify files in your project, save changes made in your workspace to your repository and commit them. You can do commit the project by right clicking the project node and selecting Team -> Commit... from the context menu. In the Commit wizard, all files should be selected automatically. Enter a commit message and hit the Commit button. 

![Icons Changed after add](/resources/images/recipes/gitWithGama/FirstCommitLocalRepo.png)

If the commit was successful, the plus symbols will have turned into repository icons.

![Icons Changed after commit](/resources/images/recipes/gitWithGama/ChangedIconsAfterCommit.png)

After changing files in your project, a ">" sign will appear right after the icon, telling you the status of these files is dirty. Any parent folder of this file will be marked as dirty as well.

![Changes to commit](/resources/images/recipes/gitWithGama/gitChangesToCommit.png)

If you want to commit the changes to your repository, right click the project (or the files you want to commit) and select Team -> Commit... . Enter a commit message and click Commit to commit the selected files to your repository. 

## Add Files

To add a new file to the repository, you need to create it in your shared GAMA project first. Then, the new file will appear with a question mark.

![New file added to project](/resources/images/recipes/gitWithGama/AddNewFileGit.png)

Right click it and navigate to Team -> Add to Index. The question mark will turn into a plus symbol and the file will be tracked by Git, but it is not yet committed. In the next commit, the file will be added to the repository and the plus symbol will turn into a repository icon. 

![Commit new added file](/resources/images/recipes/gitWithGama/AddedFileCommitGit.png)

## Revert Changes

If you want to revert any changes, there are two options. You can compare each file you want to revert with the HEAD revision (or the index, or the previous version) and undo some or all changes done. Second, you can hard reset your project, causing any changes to be reverted.

### Revert via Compare

Right click the file you want to revert and select Compare With -> HEAD Revision. This will open a comparison with the HEAD Revision, highlighting any changes done. You can revert several lines.  select the line you want to revert and hit the Copy Current Change from Right to Left button (in the toolbar). 

![Revert by Compare](/resources/images/recipes/gitWithGama/RevertFilByCompareWith.png)

### Revert via Reset

To reset all changes made to your project, right click the project node and navigate to Team -> Reset... . Select the branch you want to reset to (if you haven't created any other branches, there will be just one). Click the reset button. All changes will be reset to this branch's last commit. Be careful with this option as all last changes in your Gama Project will be lost.

![Revert by Reset](/resources/images/recipes/gitWithGama/ResetGit.png)

## Clone Repositories

To checkout a remote project, you will have to clone its repository first. Open the GAMA Import wizard: right click the User models node -> Import... -> Other...

![Import git project](/resources/images/recipes/gitWithGama/ImportFromGit.png)

Select Git -> Projects from Git and click Next. 

![Import git project - Next](/resources/images/recipes/gitWithGama/nextImportGitProject.png)

Select "Clone URI" and click Next. 

![Repository URI](/resources/images/recipes/gitWithGama/cloneURIGitProject.png)

Now you will have to enter the repository's location. Entering the URI will automatically fill some fields. Complete any other required fields and hit Next (e.g, Authentification fields). If you use GitHub, you can copy the URI from the web page.

![Repository location](/resources/images/recipes/gitWithGama/SourceGitRepositoryImport.png)

Select all branches you wish to clone and hit Next again.

![Branch Selection](/resources/images/recipes/gitWithGama/ImportGitProjetBranchSelection.png)

Hit next, then choose a local storage location to save the repository in.

![Set local location](/resources/images/recipes/gitWithGama/ImportProjectLocationNext.png)

To import the projects, select the cloned repository and hit Next. 

Select Import Existing Projects and hit Next. 

![Select a wizard to use](/resources/images/recipes/gitWithGama/ImportProjectSelectWizardToUse.png)

In the following window, select all projects you want to import and click Finish.

![Select projects to import](/resources/images/recipes/gitWithGama/ImportGitSelectProjects.png)

The projects should now appear in the Models Explorer. (Note the repository symbol in the icons indicating that the projects are already shared.)

![Imported projects](/resources/images/recipes/gitWithGama/ImportedProjectsGit.png)


## Create Branches

To create a new branch in your repository, right click your project and navigate to Team -> Switch to -> New Branch... from the context menu. Select the branch you want to create a new branch from, hit New branch and enter a name for the new branch.

![Create new branch](/resources/images/recipes/gitWithGama/CreateNewBranch.png)

The new branch (NewBranch) should appear in the branch selection window.

![Created new branch](/resources/images/recipes/gitWithGama/GamaProjectNewBranch.png)

You can see all the branches in the Git Repositories view.

![New branches view](/resources/images/recipes/gitWithGama/BranchesView.png)

 If you would like to checkout the a branch, select it and click Checkout.
 
![Check out a branch](/resources/images/recipes/gitWithGama/CheckOutBranch.png)


## Merge

To merge one branch into another, right click the project node and navigate to Team -> Merge... 

![Merge a branch](/resources/images/recipes/gitWithGama/GitMerge.png)

The merge will execute and a window will pop-up with the results. The possible results are Already-up-to-date, Fast-forward, Merged, Conflicting, Failed. 

![Merge a branch](/resources/images/recipes/gitWithGama/MergePopUp.png)

Note that a conflicting result will leave the merge process incomplete. You will have to resolve the conflicts and try again. When there are conflicting changes in the working project, the merge will fail.


## Fetch and Pull 

To update the remote branches when cloning remote repositories (Git creates copies of the branches as local branches and as remote branches) you will have to use Fetch. To perform a Fetch, select Team -> Fetch From... from the project's context menu. 

To update your local branches, you will have to perform a Merge operation after fetching.

## Pull

Pull combines Fetch and Merge. Select Team -> Pull.

## Push 

Local changes made to your local branches can be pushed to remote repositories causing a merge from your branches into the branches of the remote repository (X pulls from Y is the same as Y pushes to X). The Push wizard is pretty much the same as the Fetch wizard. 

![Git Push](/resources/images/recipes/gitWithGama/GitPush.png)

## History View

To show the repository history, right click it and select Team -> Show in History. This will open the History View, giving an overview of the commits and allowing you to perform several actions (creating branches/tags, revert, reset...). 

![Git Push](/resources/images/recipes/gitWithGama/HisrtoryView.png)
