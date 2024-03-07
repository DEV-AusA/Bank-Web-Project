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
    verifyCredentialsService: async(verifyCredentials: CredentialDto) => {     
        // busco el username
        const userCredentials = await CredentialRepository.findOneBy({
            username: verifyCredentials.username,
            // password: verifyCredentials.password
        });        
        if (userCredentials) {   
            if (verifyCredentials.password === userCredentials.password) {
                return userCredentials.username;
            }
            else {
                throw new Error("La contraseña es incorrecta");
            }
        }
        else {
            throw new Error(`El usuario no existe`)
        }
    },
};

