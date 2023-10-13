import type { RequestHandler } from "./$types";

import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';
import { getFullPathDisplay, getFolderSize, getFullPath } from "$lib/server/parent";

export const GET = (async ({ params }) => {
    let hash = params.slug.toString();

    try {
        let folders = await prisma.folder.findMany({
            where: {
                parent: {
                    hash: hash,
                }
            },
        });

        for(let i = 0; i < folders.length; i++) {
            let { id, ...other }: any = folders[i];

            folders[i] = other;
        }

        for (let i = 0; i < folders.length; i++) {
            let folder = {
                ...folders[i],
                size: await getFolderSize(folders[i].id, 0),
            }

            folders[i] = folder;
        }

        let files = await prisma.file.findMany({
            where: {
                parent: {
                    hash: hash,
                }
            },
        })

        for(let i = 0; i < files.length; i++) {
            let { id, ...other }: any = files[i];

            files[i] = other;
        }

        let id = (await prisma.folder.findUniqueOrThrow({
            where: {
                hash: hash,
            }
        })).id;

        await getFullPathDisplay(id, []);

        return json({
            directory: {
                raw: await getFullPath(id, []),
                parsed: await getFullPathDisplay(id, []),
            },
            folders: folders,
            files: files,
        });
    } catch {
        return json({
            success: false,
        });
    }
}) satisfies RequestHandler;