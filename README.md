# API_Tennis  

This is a test app

You can play with the requests with the postman collection in the documentation folder.

First clone the project with git clone.

Run `npm install` at the root of the project.

Then check the **port** in the **app.js** file, the set port is 8080 for aws but might used on your computer.

Then run `node app.js` in a console.

You can now go to http://localhost:{yoour port} to test the app.
This app has the following requests : 

 - /**players** : Returns the list of players of the data sample in **/src/resources** folder according to their rank from best to worst.
 - **/players/:id** Returns a player from its id.
 - **/players/best-country** Returns the country with the best win ration from its latest matches.
 - **/players/imc** Returns the mean imc of the given players.
 - **/playesr/median** Returns the median height of the given players.
