import React from "react";
import { useLocalStore } from "mobx-react";
import { toast } from "react-toastify";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import {
  LoadingService,
  LoadingStore,
} from "~/components/Loading/LoadingService";
import { IList } from "~/app/models/list.interface";
import { API } from "@env/config";
import { getPagesArray } from "~/utils";

export const ListService = createService(
  () => {
    const state = useLocalStore(() => ({
      loadingService: null as LoadingStore,
      data: [] as IList[],
      total: 0,
      limit: 8,
      page: 0,
      paginationWrap: 1,
      get skip() {
        return state.limit * state.page;
      },
      get pages() {
        return Math.ceil(state.total / state.limit);
      },
      get pagesArray() {
        return getPagesArray(state.page, state.pages, state.paginationWrap);
      },
      changePage(page: number) {
        state.page = page;
        state.load();
      },
      reduceListDomainResponseItem: (arr, domainDto) => {
        domainDto.contacts.forEach((c) => {
          arr.push({
            id: c.id,
            domain: domainDto.name,
            email: c.email,
            firstName: c.firstName,
            lastName: c.lastName,
            confidence: c.confidence,
          });
        });
        return arr;
      },
      remapListResponseItem: (listDto) => {
        const list = {
          id: listDto.id,
          name: listDto.name,
          date: listDto.uploadTime,
          contacts: listDto.domains.reduce(
            state.reduceListDomainResponseItem,
            []
          ),
        };
        return list;
      },
      async load() {
        state.loadingService.setLoading(true, "dashboard");
        try {
          const responce = await fetch(
            `${API}v1/list?limit=${state.limit}&skip=${state.skip}`
          );
          const json = await responce.json();
          state.total = json.total;
          state.data = json.data.map(state.remapListResponseItem);
        } catch (error) {
          console.error(error);
          toast("There was an error while loading data", {
            type: "error",
          });
        }
        state.loadingService.setLoading(false, "dashboard");
      },
    }));
    return state;
  },
  (state) => {
    state.loadingService = React.useContext(LoadingService);
  }
);
