// src/environments/environment.d.ts
declare module 'src/environments/environment' {
    export const environment: {
        production: boolean;
        firebaseConfig: {
            apiKey: string;
            authDomain: string;
            projectId: string;
            storageBucket: string;
            messagingSenderId: string;
            appId: string;
            measurementId?: string;
        };
    };
}
