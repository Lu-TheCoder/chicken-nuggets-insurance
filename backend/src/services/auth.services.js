const signupUser = async (name, email, password) =>{
    //query for adding user
    const user = await _getuser(email);

    if(user.legth > 0) {
        throw new Error("User already exits")
    }

    //query the changes in the table
    // const results = await query 

    return results[0];
}

const loginUser = async(email, password) =>{
    //query to find the user in the db
}

const _getUser= async (email) =>{
    //get user by email
}



module.exports = {
    signupUser,
    loginUser
}