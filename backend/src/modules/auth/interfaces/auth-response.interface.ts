export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
    };
    token?: string; 
}