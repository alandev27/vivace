import type { RequestHandler } from '../$types';

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = (async ({ params }) => {
    try {
        let hash = params.slug.toString();

        let user = await prisma.user.findUniqueOrThrow({
            where: {
                hash: hash,
            },
        });

        if (!user)  return new Response('error');

        let root = await prisma.folder.findUniqueOrThrow({
            where: {
                id: user.rootId,
            }
        });
        return json({
            hash: user.hash,
            username: user.username,
            root: root.hash,
        });
    } catch (error) {
        return new Response('error');
    }
}) satisfies RequestHandler;