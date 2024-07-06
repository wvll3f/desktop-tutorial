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
export function GET_TRANS_BY_DATE(token: String) {
    return {
        url: URL_API + '/transacoesdate?dataInicial=2024-07-01&dataFinal=2024-07-30',
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
        url: URL_API + '/updatetrans/'+ id,
        option: {
            method: 'PUT',
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
export function GET_BALANCE(startDate:string, endDate:string, token: string) {
    return {
        url: URL_API + `/balance?dataInicial=${startDate}&dataFinal=${endDate}`,
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_OUTFLOWS(startDate:string, endDate:string, token: string) {
    return {
        url: URL_API + `/outflows?dataInicial=${startDate}&dataFinal=${endDate}`,
        option: {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    };
}
export function GET_INFLOWS(startDate:string, endDate:string, token: string) {
    return {
        url: URL_API + `/inflows?dataInicial=${startDate}&dataFinal=${endDate}`,
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
export function GET_DATE_TRANS(startDate:string, endDate:string, token: string) {
    return {
        url: URL_API +`/transacoesdate?dataInicial=${startDate}&dataFinal=${endDate}` ,
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