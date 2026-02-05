import bcrypt from'bcrypt';

export const signUpHash = async (password) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error(error)
    }
}

export const loginHash = async (password, hash) =>{
    return await bcrypt.compare(password, hash)
}