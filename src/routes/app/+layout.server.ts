import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit'

export const load = (async ({ parent }) => {
    let { user } = await parent();

    if (!user.verified) throw redirect(307, '/login');
}) satisfies LayoutServerLoad;