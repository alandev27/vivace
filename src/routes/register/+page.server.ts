import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ fetch, request }) => {
        const data = await request.formData();

        let res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.get('username')?.toString(),
                password: data.get('password')?.toString(),
                email: data.get('email')?.toString(),
            }),
        });

        return await res.json();
    }
}