import { AppDataSource } from "../config/data-source";
import CredentialDto from "../dto/Credential.Dto";
import { Credential } from "../entities/Credential";

const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    createCredentials: async function (credentialsData: CredentialDto): Promise<Credential>{
        const username = await this.findOneBy({ username: credentialsData.username});
        if (credentialsData.username === username?.username) {
            throw({
                message: `Ya existe un usuario con el nombre ${credentialsData.username}, ingresa otro nombre de usuario.`,
                code: 404,
                status: "Invalid User Name"
            })
        }
        const credentials: Credential = await this.create(credentialsData);
        await CredentialRepository.save(credentials); 
        
        return credentials;

    }
});
export default CredentialRepository