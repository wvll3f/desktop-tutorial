export const URL_API = 'http://localhost:8080'

export function TOKEN_POST(body: Object) {
    return {
        url: URL_API + '/login',
        option: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}
export function TRANS_POST(body: Object, token: string) {
    return {
        url: URL_API + '/trans',
        option: {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}
export function GET_USER(token: String) {
    return {
        url: URL_API + '/user',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function POTS_USER(body: Object) {
    return {
        url: URL_API + '/register',
        option: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}
export function GET_TRANS(token: String) {
    return {
        url: URL_API + '/trans',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_TRANS_ID(token: String, id: number) {
    return {
        url: URL_API + '/trans' + '/' + id,
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function EDIT_TRANS_ID(token: String, id: number, body:Object) {
    return {
        url: URL_API + '/trans/'+ id,
        option: {
            method: 'PATCH',
            headers: {
                authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
}
export function DELETE_TRANS_ID(token: String, id: number) {
    return {
        url: URL_API + '/trash/' + id,
        option: {
            method: 'DELETE',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_BALANCE(token: string) {
    return {
        url: URL_API + '/balance',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_OUTFLOWS(token: string) {
    return {
        url: URL_API + '/outflows',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_INFLOWS(token: string) {
    return {
        url: URL_API + '/inflows',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_METODOSPAGAMENTO(token: string) {
    return {
        url: URL_API + '/metodos',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_CATEGORIAS(token: string) {
    return {
        url: URL_API + '/categoria',
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}