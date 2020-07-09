import React from "react";
import { observer } from "mobx-react";
import { ListService } from "../services/ListService";

export const DashboardHeader = observer(() => {
  const state = React.useContext(ListService);
  return (
    <>
      <div className="text-4xl">View List History</div>
      <div className="text-sm text-gray-600 mt-1">
        {state.total} result{state.total !== 1 && "s"}
      </div>
    </>
  );
});
