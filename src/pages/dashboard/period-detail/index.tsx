import { MdFileDownload } from "react-icons/md";
import PeriodDetailTable from "../../../components/PeriodDetailTable";
import { IPeriodData } from "../../../types/period-detail.model";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";

export const defaultData: IPeriodData[] = [
  {
    property: "SPH",
    totalRoomInHotel: 26,
    roomRevenue: 24,
    fBRevenue: 100,
    period: [
      {
        periodTimeline: "breakfast",
        totalRoomInHotel: 10,
        roomRevenue: 10,
        fBRevenue: 20,
      },
      {
        periodTimeline: "lunch",
        totalRoomInHotel: 5,
        roomRevenue: 10,
        fBRevenue: 50,
      },
      {
        periodTimeline: "dinner",
        totalRoomInHotel: 1,
        roomRevenue: 4,
        fBRevenue: 30,
      },
    ],
  },
  {
    property: "PP02",
    totalRoomInHotel: 40,
    roomRevenue: 50,
    fBRevenue: 200,
    period: [
      {
        periodTimeline: "breakfast",
        totalRoomInHotel: 25,
        roomRevenue: 25,
        fBRevenue: 100,
      },
      {
        periodTimeline: "lunch",
        totalRoomInHotel: 5,
        roomRevenue: 10,
        fBRevenue: 50,
      },
      {
        periodTimeline: "dinner",
        totalRoomInHotel: 10,
        roomRevenue: 15,
        fBRevenue: 50,
      },
    ],
  },
];

function PeriodDetailPage() {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Hotel-table",
    sheet: "Hotel-table",
  });

  return (
    <div className="md:p-4">
      <div className="md:p-4 mt-20">
        {/* button down excel */}
        <div className="flex justify-center w-full">
          <button className="bg-green-400 p-2 text-white" onClick={onDownload}>
            <MdFileDownload size={20} />
          </button>
        </div>
        <PeriodDetailTable data={defaultData} ref={tableRef}></PeriodDetailTable>
      </div>
    </div>
  );
}
export default PeriodDetailPage;
