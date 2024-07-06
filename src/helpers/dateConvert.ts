interface Item{
    date: Date;
    category: string;
    title: string;
    value: number;
}

export const getCurrentMonth = () => {
    let now = new Date();
    let current = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay}`
    return current;
}

export const filterListByMonth = (list: Item[], date: string): Item[] => {
    let newList: Item[] = [];''
    let [year, month] = date.split('-');

    for (let i in list) {
        if (
            list[i].date.getFullYear() === parseInt(year) &&
            (list[i].date.getMonth()) === parseInt(month)
        ) {
            newList.push(list[i]);
        }
    }

    return newList;
}

export const formatdate = (date: Date): string => {

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
}

const addZeroToDate = (n: number): string => n < 10 ? `0${n}` : `${n}`;

export const formateMesAtual = (mesAtual: string): string => {

    let [year, month] = mesAtual.split('-');
    let monthlist = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return `${monthlist[parseInt(month)-1]} de ${year}`; 

  }

  export const newDateAdjusted = (dateField: string) => {
    let [year, month, day] = dateField.split('-')
    return new Date(parseInt(year), parseInt(month), parseInt(day))
  }

