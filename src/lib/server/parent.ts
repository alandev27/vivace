import { prisma } from '$lib/server/prisma';

interface DirItem {
    name: string,
    hash: string,
}

export const getFullPath = async (parentId: number, arr: string[]): Promise<string[] | string> => {
    let folder = await prisma.folder.findUnique({
        where: {
            id: parentId,
        },
    });
    if (!folder)    throw 'folder not found';
    if (!arr.length)    arr.push(folder.hash);
    if (folder.parentId)  {
        let parent = await prisma.folder.findUnique({
            where: {
                id: folder.parentId,
            },
        });
        if (!parent)    throw 'parent not found';
        arr.push(parent.hash);
        return await getFullPath(parent.id, arr);
    }
    let res = '';
    for (let i = arr.length - 1; i >= 0; i--) {
        res += `/${arr[i]}`;
    }
    return res;
}

export const getFolderSize = async (parentId: number, total: number): Promise<number> => {
    let folders = await prisma.folder.findMany({
        where: {
            parentId: parentId,
        },
    });

    let files = await prisma.file.findMany({
        where: {
            parentId: parentId,
        },
    });

    let sum = total;

    for(let i = 0; i < files.length; i++) {
        sum += files[i].size;
    }
    for (let i = 0; i < folders.length; i++) {
        sum = await getFolderSize(folders[i].id, sum)
    }
    return sum;
}

export const getFullPathDisplay = async (parentId: number, arr: DirItem[]): Promise<DirItem[]> => {
    let folder = await prisma.folder.findUnique({
        where: {
            id: parentId,
        },
    });
    if (!folder)    throw 'folder not found';
    if (!arr.length)    arr.push({
        name: folder.name,
        hash: folder.hash,
    });
    if (folder.parentId)  {
        let parent = await prisma.folder.findUnique({
            where: {
                id: folder.parentId,
            },
        });
        if (!parent)    throw 'parent not found';
        arr.push({
            name: parent.name,
            hash: parent.hash,
        });
        return await getFullPathDisplay(parent.id, arr);
    }
    
    return arr;
}
