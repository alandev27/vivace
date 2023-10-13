import { prisma } from '$lib/server/prisma';
import { compare } from '$lib/server/encrypt';

// DESC: Finds the session that is linked to the user.
export const getUser = async (session: string): Promise<string> => {

    let sessions = await prisma.session.findMany();

    for (let i = 0; i < sessions.length; i++) {
        if (await compare(sessions[i].id, session)) {

            return (await prisma.user.findUniqueOrThrow({
                where: {
                    id: sessions[i].userId,
                },
            })).hash;

        }
    }
    

    return '';
}