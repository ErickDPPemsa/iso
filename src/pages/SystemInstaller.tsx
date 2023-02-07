import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getAccounts } from '../api/Api';
import { AuthContext } from '../context/AuthContext';
import { DataTable } from '../components/DataTable';

export const SystemInstaller = () => {
    const { logOut } = useContext(AuthContext);

    const [accountsWithPanel, setaccountsWithPanel] = useState<Array<Array<string>>>([]);
    const [accountsWithOutPanel, setaccountsWithOutPanel] = useState<Array<Array<string>>>([]);

    const Accounts = useQuery(['SystemInstaller'], () => getAccounts(), {
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setaccountsWithPanel(data.accountsWithPanel.map(acc => [acc.CodigoAbonado, acc.CodigoCte, acc.Nombre, acc.DP!]));
            setaccountsWithOutPanel(data.accountsWithOutPanel.map(acc => [acc.CodigoAbonado, acc.CodigoCte, acc.Nombre, 'Sin Panel']));
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
        Accounts.refetch();
    }, []);

    const columns = ["ABONADO", "CLIENTE", "NOMBRE", "PANEL"];
    return (
        <div className='fullPage'>
            <div className='containerCalendar' style={{ justifyContent: 'flex-end' }}>
                <div className='actual'>
                    <p>Actualizar</p>
                    <i className="material-icons" onClick={() => Accounts.refetch()}>refresh</i>
                </div>
            </div>
            <div className='containerTables'>
                {
                    (Accounts.isLoading || Accounts.isFetching)
                        ?
                        <div style={{ width: '100%', height: '100%' }} className='centerFlex'>
                            <div className='spin'></div>
                        </div>
                        :
                        <>
                            <div className='table'>
                                <DataTable containerTable columns={columns} data={accountsWithPanel ? accountsWithPanel : []} label='SISTEMAS INSTALADOS' key={'TESEDT'} />
                            </div>
                            <div className='table'>
                                <DataTable containerTable columns={columns} data={accountsWithOutPanel ? accountsWithOutPanel : []} label='SIN SISTEMA REGISTRADO' key={'TESSDT'} />
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

