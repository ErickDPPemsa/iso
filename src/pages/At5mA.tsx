import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getEvents } from '../api/Api';
import { formatDate, getDate, getMinutes } from '../functions/Functions';
import { AuthContext } from '../context/AuthContext';
import { DatePicker } from '../components/DatePicker';
import { DataTable } from '../components/DataTable';

export const At5mA = () => {
    const { logOut } = useContext(AuthContext);
    const [start, setstart] = useState<formatDate>(getDate());
    const [end, setend] = useState<formatDate>(getDate());
    const [at5ma, setat5ma] = useState<Array<Array<string>> | undefined>([]);
    const [interv, setinterv] = useState<boolean>(false);
    const [oneDay, setoneDay] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<{ isStart: boolean, isEnd: boolean, isIndividual: boolean }>({ isStart: false, isEnd: false, isIndividual: false });

    const Events = useQuery(['At5mA'], () => getEvents({ start: start.date.date, end: end.date.date, events: 'At5mA' }), {
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setat5ma(data.at5ma);
            setinterv(false);
            setoneDay(false);
        },
        onError: error => {
            if (error !== null) {
                Swal.fire({ title: 'ERROR', text: `${error}`, icon: 'error' });
                if (`${error}`.includes('token no valido')) {
                    localStorage.clear();
                    logOut();
                }
            }
        }
    });

    useEffect(() => {
        if (interv === true || oneDay === true) {
            Events.refetch();
        }
    }, [interv, oneDay]);

    const columns = ["DESCRIPCÓN ALARMA", "ABONADO", "CLIENTE", "FECHA HORA", "FECHA HORA PRIMERA TOMA", "MINUTOS", 'mon'];

    return (
        <div className='fullPage'>
            <div className='containerCalendar'>
                <div className='range'>
                    <div className='containerDatePicker'>
                        <DatePicker
                            key={`start`}
                            label={'Inicio'}
                            date={start}
                            isOpen={isOpen.isStart}
                            setDate={setstart}
                            maxDate={end.DATE}
                            onOpen={() => setIsOpen({ ...isOpen, isStart: true })}
                            onClose={() => setIsOpen({ ...isOpen, isStart: false })}
                        />

                        <DatePicker
                            key={`end`}
                            label={'Final'}
                            date={end}
                            isOpen={isOpen.isEnd}
                            setDate={setend}
                            onOpen={() => setIsOpen({ ...isOpen, isEnd: true })}
                            onClose={() => setIsOpen({ ...isOpen, isEnd: false })}
                            minDate={start.DATE}
                        />

                    </div>
                    <button className='btn' onClick={() => { setinterv(true); setstart(start); setend(end); }} >Consultar</button>
                </div>
                <div className='actual'>
                    <DatePicker
                        key={`individual`}
                        label={'individual'}
                        date={getDate()}
                        isOpen={isOpen.isIndividual}
                        onOpen={() => setIsOpen({ ...isOpen, isIndividual: true })}
                        onClose={() => setIsOpen({ ...isOpen, isIndividual: false })}
                        individual={{ setend, setstart, setoneDay }}
                        isHided
                    />
                    <p>selecione un dia</p>
                    <i className="material-icons" onClick={() => setIsOpen({ ...isOpen, isIndividual: true })}>event</i>
                </div>
            </div>
            <div className='containerTables'>
                {
                    (Events.isLoading || Events.isFetching)
                        ?
                        <div style={{ width: '100%', height: '100%' }} className='centerFlex'>
                            <div className='spin'></div>
                        </div>
                        :
                        <>
                            <div style={{ width: '100%', height: '100%' }} className='centerFlex'>
                                <div style={{ width: '80%' }}>
                                    <DataTable columns={columns} data={(at5ma) ? at5ma : []} label='AT5MA' key={'AT5MADT'} />
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

