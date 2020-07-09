import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { ListService } from "../services/ListService";
import { Button } from "~/components/Button/Button";

export const DashboardPagination = observer(() => {
  const state = React.useContext(ListService);
  return (
    state.total > 0 &&
    state.pages > 1 && (
      <div className="flex flex-row items-center justify-center mt-8">
        {state.pagesArray.map((value, index) => (
          <Button
            className={classNames("bg-white mx-1", {
              "pointer-events-none": value == null || state.page === value,
              "text-gray-800": state.page !== value,
              "text-orange-500": state.page === value,
            })}
            key={value == null ? index + "_" : value}
            onClickEnter={() => state.changePage(value)}
          >
            {value == null ? "..." : value + 1}
          </Button>
        ))}
      </div>
    )
  );
});
