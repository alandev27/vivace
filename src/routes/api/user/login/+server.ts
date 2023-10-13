import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { hash, compare }   from '$lib/server/encrypt';

export const POST = (async ({ request, cookies }) => {
    try {

        let body = await request.json();

        if (!body.username || !body.password) return json({
            success: false,
            message: 'All account credentials have not been provided.'
        });

        let username: string | undefined = body.username?.toString();
        let password: string | undefined = body.password?.toString();

        if (!username || !password) return json({
            success: false,
            message: 'All account credentials have not been provided.'
        });

        let res = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });

        if (res) {
            if (!await compare(password, res.password))  return json({
                success: false,
                message: 'Username and/or password invalid, please try again.'
            });

            console.log(password, res.password);

            if (!res.activated)  return json({
                success: false,
                message: 'Your account has not yet been verified, please find the account activation link sent to you through email.'
            })

            let session = await prisma.session.create({
                data: {
                    user: {
                        connect: {
                            id: res.id,
                        },
                    },
                    expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            cookies.set('session', await hash(session.id), {
                path: '/',
                sameSite: 'strict',
                secure: false,
                maxAge: 60 * 60 * 24 * 7,
            });
            
            return json({
                success: true,
                message: 'Successfuly logged in.',
            })
        } else return json({
            success: false,
            message: 'User doesn\'t exist, please try again.'
        });
    } catch (error) {
        return json({
            success: false,
            message: `Sorry, we were not able to login you into your account, please try again later. Error: ${error}`,
        });
    }
}) satisfies RequestHandler;