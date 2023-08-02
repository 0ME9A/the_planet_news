import { getNewsAPI, getSourceAPI } from "./api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { newsType } from "../types/newsType";

type NewsType = { articles: newsType[] } | null;

type initialContext = {
  News: NewsType;
  setNews: Dispatch<SetStateAction<NewsType>>;
  Index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  fetchNews: (cat?: string) => Promise<void> | null;
  fetchBySource: (src: string) => Promise<void> | null;
  DarkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};
const initialValue: initialContext = {
  News: null,
  setNews: () => null,
  Index: 1,
  setIndex: () => "",
  fetchNews: () => null,
  fetchBySource: () => null,
  DarkTheme: true,
  setDarkTheme: () => null,
};

export const NewsContext = createContext<initialContext>(initialValue);

export default function TheContext({ children }: { children: ReactNode }) {
  const [News, setNews] = useState<NewsType>(null);
  const [Index, setIndex] = useState<number>(1);
  const [DarkTheme, setDarkTheme] = useState<boolean>(true);

  const fetchNews = async (cat?: string) => {
    const { data } = await axios.get(getNewsAPI(cat ?? "general"));
    setNews(data);
    setIndex(1);
  };
  const fetchBySource = async (src: string) => {
    if (src) {
      try {
        const { data } = await axios.get(getSourceAPI(src));
        setNews(data);
        setIndex(1);
      } catch (error) {
        console.log("Couldn't fetch data by source...");
      }
    }
  };

  // console.log(DarkTheme, '---------');

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        News,
        setNews,
        Index,
        setIndex,
        DarkTheme,
        setDarkTheme,
        fetchNews,
        fetchBySource,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
