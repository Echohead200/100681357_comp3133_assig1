const user = require("./models/user")
const listing = require("./models/listing")

exports.resolvers ={
    Query:{
        getUsers: async (parent,args)=>{
            return user.find({})
        },
        getUserbyId: async (parent,args)=>{
            return user.findById(args.id)
        },
        getUsersbyname: async (parent,args) =>{
            console.log(args)
            return user.findOne({userName: args.userName})
        },
        getListings: async (parent,args)=>{
            return listing.find({})
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
            console.log(args)

            //const testdata = await user.findOne({userName: arg.username})

            //console.log(testdata)
            if(args){
                console.log("works for now!")

            }else{
                console.log("doesn't work yet")
            }
            console.log("stop here")

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
            console.log(newListing)
        }
        
    }
}
