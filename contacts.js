import * as fs from "fs/promises";
import path from "path";
import createDirnameAndFilename from "./lib/dirname.js";
import { customAlphabet } from "nanoid";

const { __dirname } = createDirnameAndFilename(import.meta.url);

const contactsPath = path.join(__dirname, "./db/contacts.json");

const nanoid = customAlphabet("1234567890", 3);

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const itemById = parsedData.find((item) => item.id === contactId);
    console.table(itemById);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredData));
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const newContact = { id: Number(nanoid()), name, email, phone };
    parsedData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
  } catch (error) {
    console.log(error);
  }
}
