import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import AppContext from "../Context/AppContextProvider";
import axios from "axios";
import { queries } from "@testing-library/react";

const useMediaId = (arrIds, type) => {
  // type accepted value "tv" or "movie"
  const [loading, setLoading] = useState("pending");

  const [endpoints, setEndpoints] = useState("");
  const [fetchContent, setFetchContent] = useState(null);

  const { languages } = useContext(AppContext);

  const fetchDatas = async (endpoints) => {
    const result = await axios
      .all(
        endpoints.map(async (q) => {
          return axios.get(q);
        })
      )
      .then((res) => {
        res.map((r) => {
          return setFetchContent((prevState) => {
            if (prevState.length > 1) {
              let ids = prevState.map((m) => m.id);
              return ids.includes(r.data.id)
                ? [...prevState]
                : [...prevState, r.data];
            } else {
              return [...prevState, r.data];
            }
          });
        });
      })
      .finally(() => setLoading("idle"));
  };

  const queries = useCallback(
    async (arrIds, type) => {
      let query = arrIds?.map((m) => {
        return `https://api.themoviedb.org/3/${type}/${m[0].id}?api_key=3e2abd7e10753ed410ed7439f7e1f93f&language=${languages}`;
      });
      return query;
    },
    [arrIds, type]
  );

  const essai = useRef();

  useEffect(() => {
    setLoading("pending");
    queries(arrIds, type).then((res) => {
      if (res) {
        const fetchSomething = async () => {
          const result = await axios
            .all(
              res.map((q) => {
                return axios.get(q);
              })
            )
            .then((res) => {
              let content = res.map((r) => r.data);

              let uniqueContent = Array.from(
                new Set(content.map((c) => c.id))
              ).map((id) => {
                return content.find((c) => c.id === id);
              });
              if (res && res.length > 0) {
                return setFetchContent(uniqueContent), setLoading("idle");
              } else {
                throw new Error("Nothing has fetched");
              }
            })
            .catch((err) => setLoading("failled"));
          return result;
        };
        return fetchSomething();
      }
    });
    if (fetchContent?.length === 0) {
      return setLoading("pending");
    }
  }, [arrIds, type]);

  return { fetchContent, loading };
};

export default useMediaId;
