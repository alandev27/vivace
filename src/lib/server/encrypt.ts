import bcrypt from 'bcrypt';

export const hash = async (raw: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(raw, salt);
}

export const compare = async (raw: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(raw, hashed);
}