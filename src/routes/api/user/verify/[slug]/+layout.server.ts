import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load = (async ({ params }) => {
    let slug = params.slug;
    
    let user = await prisma.user.findUnique({
        where: {
            hash: slug,
        },
    });

    if (!user)  return {
        success: false,
        message: 'Verification link is invalid.',
    };

    await prisma.user.update({
        where: {
            hash: slug,
        },
        data: {
            activated: true,
        },
    });

    return {
        success: true,
        message: 'Verification complete, you may login to your account now! Redirecting you to the login page...'
    }
}) satisfies LayoutServerLoad;