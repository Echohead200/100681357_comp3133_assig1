const user = require("./models/user")
const listing = require("./models/listing")
const userListing = require("./models/userListing")

exports.resolvers ={
    Query:{
        getUsers: async (parent,args)=>{
            const userList = user.find({})
            console.log(userList)
            return userList
        },
        getUserbyId: async (parent,args)=>{
            return user.findById(args.id)
        },
        getUsersbyname: async (parent,args) =>{
            console.log(args)
            return user.findOne({userName: args.userName})
        },
        getAdminListings: async (parent,args)=>{

            // there is not user vaildation on this page because the getListing commard will only be avialbile
            // user's loged in to the front end, if they can access the front end, they can be here
             const listcheck = await listing.find({})
             //postal code is not null in the Mongo database but is treated as null in graphql
             //beacuse the code is identical to the getUser, i am assuming this is a Graphql problem

             return listing.find({})
             //console.log(listcheck[0].userName)

            // for(i=0;i<(await listcheck).length;i++){
            //     if(JSON.stringify(listcheck[i].userName) == JSON.stringify(args.username)){
            //         console.log("works!")
            //     }else{
            //         console.log("didn't")
            //     }
            // }
            // console.log("hello")
            
        },
        getAdminlistingsbyCity: async(parent,args)=>{
            
            console.log("Active")
            const cityList = await listing.find({city: args.city})
            //postal code is not null in the Mongo database but is treated as null in graphql
            //beacuse the code is identical to the getUser, i am assuming this is a Graphql problem
            
            return cityList


        },
        getAdminlistingsbyUsername:async(parent,args) =>{
            console.log("Active")
            const cityList = await listing.find({userName: args.userName})
            
            return cityList

        },
        login:async (parent,args,context)=>{
            console.log("active")

            const listcheck = await user.find({})
            //in testing with an incorrect input it said it couldn't read the userName and stopped,
            //this means that this program can't reach my error message but still works as intened 

            for(i=0; listcheck.length;i++){
                if(JSON.stringify(listcheck[i].userName) === JSON.stringify(args.userName)&&
                JSON.stringify(listcheck[i].password) === JSON.stringify(args.password)){
                    console.log("Working!")
                    return [listcheck[i].userName,listcheck[i].password]
                } 
            }
            throw new Error ("username and password doen't match database")      
        },
        getuserListings: async (args)=>{
            const userListinglist = userListing.find({})
            console.log(userListinglist)
            return userListinglist
        }
    },

    Mutation: {
        addUser: async (parent,args) =>{
            console.log(args)
            
            let newUser = new user({
                userName: args.userName,
                firstName: args.firstName,
                lastName: args.lastName,
                password: args.password,
                email: args.email,
                type: args.type
            })
            return newUser.save()
        },
        addAdminlisting: async(parent,args) =>{


            const usercheck = await user.find({})
            console.log(JSON.stringify(usercheck[0].type))

            console.log(JSON.stringify(usercheck[0].userName))
            if(JSON.stringify(args.username) === JSON.stringify(usercheck[0].userName) &&
                 JSON.stringify(args.password) === JSON.stringify(usercheck[0].password)){
                console.log("working now!")
                let newListing = new listing({
                    listing_id: args.listing_id,
                    listing_title: args.listing_title ,
                    description:args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email:args.email,
                    username: args.username
                })
                return newListing.save()
            }else{
                throw new Error("username and password invaild")

            }
        },
        addUserListing: async (args) =>{

            let newUserListing = new userListing({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                userName: args.userName,
            })
            return newUserListing.save()
        }

        
    }
}
