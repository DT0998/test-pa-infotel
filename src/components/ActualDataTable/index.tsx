import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IActualData, IActualDataProps } from "../../types/actual-data.model";
import { defaultData } from "../../pages/dashboard/actual-data";
const columnHelper = createColumnHelper<IActualData>();

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
function ActualDataTable(props: IActualDataProps) {
  const { data } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2 p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
      <table className="w-full">
        {/* head */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-black p-2"
                  style={{ background: "#a5a5a5", minWidth: header.getSize() }}
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
          ))}
        </thead>
        {/* body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    minWidth: cell.column.getSize(),
                    background: "#d8d8d8",
                  }}
                  className="p-2 border border-black"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* table foot */}
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => {
            return (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <th
                    key={footer.id}
                    className="border border-black p-2"
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
  );
}

export default ActualDataTable;
