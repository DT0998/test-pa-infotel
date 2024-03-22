import ActualDataTable from "../../../components/ActualDataTable";
import BarChart from "../../../components/BarChart";
import { IActualData } from "../../../types/actual-data.model";

export const defaultData: IActualData[] = [
  {
    property: "SPH",
    totalRoomInHotel: 26,
    roomRevenue: 24,
    fBRevenue: 100,
  },
  {
    property: "PP02",
    totalRoomInHotel: 40,
    roomRevenue: 50,
    fBRevenue: 200,
  },
  {
    property: "PP02",
    totalRoomInHotel: 60,
    roomRevenue: 50,
    fBRevenue: 200,
  },
  {
    property: "PP03",
    totalRoomInHotel: 80,
    roomRevenue: 50,
    fBRevenue: 200,
  },
  {
    property: "PP04",
    totalRoomInHotel: 20,
    roomRevenue: 50,
    fBRevenue: 200,
  },
];

function ActualDataPage() {
  return (
    <div className="md:p-4">
      <div className="md:p-4 mt-20">
        <ActualDataTable data={defaultData} />
        <div className="m-2">
          <BarChart data={defaultData} />
        </div>
      </div>
    </div>
  );
}
export default ActualDataPage;
