
export const formatdate = (date: String): string => {

    let year = date.slice(0,4)
    let month = date.slice(5,7)
    let day = date.slice(8,10)
    let hour = date.slice(11,13)
    let minute = date.slice(14,16)

    "2024-05-30T12:29:17.117099Z"

    return `${day}/${month}/${year} - ${hour}:${minute}`;
}