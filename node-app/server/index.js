const express = require("express")
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsear JSON in the request
app.use(express.json());
const path = 'server/users.json'

app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin');
  res.json({ message: "Hello from the server"});
})

//Save user in a JSON
app.post('/save-user', (req, res) => {
  const user = req.body //We recibe the user when make a request post

  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading the file JSON: ', err)
      return res.status(500).send('Intern error');
    }

    let users = []

    if(data){
      try {
        users = JSON.parse(data)//obj
        if(!Array.isArray(users)){
          users = []
        }
      } catch (parseError) {
        users = []
      }
    }

    //Add the users to list
    users.push(user)

    //Save list of users in file JSON
    fs.writeFile(path, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.log('Error writing in file JSON: ', err)
        return res.status(500).send('Inter error write')
      }

      console.log('User save sussesfully')
      return res.status(200).send('User saved successfully')
    })
  })
})


app.delete('/delete-user', (req, res) => {
  const userToDelete = req.body // user to delete

  fs.readFile(path, 'utf-8', (err, data) => {
    if(err){
      console.log('Error reading the JSON file: ', err)
      return res.status(500).send('Internal error')
    }

    let users = []
    if (data) {
      try {
        users = JSON.parse(data)//obj
        if(!Array.isArray(users)){
          users = []
        }
      } catch (parseError) {
        users = []
      }
    }

    //Find index of the user to delete
    const indexToDelete = users.findIndex((existingUser) => existingUser.id === userToDelete.id)
    if(indexToDelete !== -1) {
      users.splice(indexToDelete, 1)

      //Save the list updated in the file JSON
      fs.writeFile(path, JSON.stringify(users, null,2 ), (err) => {
        if(err) {
          console.log('Error writing in file JSON: ', err)
          return res.status(500).send('Inter error write')
        }
        console.log('User delete successfully')
        return res.status(200).send('User deleted successfully')
      })
    } else {
      console.log('User not found')
      res.status(404).send('User not found')
    }
  })
})

app.get('/list-of-users', (req, res) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if(err) {
      console.error('Error reading the JSON file: ', err);
      return res.status(500).send('Internal error');
    }

    let users = []

    if(data){
      try {
        users = JSON.parse(data)//obj
        if(!Array.isArray(users)){
          users = []
        }
      } catch (parseError) {
        users = []
      }
    }
    res.status(200).json(users)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})




