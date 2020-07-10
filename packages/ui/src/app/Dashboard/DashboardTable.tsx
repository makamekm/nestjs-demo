import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { ViewModal } from "../modals/ViewModal";
import { ListService } from "../services/ListService";
import { EmptyIcon } from "~/components/Icons/EmptyIcon";

export const DashboardTable = observer(() => {
  const state = React.useContext(ListService);
  return (
    <div className="mt-6 bg-white rounded-md w-full flex flex-col items-center justify-center shadow-2xl">
      {state.data && state.data.length > 0 ? (
        <table className="w-full">
          <tbody>
            <tr>
              <th className="font-medium text-left px-8 py-4 w-4/6 whitespace-no-wrap">
                List Name
              </th>
              <th className="font-medium text-left px-8 py-4 whitespace-no-wrap">
                Date
              </th>
              <th className="font-medium text-right px-8 py-4 whitespace-no-wrap">
                Num Contacts
              </th>
            </tr>
            {state.data.map((list) => {
              return (
                <ViewModal key={list.id} data={list}>
                  {({ open }) => (
                    <tr className="table-row border-gray-300" onClick={open}>
                      <td className="text-left px-8 py-4 w-4/6">{list.name}</td>
                      <td className="text-left px-8 py-4 whitespace-no-wrap">
                        {moment(list.date).format("YYYY-MM-DD")}
                      </td>
                      <td className="text-right px-8 py-4 whitespace-no-wrap">
                        {list.contacts.length}
                      </td>
                    </tr>
                  )}
                </ViewModal>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="p-20 flex flex-col items-center justify-center">
          <EmptyIcon />
          <div className="mt-4 text-lg">There are no List Names</div>
        </div>
      )}
    </div>
  );
});
