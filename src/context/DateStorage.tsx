import { GET_DATE_TRANS } from "@/helpers/api";
import { Item } from "@/types/userTypes";
import React from "react";

interface DateStorageContext {
    children: React.ReactNode;
};

interface dateContextProps {
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
    pegarMesAtual: () => string;
    newDateAdjusted: (dateField: string) => Date;
    formateMesAtual: (mesAtual: string) => string;
    filterListByMonth: (list: Item[], date: string) => Item[];
    formatdate: (date: Date) => string;
    addZeroToDate: (n: number) => void;
    setRangeMounth: (taregtDate: string) => void;
    setCurrentMonth:React.Dispatch<React.SetStateAction<string>>;
    getTransByDate: (startDate:string, endDate:string, token: string) => any;
    setMesAtual:React.Dispatch<React.SetStateAction<string>>;
    setStartDate:React.Dispatch<React.SetStateAction<string>>;
    setEndDate:React.Dispatch<React.SetStateAction<string>>;
    startDate:string;
    endDate:string;
    currentMonth:string;
    currentDate: string;
    mesAtual: string;
    
};

export const DateContext = React.createContext<dateContextProps>({} as dateContextProps);
export const DateStorage: React.FC<DateStorageContext> = ({ children }) => {



    const [currentDate, setCurrentDate] = React.useState<string>('');
    const [currentMonth, setCurrentMonth] = React.useState<string>('');
    const [mesAtual, setMesAtual] = React.useState(window.localStorage.getItem('mes') || pegarMesAtual())
    const [startDate, setStartDate] = React.useState<string>(getStartDate(mesAtual));
    const [endDate, setEndDate] = React.useState<string>(getEndDate(mesAtual));

    function pegarMesAtual() {
        let now = new Date()
        return formatdate(now)
        //return(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`)  
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
        const ano = date.getFullYear();
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const dia = date.getDate().toString().padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        return dataFormatada;
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

    function getStartDate(taregtDate: string){
        const rgx =(/-\d+$/);
        let dataInicial = taregtDate.replace(rgx, "-01");
        return dataInicial
    }
    function getEndDate(taregtDate: string){
        const rgx =(/-\d+$/);
        let dataFinal
        let mounth = dataFinal = taregtDate.substring(5,7)
        switch (mounth) {
            case '01':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '02':
                dataFinal = taregtDate.replace(rgx, "-28");
                break;
            case '03':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '04':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '05':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '06':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '07':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '08':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '09':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '10':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '11':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '12':
                dataFinal = taregtDate.replace(rgx, "-31");        
                break;
        
            default:
                break;
        }
        
        return dataFinal
    }

    function setRangeMounth(taregtDate: string){
        const rgx =(/-\d+$/);
        let dataInicial = taregtDate.replace(rgx, "-01");
        setStartDate(dataInicial)
        let dataFinal;
        let mounth = dataFinal = taregtDate.substring(5,7)
        switch (mounth) {
            case '01':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '02':
                dataFinal = taregtDate.replace(rgx, "-28");
                break;
            case '03':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '04':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '05':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '06':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '07':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '08':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '09':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '10':
                dataFinal = taregtDate.replace(rgx, "-31");
                break;
            case '11':
                dataFinal = taregtDate.replace(rgx, "-30");
                break;
            case '12':
                dataFinal = taregtDate.replace(rgx, "-31");        
                break;
        
            default:
                break;
        }
        setEndDate(dataFinal)
    }
    async function getTransByDate(startDate:string, endDate:string, token: string) {
        const { url, option } = GET_DATE_TRANS(startDate, endDate, token);
        const response = await fetch(url, option);
        const json = await response.json().catch(()=>{return undefined});
        return json;
      }

    return (
        <DateContext.Provider value={{
            setCurrentDate,
            newDateAdjusted,
            pegarMesAtual,
            formateMesAtual,
            filterListByMonth,
            formatdate,
            addZeroToDate,
            setRangeMounth,
            setCurrentMonth,
            getTransByDate,
            setMesAtual,
            setStartDate,
            setEndDate,
            mesAtual,
            startDate,
            endDate,
            currentMonth, 
            currentDate
        }}>
            {children}
        </DateContext.Provider>
    )
}