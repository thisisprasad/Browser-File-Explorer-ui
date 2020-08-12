# Application Configuration
The app configuration file is present in the config folder of project's root folder. Properties specified are:
1. name - Name of the Application.
2. version - Version to use while running the application.
3. apps - This is an array of objects. This is the way to integrate applications with this project(FileXplorer). Each object representing an application. Each application/object contains following attributes:
    i. name - Name of the application to be integrated. A folder with this same name should be present in the apps folder. Each application must contain an "app.js" file. This file should/will override methods required to be done by every application. This is done by keeping in-mind the future prospects of the project.
    ii. contextmenu
    iii. Every application must provide an implementation of method 'getContextmenuOptions' which returns an array of Model of 'ContextmenuItemProps'. Each element of the model defines the option the application wants to provide in contextmenu of File-Xplorer project. This method is required only when the application wants options of contextmenu.
    iv. The application must provide an implementation of  method 'getAppProps' which returns a model instance of type AppProps.
    v. An application can optionally provide an implementation of method 'init' to carry out initialization tasks.