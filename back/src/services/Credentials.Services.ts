import CredentialDto from "../dto/Credential.Dto";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/Credential.Repository";

export default {
    createUserCredentialsService: async(credentialsData: CredentialDto): Promise<Credential> => {
        
        const newCredential: Credential = await CredentialRepository.createCredentials(credentialsData);
        await CredentialRepository.save(newCredential);
        //retorn el id de las credentials creada        
        return newCredential;
    },
    verifyCredentialsService: async(verifyCredentials: CredentialDto): Promise<number> => {     
        // busco el username
        const userCredentials = await CredentialRepository.findOneBy({
            username: verifyCredentials.username,
        });
        
        if (!userCredentials)
        throw({
            message: "El Usuario no existe",
            code: 404,
            error: "User Not Found"
        });
        
        if (verifyCredentials.password !== userCredentials.password)
        throw({
            message: "La contraseña es incorrecta",
            code: 404,
            error: "Invalid Password"
        });
        return userCredentials.id;
    },
};

