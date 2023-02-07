import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getEvents } from '../api/Api';
import { formatDate, getDate } from '../functions/Functions';
import { AuthContext } from '../context/AuthContext';
import { DatePicker } from '../components/DatePicker';
import { DataTable } from '../components/DataTable';

export const SrsSta = () => {
    const { logOut } = useContext(AuthContext);

    const [start, setstart] = useState<formatDate>(getDate());
    const [end, setend] = useState<formatDate>(getDate());

    // const [all, setAll] = useState<Array<Array<string>>>([]);
    const [srs, setsrs] = useState<Array<Array<string>> | undefined>([]);
    const [srsPending, setsrsPending] = useState<Array<Array<string>> | undefined>([]);
    const [sta, setsta] = useState<Array<Array<string>> | undefined>([]);

    const [interv, setinterv] = useState<boolean>(false);
    const [oneDay, setoneDay] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<{ isStart: boolean, isEnd: boolean, isIndividual: boolean }>({ isStart: false, isEnd: false, isIndividual: false });

    const Events = useQuery(['SrsSta'], () => getEvents({ start: start.date.date, end: end.date.date, events: 'SrsSta' }), {
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setsrs(data.srs);
            setsta(data.sta);
            setsrsPending(data.srsPending);
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
        console.log('consulta');

    }, [interv, oneDay]);

    const columns = ["FECHA HORA", "CÓDIGO DE ALARMA", "ABONADO", "CLIENTE"];
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

                            <div className='table'>
                                <DataTable containerTable columns={columns} data={(srs) ? srs : []} label='SRS' key={'SRSDT'} />
                            </div>
                            <div className='table'>
                                <DataTable containerTable columns={columns} data={(sta) ? sta : []} label='STA' key={'STADT'} />
                            </div>
                            {/* <div className='table'>
                                <DataTable containerTable columns={columns} data={all} label='all' key={'ALLDT'} />
                            </div> */}
                            <div className='table'>
                                <DataTable containerTable columns={columns} data={(srsPending) ? srsPending : []} label='SRS PENDIENTES' key={'SRS PENDIENTESDT'} />
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
