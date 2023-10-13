import type { RequestHandler } from './$types';

import { transport } from '$lib/server/email';
import { json }   from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { hash }   from '$lib/server/encrypt';

export const POST = (async ({ request }) => {
    try {
        let body = await request.json();

        let username: string | undefined = body.username?.toString();
        let password: string | undefined = body.password?.toString();
        let email:    string | undefined = body.email?.toString();

        if(!username || !password || !email) return json({
            success: false,
            message: 'Account credentials have not all been provided.'
        });
        if((await prisma.user.findMany({where: {username}})).length)    return json({
            success: false,
            message: 'Sorry, the provided username has already been taken. Please choose a new username.',
        });
        if((await prisma.user.findMany({where: {email}})).length)   return json({
            success: false,
            message: 'Sorry, the provided email has already been taken. Please choose a new email.',
        });

        let user = await prisma.user.create({
            data: {
                username: username,
                password: await hash(password),
                root: {
                    create: {
                        name: 'root',
                    }
                },
                profile: {
                    create: {},
                },
                email: email,
            },
        });
        // transport.sendMail({
        //     from: '"Team Vivace" <no-reply@vivace.com>', // sender address
        //     to: email, // list of receivers
        //     subject: 'Vivace - Email Verification', // Subject line
        //     text: `Dear ${username},
        //     Please use this link to activate your Vivace account: https://localhost:5177/api/user/verify/${user.hash}
        //     Kind regards,
        //     The Vivace Team`,
        // });
        return json({
            success: true,
            message: 'Your account has been successfully created! Check our account verification email to activate your account.',
        });
    } catch (error) {
        return json({
            success: false,
            message: `Sorry, we were not able to create your account. please try again later. Error: ${error}`
        });
    }
}) satisfies RequestHandler;