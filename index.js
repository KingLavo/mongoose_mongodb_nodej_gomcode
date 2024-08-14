require("dotenv").config()
const mongoose = require("mongoose")

//The person model
const Person = require('./src/models/users')

//Db connection string from the env file
const URL = process.env.MONGO_UR


//creating a single user
const createPerson = ()=>{
    const person = new Person({
        name: "senghor",
        age: 30,
        favoriteFoods:['Semovita', "Tuwo", "Fish", "vegitable soup"]
    })
    person.save( )
        .then(data =>{
            console.log("User created successfull..")
            console.log(data)
        })
        .catch( err =>{
            console.log(err)
        })
}
const persons = [
    {name:" Okafor", age: 40, favoriteFoods: ["Egusi soup", "Eba", "Fufu", "Rice", "Burger"]},
    {name:"Doe", age: 32, favoriteFoods: ["Buger", "Chinese Spaghetti", "sharwama"]},
    {name:" Glory", age: 29,favoriteFoods: [ "Eba", "Fufu", "Rice", "Bean", "okoro soup"]},
    {name: "kingsley", age:30, favoriteFoods: ["okoro soup", "black soup"]},
    { name: "Vivian", age: 24, favoriteFoods:["Tea and Bread", "Unripe Plantain Porridge", "Spaghetti"]},
    { name: "Eno", age: 32, favoriteFoods:["Vegetable soup", "Moi Moi", "Pepper Soup"]}
]

//creating multipule users
 const MulPerson = (arrayOfPerson)=>{
     Person.create( arrayOfPerson)
        .then( data =>{
            console.log(data)
        })
        .catch(err => {
            conso.log(err)
        })
 }

//Find all the people having a given name
function findWithGivenName (){
    Person.find({name: "Glory"})
        .then(data =>{
            console.log(data)
        })
        .catch( err =>{
            console.log(err)
        })
}

//Find just one person which has a certain food in the person's favorites
const findWithFavoriteFood = (food)=>{
    Person.findOne({favoriteFoods: food })
        .then( data =>{
            console.log(data)
        })
        .catch(err =>{
            console.log(err)
        })
}


//findById single user
const findPersonById = (personId)=>{
    Person.findById({_id:personId})
        .then( data =>{
            console.log(data)
        })
        .catch( err =>{
            console.log(err)
        })

}

//find one and update
const updatePerson = (personName)=>{
    Person.findOneAndUpdate(
        {name: personName}, 
        {age: 20}, 
        { new: true, runvalidator: true}
    )
    .then( data =>{
        console.log(data)
    })
    .catch( err =>{
        console.log(err)
    })
}

const deletePersonById = (personId)=>{
    Person.findByIdAndDelete({_id:personId})
        .then( data =>{
            console.log(`The person with this  ID: ${data._id} has been deleted`)
        })
        .catch( err =>{
            console.log(err)
        })
}

//chainning query together 
const chainFun = ()=>{
    Person.find()
        .sort({name:"desc"})
        .limit(3)
        .select({name: true, age: true})
        .exec()
        .then( docs =>{
            console.log(docs)
        })
        .catch( err =>{
            console.log(err)
        })

}

//Data base connection 
mongoose.connect(URL,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then( data =>{
        console.log("connection established successfull");
        // createPerson()
        // MulPerson(persons)
        // findWithGivenName()
        // findWithFavoriteFood("Pepper Soup")
        // findPersonById("66bbc02aa7dc2e08945884b3")
        // updatePerson("Glory")
        // deletePersonById("66bbc02aa7dc2e08945884b6")
        chainFun()
    })
    .catch( err =>{
        console.log(err)
    })