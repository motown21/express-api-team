# NBA DREAM TEAM

## OVERVIEW
This application is designed for NBA fans to create/predict their own teams and outcomes for play off and trade season. This will be benifital for fans to keep track of changes within their favorite teams each season.
## HOW IT WORKS
To use this appication you have to create an account by signing up on the inital landing page. Once your account is created you can now sign in to use the appliacton functions. You will be redirected to a new page that shows all the functions. You may now create your favorite teams, by filling in your teams name, coach, city, mascot, record, and city. You will see a button that says get all teams. Clicking this button will show you the  list of your faviorite teams that you created. If your favorites team coach gets fired you can go update the coaches name by fulling the update team form. If players have been traded and you consider a  team is no longer your favorite. You can delete that team from your list.
## LINKS
front-end https://motown21.github.io/team-project-client/


back-end https://motown21.github.io/express-api-team/


## List of technologies used
GA express api lesson 
https://mongoosejs.com/docs/api/model.html

## PLAINNING


| Date 	|Task|	Progress |
|-------|--------|------------------|
| 01/5/21 |Create User Stories|Complete|
| 01/5/21	|Create Wire Frames	|Complete|
| 01/5/21	|Create ERD	|Complete|

SET UP

| Date | Task	| Progress |
|-------|-----------|---------------------|
| 01/6/21| Download Express API Template| Complete|
| 01/6/21|	Download client template | Complete|
| 01/6/21| Create a GitHub Repository | complete|
| 01/12/21|	Deploy to Heroku | complete|


api

| Date | Task	| Progress |
|-------|-----------|---------------------|
| 01/6/21 | Review express-api-crud, express-api-relationships, and express-api-auth	Complete|
| 01/6/21	|Team schema 	|Complete|
| 01/6/21	|Team model	|Complete|
| 01/6/21	|Team CRUD routes 	 |Complete|
| 01/6/21	|Test with curl scripts	| Complete|
| 01/6/21	|User Schema	|Complete|
| 01/6/21	|User Model	|Complete|
| 01/6/21	|User CRUD routes	|Complete|
| 01/6/21 |	Test curl Scripts 	|Complete|
| 01/6/21	|Player schema	|Hold off|
| 01/6/21	|Playe rmodel	|Hold off|
| 01/6/21	|Player CRUD routes	|Hold off|
| 01/6/21	|Add the relationship to a User	|Hold off|
| 01/6/21	|Add User ownership to resource controller |	Hold off|


FINAL TOUCHES

| Date |	Task |	Progress|
|-----------|--------|----------|
| 01/22/21	| README | complete |
| 01/22/21	| STYLE  | complete |
| 01/11/21	| Troubleshooting |	Did not complete |


## STORIES

### Story 1
Using mongoose models that were given with the api template did not work for my application. I guess it didnt reconzie the action being called. So i had to research different mongoose models that would still allow me to update and delete my teams.

### Story 2
I got confused on how my id was being stored on the front end and backend which created issues when the api call had an id as undefined i learned that its always best to console log to be certain whats being used to prevent small is as _ from breaking code.

## Unsolved problem
I would like to add a player model and route for the second version of the project i would also like to finish my show route now that im aware of the mongoose problem.

### USER STROIES

User has many Teams
``` js
Team {
      name: string "Celtics",
      coach: string "joe schmoe"
      city: string "boston"
      mascot: string "lucky the leprachaun"
      record: string "12 - 0"
      }
  ```
User stories


vesrion 1

- As a user I want to sign up
- As a user I want to sign in
- As a user I want to change my password
- As a user I want to sign out
- As a user I want to create a team
- As a user I want to get my teams
- As a user I want to update my team
- As a user I want destroy my team

Version 2
Players

Version 3
Reviews

Version 4
Fans

### Wireframe
[Imgur](https://i.imgur.com/p8PyUt1.jpg)
