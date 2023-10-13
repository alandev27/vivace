import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ fetch, params }) => {
    let res = await fetch(`/api/cloud/${params.slug}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    let uploads = await res.json();
    
    // TODO: error check
    uploads.directory.parsed.pop();

    if (uploads.directory.parsed.length > 1)  uploads.directory.parsed.reverse();

    return {
        reference: params.slug,
        uploads: uploads,
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    upload: async ({fetch, request}) => {
        const data = await request.formData();

        let res = await fetch('/api/cloud', {
            method: 'POST',
            body: data,
        });

        return await res.json();
    },
};

