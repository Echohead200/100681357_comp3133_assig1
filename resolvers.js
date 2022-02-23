const user = require("./models/user")
const listing = require("./models/listing")

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
        getListings: async (parent,args)=>{

            const listcheck = await user.find({})
            console.log(listcheck[0].userName)

            for(i=0;i<(await listcheck).length;i++){
                if(JSON.stringify(listcheck[i].userName) == JSON.stringify(args.username)){
                    console.log("works!")
                }else{
                    console.log("didn't")
                }
            }
            console.log("hello")
            return listing.find({})
        },
        testlogin:async (parent,args,context)=>{
            console.log("if state pre")
            //console.log(context.user)
            const listcheck = await user.find({})
            if(JSON.stringify(listcheck[0].userName) == JSON.stringify(args.userName)&&
            JSON.stringify(listcheck[0].password) == JSON.stringify(args.password)){
                return ["bill","jim"]
            } 
            //if (user.type.includes("admin")) return ['will', 'james'];
            //console.log("if state post")

            return ['bob', 'jake'];           
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
        addUserlisting: async(parent,args) =>{

           
            console.log('"admin"')

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
                throw new Error("username and password have no admin privalge")

                console.log("wrong username or password")
            }



            console.log(newListing)
        }
        
    }
}
