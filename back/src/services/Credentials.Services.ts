import { CredentialCheap } from "../config/data-source";
import CredentialDto from "../dto/Credential.Dto";
import { Credential } from "../entities/Credential";
import ICredential from "../interfaces/ICredential";

export default {
    createUserCredentials: async(credentialsData: CredentialDto): Promise<Credential> => {
        
        const newCredential: ICredential = await CredentialCheap.create(credentialsData);
        await CredentialCheap.save(newCredential);
        //retorn el id de las credentials creada        
        return newCredential;
    },
    verifyCredentials: async(verifyCredentials: CredentialDto) => {     
        // busco el username
        const userCredentials = await CredentialCheap.findOneBy({
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

