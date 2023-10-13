// COMPONENTS: User auth

import type { LayoutServerLoad } from './$types';

import { getUser } from '$lib/session';

export const load = (async ({ fetch, cookies }) => {
    let session = cookies.get('session');
    let userId = await getUser(session ? session : '');

    if (!userId) {
        return {
            user: {
                verified: false,
            }
        }
    }

    let start = new Date();
    let res = await fetch(`/api/user/auth/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    let user = await res.json();
    
    return {
        user: {
            ...user,
            verified: true,
        },
    }
}) satisfies LayoutServerLoad;

