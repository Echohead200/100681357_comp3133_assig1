const user = require("./models/user")

exports.resolvers ={
    Query:{
        getUsers: async (parent,args)=>{
            return user.find({})
        },
        getUserbyId: async (parent,args)=>{
            return user.findById(args.id)
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
        }
    }
}
