import { Item } from "@/types/userTypes";
import React from "react";

interface DateStorageContext {
    children: React.ReactNode;
};

interface dateContextProps {
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
    pegarMesAtual: () => void;
    newDateAdjusted: (dateField: string) => Date;
    formateMesAtual: (mesAtual: string) => string;
    filterListByMonth: (list: Item[], date: string) => Item[];
    formatdate:(date:Date) => string;
    currentDate: string;
};

export const DateContext = React.createContext<dateContextProps>({} as dateContextProps);
export const DateStorage: React.FC<DateStorageContext> = ({ children }) => {

    const [currentDate, setCurrentDate] = React.useState<string>('');

    function pegarMesAtual() {
        console.log('rodando')
        let now = new Date();
        return setCurrentDate(formateMesAtual(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay}`))
    }

    function filterListByMonth(list: Item[], date: string) {
        let newList: Item[] = [];
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

    function formatdate(date: Date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
    }

    function addZeroToDate(n: number) { n < 10 ? `0${n}` : `${n}` }

    const formateMesAtual = (mesAtual: string) => {
        let [year, month] = mesAtual.split('-');
        let monthlist = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return `${monthlist[parseInt(month) - 1]} de ${year}`;
    }

    function newDateAdjusted(dateField: string) {
        let [year, month, day] = dateField.split('-')
        return new Date(parseInt(year), parseInt(month), parseInt(day))
    }

    return (
        <DateContext.Provider value={{ 
            setCurrentDate, 
            newDateAdjusted, 
            pegarMesAtual, 
            formateMesAtual, 
            filterListByMonth,
            formatdate,
            currentDate 
            }}>
            {children}
        </DateContext.Provider>
    )
}