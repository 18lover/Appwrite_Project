import React from 'react'
import { Client , Databases , Account } from 'appwrite'

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("668615f1003d2d47ad54")

export const  account = new Account(client)


export const databases = new Databases(client,"6686173e0035959fabf4")