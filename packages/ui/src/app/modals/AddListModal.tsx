import React from "react";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { useKeyPress } from "demo-nest-ui-shared";
import { Modal } from "~/components/Modal/Modal";
import { Button } from "~/components/Button/Button";
import { LoadingService } from "~/components/Loading/LoadingService";
import { ListService } from "~/app/services/ListService";
import { toast } from "react-toastify";
import { API } from "@env/config";
import { CloseIcon } from "~/components/Icons/CloseIcon";

const AddListModalContent: React.FC<{
  close: () => void;
}> = observer(({ close }) => {
  const loadingService = React.useContext(LoadingService);
  const listService = React.useContext(ListService);
  const state = useLocalStore(() => ({
    name: "",
    urls: [""],
    send: async () => {
      loadingService.setLoading(true, "dashboard");
      try {
        await fetch(`${API}v1/add`, {
          method: "POST",
          body: JSON.stringify({
            name: state.name,
            urls: state.urls
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        close();
        toast("The list have been successfuly created!", {
          type: "success"
        });
      } catch (error) {
        console.error(error);
        toast("There was an error while creating a list", {
          type: "error"
        });
      }
      listService.load();
      loadingService.setLoading(false, "dashboard");
    },
    add: () => {
      state.urls.push("");
    },
    clear: () => {
      state.name = "";
      (state.urls as any).replace([""]);
    }
  }));
  useKeyPress("Escape", () => {
    close();
  });
  return (
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-lg shadow-md bg-white flex flex-col items-center justify-start pb-8">
      <div className="w-full flex items-center justify-end px-3 py-3">
        <Button onClickEnter={close}>
          <CloseIcon />
        </Button>
      </div>
      <div className="text-2xl -mt-6 font-medium">New Upload List</div>
      <div className="text-lg flex items-center justify-center mt-6 px-2 w-10/12 lg:w-8/12 xl:w-8/12">
        <div className="relative w-full">
          <input
            placeholder=" "
            className="input border-gray-400 border-2 bg-gray-100 appearance-none w-full px-4 py-3 pt-5 pb-2 focus focus:border-orange-500 focus:outline-none active:outline-none active:border-orange-500"
            type="text"
            onChange={e => {
              state.name = e.currentTarget.value;
            }}
            value={state.name || ""}
          />
          <label className="label absolute mb-0 -mt-2 pt-4 pl-4 leading-tighter text-gray-600 text-base cursor-text">
            List Name
          </label>
        </div>
      </div>
      <div className="w-10/12 lg:w-8/12 xl:w-8/12 mt-4">
        <div className="table-overflow w-full px-2 flex flex-col items-center justify-start">
          {state.urls.map((value, index) => (
            <div
              className={classNames("relative w-full", { "mt-2": index !== 0 })}
              key={index}
            >
              <input
                placeholder=" "
                className="input border-gray-400 border-2 bg-gray-100 appearance-none w-full px-4 py-3 pt-5 pb-2 focus focus:border-orange-500 focus:outline-none active:outline-none active:border-orange-500"
                type="text"
                onChange={e => {
                  state.urls[index] = e.currentTarget.value;
                }}
                value={value || ""}
              />
              <label className="label absolute mb-0 -mt-2 pt-4 pl-4 leading-tighter text-gray-600 text-base cursor-text">
                URL
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="text-lg w-10/12 lg:w-8/12 xl:w-8/12 flex items-center justify-between flex-wrap mt-4 px-2">
        <div>
          <Button
            className="text-orange-500 whitespace-no-wrap"
            onClickEnter={state.add}
          >
            + ADD MORE INPUTS
          </Button>
        </div>
        <div>
          <Button
            className="text-gray-900 whitespace-no-wrap"
            onClickEnter={state.clear}
          >
            Clear all
          </Button>
        </div>
      </div>
      <div className="text-lg w-10/12 lg:w-8/12 xl:w-8/12 mt-4 px-2">
        <Button
          className="text-white w-full bg-orange-500 rounded-full"
          onClickEnter={state.send}
        >
          SUBMIT
        </Button>
      </div>
      <style jsx>{`
        .table-overflow {
          max-height: 20vw;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
});

export const AddListModal: React.FC<{
  className?: string;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
}> = observer(({ children, className }) => {
  return (
    <Modal
      className={className}
      focusEl=".close"
      content={({ close }) => <AddListModalContent close={close} />}
    >
      {children}
    </Modal>
  );
});
