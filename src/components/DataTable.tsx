import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material'
import { color } from '../helpers/herpers';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
const theme = createTheme({
    unstable_strictMode: true,
    palette: {
        primary: {
            main: color.background,
            dark: color.background,
            light: color.background,
            contrastText: color.background
        },
        secondary: {
            main: color.background,
            dark: color.background,
            light: color.background,
            contrastText: color.background
        },
        action: {
            active: color.background,
            disabled: color.PrimaryLight,
            hover: color.background,
        },
        text: {
            primary: color.SecondaryLight,
            secondary: color.background,
        },
        info: {
            main: color.SecondaryLight
        }
    },
    mixins: {
        toolbar: {}
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    color: color.background
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    height: '50px',
                    minHeight: '50px',
                    backgroundColor: color.PrimaryDark,
                    color: color.background,
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                colorAction: color.background,
                colorPrimary: color.background,
                colorSecondary: color.PrimaryDark,
                root: {
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    padding: 10,
                    backgroundColor: color.PrimaryDark,
                    color: color.background,
                },
                body: {
                    minHeight: '10px',
                    maxHeight: '20px',
                    padding: '5px',
                    fontSize: '1rem',
                    color: color.PrimaryDark,
                    fontWeight: '500'
                },
                footer: {
                    padding: 0,
                    backgroundColor: color.PrimaryDark,
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    paddingRight: '10px'
                },

            }
        }
    }
});
const options: MUIDataTableOptions | undefined = {
    filter: false,
    selectableRows: 'none',
    filterType: 'dropdown',
    responsive: 'vertical',
    rowsPerPage: 10,
    download: 'true',
    print: false,
    viewColumns: false,
    textLabels: {
        pagination: {
            next: "Página siguinte",
            previous: "Página anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
        },
        toolbar: {
            downloadCsv: 'Descargar',
            search: 'Buscar'
        },
        body: {
            noMatch: 'Sin coincidencias '
        }
    },
    tableBodyHeight: 'auto',
    tableBodyMaxHeight: '400px',
}

interface props {
    label: string;
    data: Array<Array<string>>;
    columns: Array<string>;
    containerTable?: boolean;
    noContent?: boolean;
}

export const DataTable = ({ data, columns, label, containerTable, noContent }: props) => {
    return (
        <ThemeProvider theme={theme} key={`table1`}>
            <div className={(containerTable) ? 'containerTable' : ''}>
                <MUIDataTable
                    title={label}
                    data={data}
                    columns={columns}
                    options={{
                        ...options,
                        downloadOptions: {
                            filename: label,
                            filterOptions: {
                                useDisplayedColumnsOnly: true,
                                useDisplayedRowsOnly: true
                            }
                        },
                        tableBodyMaxHeight: (noContent) ? '100%' : options.tableBodyMaxHeight
                    }}
                />
            </div>
        </ThemeProvider>
    )
}
