
# Technical test of the company __DoubleV__

This project was made with React, TailwindCSS, NodeJS and Express 



## Installation



First make a copy of the repository on your local:

```bash
  git clone https://github.com/JulianBarbossa9/doublev.git
```

Second, go to the folder named node-app

```bash
  cd node-app/
```

then in the terminal install the dependencies with: 

```bash
  npm install
```

then start the server with (it has to be in the node-app folder)

```bash
  npm start
```

you should then see a console message that reads as follows or go to this route:  [http://localhost:3001](http://localhost:3001)

```
Server listening on 3001
```

next we open another terminal and go to the reat-app folder (remember not to close the node server)

```bash
  cd react-node/
```

we install dependencies 
```bash
  npm install
```

after this we started the project with:
```bash
  npm run dev
```

in my case, the project rises in the following port [http://localhost:5173](http://localhost:5173)

with this the project should work, if you want to see the users that are being saved go to node-app/server and you will find the __users.json__ file where the selected users are saved. 


NOTE: in some cases the API where the data is taken from, says that only a certain amount of requests can be made and reports an error, this is solved by reloading the page. Thank you very much

