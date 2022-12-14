const {nanoid} = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath); 
        return JSON.parse(data);
    } catch (error) {
        console.log(error.message)
    } 
}

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find(item => item.id === contactId);

        return result || null;   
    } catch (error) {
        console.log(error.message)
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(item => item.id === contactId);

        if(index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await updateContacts(contacts);

        console.table(contacts);
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        }
        contacts.push(newContact);
        await updateContacts(contacts);

        console.table(contacts);
        return newContact
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}



























// const updateById = async(id, data) => {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === id);
//     if(index === -1) {
//         return null;
//     }

//     contacts[index] = {id, ...data};
//     await updateContacts(contacts);

//     return contacts[index]
// }

