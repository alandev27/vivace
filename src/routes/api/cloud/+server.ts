// TODO: Fix code, split folder and file creation into separate functions, make file and folder CRUD

import type { RequestHandler } from "./$types";

import { prisma } from '$lib/server/prisma';
import { getFullPath } from "$lib/server/parent";
import { types as fileTypes } from '$lib/filetypes';
import { json } from '@sveltejs/kit';

import { writeFile, mkdir } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import * as mime from 'mime-types';
import { kMaxLength } from "buffer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const POST = (async ({ request }) => {
    console.log(request.headers.get('Content-Type'));

    let body = await request.formData();
   
    let userHash = body.get('hash')?.toString();
    let parentHash = body.get('parent')?.toString();
    let parentId = (await prisma.folder.findUniqueOrThrow({
        where: {
            hash: parentHash,
        }
    })).id;
    let name = body.get('name')?.toString();
    let type = body.get('type')?.toString();

    if (!name || !type || !parentId || !userHash)  return json({ 
        success: false, 
        message: 'Not all fields have been provided.' 
    });

    if (type == 'file') {
        let file = body.get('file');
        let fileType = 'txt';
        if (!file)  return json({ 
            success: false, 
            message: 'No file received', 
        });

        // TODO type checking
        let data, buffer, size;
        if (file instanceof Blob) {
            data = await file.arrayBuffer();
            buffer = Buffer.from(data);        
            size = file.size;
            fileType = file.type;
        } else if (typeof file === 'string') {
            size = 0;
            buffer = file.toString();
        } else {
            return json({ 
                success: false, 
                message: 'Unrecognized file type.',
            });
        }

        if (!(fileType in fileTypes)) {
            return json({
                success: false,
                message: `File type ${fileType} allowed`,
            })
        }

        let path = await getFullPath(parentId, []);
        let user = await prisma.user.findUnique({
            where: {
                hash: userHash.toString(),
            },
        });
        let save = await prisma.file.create({
            data: {
                name: name,
                size: size,
                parent: {
                    connect: {
                        id: parentId,
                    },
                },
                type: fileType,
            }
        })
        if (!user)  return json({ 
            success: false, 
            message: 'User not logged in/verified.', 
        });
        writeFile(`static/user/${userHash}${path}/${save.hash}.${mime.extension(fileType)}`, buffer, () => {
            console.log(`static/user/${userHash}${path}/${save.hash}.${mime.extension(fileType)}`)
        });
    } else if (type == 'folder') { 
        let user = await prisma.user.findUnique({
            where: {
                hash: userHash,
            },
        });
        let path = await getFullPath(parentId, []);

        let save = await prisma.folder.create({
            data: {
                name: name,
                parent: {
                    connect: {
                        id: parentId,
                    },
                },
            }
        });
        if (!user)  return json({ 
            success: false,
            message: 'User not logged in/verified.', 
        });
        mkdir(`static/user/${userHash}${path}/${save.hash}`, { recursive: true }, () => {
            console.log(join(__dirname, `/static/user/${userHash}${path}/${save.hash}`))
        });
    }
    return json({ 
        success: true, 
        message: `The ${body.get('type')}(s) have been successfully uploaded.`, 
    });
}) satisfies RequestHandler;