import React, { forwardRef, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IPeriodData,
  IPeriodDetailProps,
} from "../../types/period-detail.model";
import { defaultData } from "../../pages/dashboard/period-detail";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const columnHelper = createColumnHelper<IPeriodData>();

const columns = [
  columnHelper.accessor("property", {
    cell: (info) => {
      return (
        <div className="flex justify-start">
          <span>{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>Property</span>,
    footer: () => {
      return (
        <div className="flex justify-start">
          <span>Grand Total</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("period", {
    cell: (info) => {},
    header: () => <span>Period</span>,
    footer: () => {
      return <div className="flex justify-between"></div>;
    },
  }),
  columnHelper.accessor("totalRoomInHotel", {
    cell: (info) => {
      return (
        <div className="flex justify-end">
          <span>{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>Total Room In Hotel</span>,
    footer: () => {
      let total = 0;
      if (defaultData.length > 0) {
        defaultData.forEach((item) => {
          total += item.totalRoomInHotel;
        });
      }
      return (
        <div className="flex justify-between">
          <span>$</span>
          <span>{total}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("roomRevenue", {
    cell: (info) => {
      return (
        <div className="flex justify-end">
          <span>{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>Room Revenue</span>,
    footer: () => {
      let total = 0;
      if (defaultData.length > 0) {
        defaultData.forEach((item) => {
          total += item.roomRevenue;
        });
      }
      return (
        <div className="flex justify-between">
          <span>$</span>
          <span>{total}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("fBRevenue", {
    cell: (info) => {
      return (
        <div className="flex justify-end">
          <span>{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>F&B Revenue</span>,
    footer: () => {
      let total = 0;
      if (defaultData.length > 0) {
        defaultData.forEach((item) => {
          total += item.fBRevenue;
        });
      }
      return (
        <div className="flex justify-between">
          <span>$</span>
          <span>{total}</span>
        </div>
      );
    },
  }),
];
function PeriodDetailTable(
  props: IPeriodDetailProps,
  ref: React.Ref<HTMLTableElement>
) {
  const [open, setOpen] = useState<string | null>(null);
  const { data } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOpenSubTable = (id: string) => {
    console.log(id);
    if (id) {
      setOpen(id);
    } else {
      setOpen(null);
    }
  };

  return (
    <React.Fragment>
      <div className="p-2 p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
        <table className="w-full" ref={ref}>
          {/* head */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  <th
                    className="p-2"
                    style={{
                      background: "#a5a5a5",
                    }}
                  ></th>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2"
                      style={{
                        background: "#a5a5a5",
                        minWidth: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>
          {/* body */}
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const { period } = row.original;
              return (
                <React.Fragment key={row.id}>
                  <tr key={row.id}>
                    <td
                      style={{
                        minWidth: 150,
                        background: "#d8d8d8",
                      }}
                      className="p-2"
                    >
                      <div className="flex justify-center">
                        <button onClick={() => handleOpenSubTable(row.id)}>
                          {open === row.id ? (
                            <FaMinus size={20} />
                          ) : (
                            <FaPlus size={20} />
                          )}
                        </button>
                      </div>
                    </td>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <React.Fragment>
                          <td
                            key={cell.id}
                            style={{
                              minWidth: 150,
                              background: "#d8d8d8",
                            }}
                            className="p-2"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                  {/* nest period */}
                  {open === row.id &&
                    period.map((period) => {
                      const periodColumns = data.map(({ period }) => period);
                      const emptyRows = periodColumns.length;
                      return (
                        <tr key={row.id}>
                          {/* empty rows */}
                          {emptyRows > 0 &&
                            Array.from({ length: emptyRows }, (_, index) => (
                              <td
                                style={{
                                  minWidth: 150,
                                  background: "#d8d8d8",
                                }}
                                className="p-2"
                              />
                            ))}
                          <React.Fragment>
                            <td
                              style={{
                                minWidth: 150,
                                background: "#d8d8d8",
                              }}
                              className="p-2"
                            >
                              <div className="flex justify-end">
                                {period.periodTimeline}
                              </div>
                            </td>
                            <td
                              style={{
                                minWidth: 150,
                                background: "#d8d8d8",
                              }}
                              className="p-2"
                            >
                              <div className="flex justify-end">
                                {period.totalRoomInHotel}
                              </div>
                            </td>
                            <td
                              style={{
                                minWidth: 150,
                                background: "#d8d8d8",
                              }}
                              className="p-2"
                            >
                              <div className="flex justify-end">
                                {period.roomRevenue}
                              </div>
                            </td>
                            <td
                              style={{
                                minWidth: 150,
                                background: "#d8d8d8",
                              }}
                              className="p-2"
                            >
                              <div className="flex justify-end">
                                {period.fBRevenue}
                              </div>
                            </td>
                          </React.Fragment>
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
          {/* table foot */}
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <tr key={footerGroup.id}>
                  <th
                    className="p-2"
                    style={{
                      background: "#a5a5a5",
                    }}
                  ></th>
                  {footerGroup.headers.map((footer) => (
                    <th
                      key={footer.id}
                      className="p-2"
                      style={{
                        background: "#a5a5a5",
                        minWidth: footer.getSize(),
                      }}
                    >
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              );
            })}
          </tfoot>
        </table>
      </div>
    </React.Fragment>
  );
}

export default forwardRef(PeriodDetailTable);
