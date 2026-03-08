export interface User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    name: string;
    image?: string | null;
}