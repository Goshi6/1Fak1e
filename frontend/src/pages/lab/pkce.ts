// frontend/src/pages/lab/pkce.ts

// Генерация случайной строки для code_verifier
export function generateCodeVerifier(length = 64): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let result = "";
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    array.forEach((x) => {
        result += chars[x % chars.length];
    });
    return result;
}

// Преобразование в base64url
function base64UrlEncode(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    let base64 = window.btoa(binary);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Генерация code_challenge из verifier
export async function generateCodeChallenge(
    verifier: string,
): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
}

// Запуск PKCE-флоу Faceit
export async function startFaceitPkceFlow(clientId: string): Promise<void> {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    // Сохраняем verifier, чтобы потом отдать бэкенду
    window.sessionStorage.setItem("faceit_code_verifier", verifier);

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: "https://api.fak1e-lab.ru/auth/faceit/callback",
        response_type: "code",
        scope: "openid profile",
        code_challenge: challenge,
        code_challenge_method: "S256",
    });

    window.location.href = `https://accounts.faceit.com/oauth2/authorize?${params.toString()}`;
}
